// api/sample.js

module.exports = (req, res) => {
    res.status(200).json({
      message: 'Hello from api/sample.js!',
      path: '/api/sample'
    });
  };
  