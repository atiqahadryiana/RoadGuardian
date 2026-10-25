"""RoadGuardian AI local demo server — Python standard library only."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class DemoHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'")
        super().end_headers()


if __name__ == "__main__":
    root = Path(__file__).resolve().parent / "app"
    handler = partial(DemoHandler, directory=str(root))
    server = ThreadingHTTPServer(("127.0.0.1", 8000), handler)
    print("RoadGuardian AI demo: http://localhost:8000")
    print("Local simulation only. Press Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping demo server.")
    finally:
        server.server_close()
