import { createServer } from 'http';
import { parse } from 'url';
import fs from 'fs';
import path from 'path';

// Allowed HTTP methods
const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

export async function handleRequest(req, res) {
  const parsedUrl = parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Ensure the URL has at least two segments: /api/resource/action
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length < 2) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint Not Found' }));
    return;
  }

  const [resource, action] = segments;

  // Secure the path to prevent traversal attacks
  const safeBasePath = path.join(process.cwd(), 'api');
  const resolvedPath = path.join(safeBasePath, resource, `${action}.js`);

  if (!resolvedPath.startsWith(safeBasePath)) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Forbidden' }));
    return;
  }

  // Ensure the file exists and is a valid file (not a directory)
  if (!fs.existsSync(resolvedPath) || !fs.statSync(resolvedPath).isFile()) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Handler Not Found' }));
    return;
  }

  // Validate HTTP Method
  if (!ALLOWED_METHODS.includes(req.method || '')) {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  try {
    const handlerModule = await import(`file://${resolvedPath}`);

    if (typeof handlerModule.default !== 'function') {
      throw new Error('Invalid handler');
    }

    // Safely execute the handler
    handlerModule.default(req, res);
  } catch (error) {
    console.error('Handler Execution Error:', error.message);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}
