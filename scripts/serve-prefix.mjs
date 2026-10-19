// Local preview of the GitHub Pages project path. This server is not deployed.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const prefix = '/zhiyuan-education-brisbane/';
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg'};
const port = Number(process.env.PAGES_PREVIEW_PORT || 8788);

createServer(async (request,response) => {
  const pathname = new URL(request.url,'http://localhost').pathname;
  if (!pathname.startsWith(prefix)) {
    response.writeHead(404,{'Content-Type':types['.html']});response.end(await readFile(resolve(root,'404.html')));return;
  }
  let relative = decodeURIComponent(pathname.slice(prefix.length));
  if (!relative || relative.endsWith('/')) relative += 'index.html';
  const file = resolve(root,relative);
  if (file !== root && !file.startsWith(root + sep)) {
    response.writeHead(404);response.end();return;
  }
  try {
    if (!(await stat(file)).isFile()) throw new Error('Not a file');
    const extension=file.slice(file.lastIndexOf('.'));
    response.writeHead(200,{'Content-Type':types[extension]||'application/octet-stream'});
    response.end(await readFile(file));
  } catch {
    response.writeHead(404,{'Content-Type':types['.html']});
    response.end(await readFile(resolve(root,'404.html')));
  }
}).listen(port,'127.0.0.1',()=>console.log(`GitHub Pages path preview: http://127.0.0.1:${port}${prefix}`));
