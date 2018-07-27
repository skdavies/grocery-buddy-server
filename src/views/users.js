import express from 'express';
let router = express.Router();

router.get('/users', (req, res, next ) => {
  let users = ['a', 'b', 'c'];

  res.json(users);
});

router.post('/user/create', (req, res) => {
  let user = 'Sam';
  res.json(user);
});

export default router;