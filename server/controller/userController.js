const User = require("../module/userModule");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ username: user.username, email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const singupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.singup(username, email, password);

    const token = createToken(user._id);

    res.status(200).json({ username, email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  loginUser,
  singupUser,
};
