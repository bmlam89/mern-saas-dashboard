const User = require("../models/User.js");

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id,'id inside of generals controller on backend')
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}