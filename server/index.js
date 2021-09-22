const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth');

// allows you to call environment variables
require('dotenv').config();

app.use(cors()); // allows cross-origin requests
app.use(express.json()); // allows you to pass json payloads from frontend to backend
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));