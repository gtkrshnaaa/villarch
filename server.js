// server.js
import { createServer } from 'http';
import { handleRequest } from './core/villarchRuntime.js';

// Create an HTTP server using Node.js native API
const PORT = process.env.PORT || 3000;

const server = createServer(async (req, res) => {
  // Handle incoming requests with Villarch Runtime
  await handleRequest(req, res);
});

// Start the server
server.listen(PORT, () => {
  console.log(`Villarch API is running on http://localhost:${PORT}`);
});