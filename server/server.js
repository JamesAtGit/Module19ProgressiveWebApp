const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import API and HTML routes
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
