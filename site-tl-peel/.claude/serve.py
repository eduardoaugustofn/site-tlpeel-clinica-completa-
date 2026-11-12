"""Servidor local de desenvolvimento do site.

Igual ao "python -m http.server", mas manda o navegador nunca guardar cópia
dos arquivos, para cada recarregamento mostrar sempre a versão mais nova.
Uso: python .claude/serve.py   (abre em http://localhost:5173/)
"""
import http.server
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    with http.server.ThreadingHTTPServer(("", PORT), NoCacheHandler) as httpd:
        print(f"Servindo {ROOT} em http://localhost:{PORT}/")
        httpd.serve_forever()
