const {User} = require("../models");
const passwordHash = require('password-hash');
const jwt = require("jsonwebtoken");

exports.test = (req, res) => {
  res.send("Greetings from the Test controller!");
};

exports.register = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);

  let hashedPassword = passwordHash.generate(password);

  let user = new User({
    username,
    password: hashedPassword
  });

  await user.save();

  user = user.toObject();
  delete user.password;

  return res.status(200).json(user);
}

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  let user = await User.findOne({ username }).exec();
  console.log(user);
  if(!user){
    return res.status(401).json({ msg: "Login failed! Please check username/password!" });
  }

  // check password
  let checkPassword = passwordHash.verify(password, user.password);

  if(!checkPassword){
    return res.status(401).json({ msg: "Login failed! Please check username/password!" });
  }

  user = user.toObject();
  delete user.password;

  const token = await jwt.sign({ _id: user._id }, 'shhhhh');
  console.log(token)

  res.set("recordToken", `Bearer ${token}`);
  return res.status(200).json(user);
}