import express from 'express';
let router = express.Router();
/* GET home page. */
router.get('/', (req, res, next) => {
  let languages = [
    {
      language: 'Spanish'
    },
    {
      language: "French"
    },
    {
      language: "German"
    }
  ];
res.json(languages);
});

import userViews from './views/users'
router.use(userViews);

export default router;