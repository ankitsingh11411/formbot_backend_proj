const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const folderRoutes = require('./routes/folderRoutes');
const formRoutes = require('./routes/formRoutes');
const responseRoutes = require('./routes/responseRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Database connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/responses', responseRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
