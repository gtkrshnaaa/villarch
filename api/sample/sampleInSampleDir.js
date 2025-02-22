// api/sample/sampleInSampleDir.js

module.exports = (req, res) => {
    res.status(200).json({
      message: 'Hello from api/sample/sampleInSampleDir.js!',
      path: '/api/sample/sampleInSampleDir'
    });
  };
  