const members = require("../models/members");

exports.register = async (req, res, next) => {
  console.log(req.body);
  try {
    const register = await members.create(req.body);
    res.status(201).json({ success: true, data: register });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, data: null });
  }
};

exports.members = async (req, res) => {
  try {
    const memeberlist = await members.find();
    console.log(memeberlist);
    res.status(200).json({ success: true, data: memeberlist });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, data: null });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const deleteMember = await members.findByIdAndDelete(req.params.id);
    console.log(req.params.id);
    if (!deleteMember) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (err) {
    console.log(err);
  }
};
