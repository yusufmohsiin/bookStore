const jwt = require("jsonwebtoken")
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    const token = req.headers["jwt"];
    if (!token) return res.status(401).send({ msg: "No Token Provided" });

    const decoded = jwt.verify(token, "myjwtsecret");
    console.log(decoded);
    const { email } = decoded;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ msg: "User not found!" });
    }
    next();
  } catch (ex) {
    return res.status(401).send({ msg: "Invalid Token" });
  }
};

module.exports=auth