// core/villarchRuntime.js
import { createServer } from 'http';
import { parse } from 'url';
import fs from 'fs';
import path from 'path';

// Function to dynamically load handlers
export async function handleRequest(req, res) {
  const parsedUrl = parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Map URL to the corresponding handler file
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length < 2) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint Not Found' }));
    return;
  }

  const [resource, action] = segments;
  const handlerPath = path.join(process.cwd(), 'api', resource, `${action}.js`);

  try {
    if (fs.existsSync(handlerPath)) {
      const handlerModule = await import(`file://${handlerPath}`);
      const handler = handlerModule.default;

      // Execute the corresponding handler for the request
      handler(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Handler Not Found' }));
    }
  } catch (error) {
    console.error('Handler Execution Error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}