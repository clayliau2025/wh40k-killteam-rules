import http.server
import sys

PORT = 8899

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run():
    server_address = ('', PORT)
    httpd = http.server.ThreadingHTTPServer(server_address, NoCacheHTTPRequestHandler)
    print(f"Threading server serving at http://localhost:{PORT} with zero-cache headers...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")

if __name__ == '__main__':
    run()
