// api/sample/sampleInSampleDir.js

export default (req, res) => {
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method Not Allowed. Use POST.' }));
      return;
    }
  
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Hello from api/sample/sample.js!',
      path: '/api/sample/sample',
      method: req.method
    }));
  };
  
  