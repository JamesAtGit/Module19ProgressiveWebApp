
const path = require('path');

module.exports = (app) => {
  // Serve the index.html file
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
};

