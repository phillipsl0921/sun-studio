"""Serve this folder on http://127.0.0.1:<port> for a local preview (python serve_preview.py 8737).

http.server's own handler calls os.fstat on each file, which fails with WinError 87 on an exFAT drive under
Python 3.12; this one reads each file whole instead."""
import http.server
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=HERE, **kwargs)

    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            path = os.path.join(path, 'index.html')
        try:
            with open(path, 'rb') as f:
                data = f.read()
        except OSError:
            self.send_error(404, 'File not found')
            return None
        self.send_response(200)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Content-Length', str(len(data)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self._data = data
        return None

    def do_GET(self):
        self._data = None
        self.send_head()
        if self._data is not None:
            self.wfile.write(self._data)


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8737
    http.server.ThreadingHTTPServer(('127.0.0.1', port), Handler).serve_forever()
