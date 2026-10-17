#!/usr/bin/env python3
"""Static server for the podcast control pane — sends no-cache headers so the
Command Center webview always shows the current file. Run from 10_app/:
    python3 serve.py            (port 4010)
"""
import http.server, os, sys, subprocess, urllib.parse, json

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4010
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
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
