const express = require('express');
const Pusher = require('pusher');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

app.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  
  const authData = pusher.authorizeChannel(socketId, channel);
  res.send(authData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth server running on http://localhost:${PORT}`));
