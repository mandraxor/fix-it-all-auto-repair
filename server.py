import http.server
import socketserver
import os
import sys
import urllib.parse

PORT = 2111
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    # Disable slow reverse DNS lookups on Windows
    def address_string(self):
        return self.client_address[0]

    def do_GET(self):
        # Support clean URLs like /services or /contact?param=val
        parsed = urllib.parse.urlparse(self.path)
        clean_path = parsed.path.rstrip('/')
        
        # If accessing / or empty, serves index.html
        if clean_path and clean_path != '/':
            local_target = os.path.join(DIRECTORY, clean_path.lstrip('/'))
            # If path doesn't exist as file/dir, check if path.html exists
            if not os.path.exists(local_target) and os.path.isfile(local_target + '.html'):
                new_path = clean_path + '.html'
                if parsed.query:
                    new_path += '?' + parsed.query
                self.path = new_path

        super().do_GET()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

class ThreadingTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True

if __name__ == '__main__':
    with ThreadingTCPServer(("", PORT), Handler) as httpd:
        print(f"Server serving at http://localhost:{PORT}")
        sys.stdout.flush()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            httpd.shutdown()
