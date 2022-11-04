const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

const authCtrl = {
  // @controllers GET api/auth
  // derc Kiểm tra người dùng đã đăng kí, đăng nhập hay chưa
  // @access public
  accessToken: async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Không tìm thấy người dùng này" });
      }

      res.json({ success: true, user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // @controllers POST api/register
  // @access public
  register: async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(404).json({
        success: false,
        message: "Thiếu tên người dùng, email hoặc mật khẩu",
      });

    // Kiểm tra người dùng hiện tại
    try {
      const user = await User.findOne({ username }); //== giá trị username trong database
      if (user) {
        //nếu username nhập vào === giá trị trong trường username có nghĩa là username nhập đã trùng vs username trong database
        return res.status(400).json({
          success: false,
          message: "Tên người dùng đã được sử dụng",
        });
      }

      const userEmail = await User.findOne({ email });
      if (userEmail) {
        return res.status(400).json({
          success: false,
          message: "Email đã được sử dụng",
        });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ success: false, message: "Mật khẩu dài ít nhất 6 ký tự." });
      }
      // hash password
      const hashedPassword = await argon2.hash(password);
      // Thêm người dùng vào database
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      const access_token = createAccessToken({ userId: newUser._id });

      await newUser.save();

      res.status(200).json({
        success: true,
        message: "Đăng kỳ thành công",
        access_token,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // @controllers POST api/register
  // @access public
  login: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({
        success: false,
        message: "Thiếu tên người dùng hoặc mật khẩu",
      });

    try {
      // Kiểm tra người dùng hiện tại
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Tên đăng nhập không chính xác",
        });
      }

      // Check password
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid) {
        return res
          .status(400)
          .json({ success: false, message: "Mật khẩu không chính xác" });
      }

      // trả về tokens cho người dùng
      const access_token = createAccessToken({ userId: user._id });

      res.status(200).json({
        success: true,
        message: "Đăng nhập thành công!",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // @Router GET api/getUser
  // @Desc Get all user
  // @Access Private
  getUser: async (req, res) => {
    try {
      const users = await User.find({ users: req.userId });
      res.json({ success: true, users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getGenderUser: async (req, res) => {
    try {
      const users = await User.find({
        gender_like: { $eq: req.query.gender },
      });
      res.json({ success: true, users });
      console.log(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getOneUser: async (req, res) => {
    try {
      const users = await User.findOne(req.query.username).populate([
        "username",
        "fullname",
        "email",
        "avatar",
        "age",
        "gender",
        "mobile",
        "address",
        "images",
        "desc",
      ]);
      if (!users)
        return res.status(400).json({ msg: "Người dùng không tồn tại" });

      res.json({ success: true, users });
    } catch (err) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // @Router PUT api/updateUser
  // @Desc Update a new user
  // @Access Private
  updateUser: async (req, res) => {
    const {
      fullname,
      email,
      avatar,
      age,
      gender,
      mobile,
      address,
      images,
      desc,
    } = req.body;

    if (!fullname)
      return res
        .status(400)
        .json({ status: false, message: "Chưa nhập Họ và tên" });

    try {
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          fullname,
          email,
          avatar,
          age,
          gender,
          mobile,
          address,
          images,
          desc,
        }
      );

      res.json({ msg: "Update Success!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  },
};

// tạo token cho người dùng
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
};

module.exports = authCtrl;
