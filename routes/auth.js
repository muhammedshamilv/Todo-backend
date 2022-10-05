const router = require('express').Router({ mergeParams: true });
const User = require('../models/user');
const utils = require('../lib/utils');
// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const addUser = await User.create({
      user_name: name,
      email: email,
      hashedPassword: await utils.hashPassword(password),
    });
    let userObj = {
      id: addUser.id,
      user_name: addUser.user_name,
      email: addUser.email,
    };
    res.status(200).send(userObj);
  } catch (error) {
    console.error(error);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    !user && res.status(404).send('User not found');
    if (user) {
      const validPassword = await utils.comparePassword(
        password,
        user.hashedPassword
      );
      let userObj = {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
      };
      if (validPassword) {
        return res.status(200).send(userObj);
      } else {
        return res.status(401).send('Wrong password');
      }
    }
  } catch (error) {
    console.error(error);
  }
});

router.get('/logout', (req, res) => {
  res.logout();
  res.redirect('http://localhost:3000/');
});

module.exports = router;
