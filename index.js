const express = require('express');
const path = require('path');
const menusRouter = require('./routes/menus');
const { logger, notFound, errorHandler } = require('./middleware');

const app = express();
const PORT = 3000;

app.use(express.json()); 
app.use(logger);        

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Coffee Shop</title>
      <style>
        body {
          margin: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3e2723, #6d4c41);
          font-family: Georgia, serif;
          color: #fff8e1;
        }
        .card {
          background: rgba(255, 248, 225, 0.1);
          padding: 40px 50px;
          border-radius: 16px;
          text-align: center;
          max-width: 460px;
        }
        h1 { margin: 0 0 8px; font-size: 2rem; }
        p { margin: 6px 0; }
        a {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 24px;
          background: #ffcc80;
          color: #3e2723;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>☕ Coffee Shop</h1>
        <p>Selamat datang!</p>
        <p>Di coffee shop<b> salsabila azkia </b> (20250040060)</p>
        <p>Coffee Shop Menu</p>
        <a href="/menus">Lihat Daftar Menu</a>
      </div>
    </body>
    </html>
  `);
});

app.use('/menus', menusRouter);

app.get('/tampilan', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

// Named wildcard: /files/a/b/c -> path = ['a', 'b', 'c']
app.get('/files/*path', (req, res) => {
  res.json({ path: req.params.path });
});

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});