#!/usr/bin/env python3
"""Static server for the podcast control pane — sends no-cache headers so the
Command Center webview always shows the current file. Run from 10_app/:
    python3 serve.py            (port 4010)
"""
import http.server, os, sys, subprocess, urllib.parse, json, re, time, datetime

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4010
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Draft backups live OUTSIDE the repo (the repo is public; unpublished writing
# never goes in git). drafts/<id>.json = latest; history/<id>/<stamp>.json =
# snapshots (every load, and at most one per 2 min while typing).
BACKUP_ROOT = os.path.expanduser("~/PodcastDraftBackups")
SNAP_EVERY = 120  # seconds
_last_snap = {}

def _atomic_write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(text)
        f.flush(); os.fsync(f.fileno())
    os.replace(tmp, path)

def _has_words(payload):
    return isinstance(payload, list) and any(
        isinstance(b, dict) and str(b.get("text", "")).strip() for b in payload)

def save_draft(draft_id, payload, reason):
    stamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
    latest = os.path.join(BACKUP_ROOT, "drafts", draft_id + ".json")
    # never let an empty draft replace one that has words (fresh browser, failed
    # restore, page closing): ignore it outright when nothing is on disk yet
    if not _has_words(payload):
        if not os.path.exists(latest):
            return stamp, False
        try:
            with open(latest, encoding="utf-8") as f:
                if _has_words(json.load(f).get("payload")):
                    return stamp, False
        except Exception:
            return stamp, False
    doc = json.dumps({"id": draft_id, "reason": reason, "savedAt": stamp,
                      "payload": payload}, ensure_ascii=False, indent=1)
    _atomic_write(os.path.join(BACKUP_ROOT, "drafts", draft_id + ".json"), doc)
    snapped = False
    now = time.time()
    if reason != "typing" or now - _last_snap.get(draft_id, 0) >= SNAP_EVERY:
        _atomic_write(os.path.join(BACKUP_ROOT, "history", draft_id,
                                   stamp + "-" + reason + ".json"), doc)
        _last_snap[draft_id] = now
        snapped = True
    return stamp, snapped

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def _json(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        # /save — body {id, payload, reason}; also accepts sendBeacon's text/plain
        if self.path.startswith("/save"):
            try:
                n = int(self.headers.get("Content-Length") or 0)
                if n <= 0 or n > 8_000_000:
                    return self._json({"ok": False, "error": "bad size"}, 400)
                data = json.loads(self.rfile.read(n).decode("utf-8"))
                draft_id = str(data.get("id", ""))
                if not re.fullmatch(r"[A-Za-z0-9_\-]{1,40}", draft_id):
                    return self._json({"ok": False, "error": "bad id"}, 400)
                reason = re.sub(r"[^a-z\-]", "", str(data.get("reason", "typing")))[:20] or "typing"
                stamp, snapped = save_draft(draft_id, data.get("payload"), reason)
                return self._json({"ok": True, "savedAt": stamp, "snapshot": snapped})
            except Exception as e:
                return self._json({"ok": False, "error": str(e)}, 500)
        self.send_error(404)

    def do_GET(self):
        # /draft?id=p4 — latest disk copy, used to restore if localStorage is empty
        if self.path.startswith("/draft?"):
            qs = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            draft_id = (qs.get("id") or [""])[0]
            if not re.fullmatch(r"[A-Za-z0-9_\-]{1,40}", draft_id):
                return self._json({"ok": False, "error": "bad id"}, 400)
            path = os.path.join(BACKUP_ROOT, "drafts", draft_id + ".json")
            if not os.path.exists(path):
                return self._json({"ok": False, "error": "none"}, 404)
            with open(path, encoding="utf-8") as f:
                return self._json({"ok": True, "doc": json.load(f)})
        # /open?u=<url>&u=<url>... — launch URLs in the default macOS browser
        # (real Chrome/Safari window, not the webview). http/https only.
        if self.path.startswith("/open?"):
            qs = urllib.parse.urlparse(self.path).query
            urls = [u for u in urllib.parse.parse_qs(qs).get("u", [])
                    if u.startswith("http://") or u.startswith("https://")][:12]
            for u in urls:
                subprocess.Popen(["open", u])
            body = json.dumps({"opened": len(urls)}).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        with open("/tmp/podcast-pane-access.log", "a") as f:
            import datetime
            f.write(datetime.datetime.now().isoformat() + " " + (fmt % args) + "\n")

http.server.ThreadingHTTPServer(("", PORT), NoCacheHandler).serve_forever()
