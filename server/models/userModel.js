const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
      unique: true,
    },
    fullname: {
      type: String,
      // required: true,
      trim: true, // loại bỏ khoảng trắng
      maxlength: 25,
      default: "",
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: Object,
      default:
        "https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg",
    },
    age: { type: Number, default: "" },
    gender: { type: String, default: "" },
    gender_like: { type: String, default: "" },
    mobile: { type: String, default: "" },
    address: { type: String, default: "" },
    images: {
      type: Array,
      default: [
        "https://img.vn/uploads/danhmuc/australia-1564026865-dudpi.jpg",
        "https://znews-photo.zingcdn.me/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg",
        "https://static.wixstatic.com/media/9d8ed5_b458c1421a5c47909d967d1a994c1089~mv2.jpg/v1/fit/w_1000,h_681,al_c,q_80/file.jpg",
      ],
    },
    desc: { type: String, default: "" },
    // followers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    // following: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    // saved: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    isAvatarImageSet: {
      type: Boolean,
      default: false,
    },
    avatarImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
