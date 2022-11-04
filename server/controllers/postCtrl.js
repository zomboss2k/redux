const Post = require("../models/postModel");

const postCtrl = {
  // @Router GET api/createPost
  // @Desc Get all new post
  // @Access Private
  getPost: async (req, res) => {
    try {
      const posts = await Post.find({ users: req.userId }).populate("user", [
        "username",
      ]);
      res.json({ success: true, posts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
  // @Router POST api/createPost
  // @Desc Create a new post
  // @Access Private
  createPost: async (req, res) => {
    const { title, description, url, status } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ status: false, message: "Chưa nhập tiêu đề" });
    }

    try {
      // Tạo bài viết mới
      const newPost = new Post({
        title,
        description,
        url: url.startsWith("https://") ? url : `https://${url}`,
        status: status || "TO LEARN",
        user: req.userId,
      });

      await newPost.save();
      res.json({ success: true, message: "Happy!", post: newPost });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
  // @Router PUT api/updatePost
  // @Desc Update a new post
  // @Access Private
  updatePost: async (req, res) => {
    const { title, description, url, status } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ status: false, message: "Chưa nhập tiêu đề" });
    }

    try {
      // cập nhật bài viết mới
      let updatedPost = {
        title,
        description: description || "",
        url: url.startsWith("https://") ? url : `https://${url}` || "",
        status: status || "TO LEARN",
      };

      //   Điều kiện để update post,
      //   t1 là bài viết phải có trong database lấy từ id,
      //   t2 là user tạo ra bài viết mới có quyền update bài viết
      const postUpdateCondition = { _id: req.params.id, user: req.userId };
      updatedPost = await Post.findOneAndUpdate(
        postUpdateCondition,
        updatedPost,
        { new: true } // nếu mà thành công thì sẽ trả lại bài viết đã update còn thất bại thì trả về bài viết cũ
      );
      //   Người dùng không được phép cập nhật bài đăng hoặc không tìm thấy bài đăng
      if (!updatedPost)
        res.status(400).json({
          status: false,
          message:
            "Không tìm thấy bài đăng hoặc người dùng không được ủy quyền",
        });

      res.json({
        success: true,
        message: "Cập nhập thành công",
        post: updatedPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // @Router DELETE api/deletePost
  // @Desc Delete a new post
  // @Access Private

  deletePost: async (req, res) => {
    try {
      const postDeleteCondition = { _id: req.params.id, user: req.userId };
      const deletedPost = await Post.findOneAndDelete(postDeleteCondition);
      // Người dùng không được ủy quyền hoặc không tìm thấy bài đăng
      if (!deletedPost)
        res.status(400).json({
          status: false,
          message:
            "Không tìm thấy bài đăng hoặc người dùng không được ủy quyền",
        });

      res.json({
        success: true,
        message: "Xóa bài viết thành công",
        post: deletedPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = postCtrl;
