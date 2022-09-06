//appel des middlewares
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');

const app = express();
//connexion a la base de donnée MongoDB
mongoose
      .connect(
            'mongodb+srv://willeak:d5ozjkVY5FZUOrim@cluster0.9uyfwxw.mongodb.net/?retryWrites=true&w=majority',
            { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .then(() => console.log('Connexion à MongoDB réussie !'))
      .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware HEADER contourne les erreurs de securité CORS
app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
      res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
      );
      res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, PATCH, OPTIONS'
      );

      next();
});

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

app.use(bodyParser.json());

app.use('/api/posts', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/register', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
