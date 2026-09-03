#!/usr/bin/env python3
"""Static server for the podcast control pane — sends no-cache headers so the
Command Center webview always shows the current file. Run from 10_app/:
    python3 serve.py            (port 4010)
"""
import http.server, os, sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4010
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, *args):
        pass  # keep the log quiet

http.server.ThreadingHTTPServer(("", PORT), NoCacheHandler).serve_forever()
