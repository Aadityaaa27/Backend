const express=require('express');

const postRouter=express.Router();
const PostController=require("../controllers/post.controller");
const multer=require("multer");
const upload=multer({storage:multer.memoryStorage()});
const identifyUser=require("../middlewares/auth.middleaware");


postRouter.post("/",upload.single("image"),identifyUser,PostController.createPostController);

postRouter.get("/",identifyUser,PostController.getPostControllers);
module.exports=postRouter;

//get/api/posts/details/:postid
//return an detail about specific post with the id .also check whether the post belongs to the user that the request come from

postRouter.get("/details/:postId",identifyUser,PostController.getPostDetails);

//api/posts/like/:postId
postRouter.post("/like/:postId",identifyUser,PostController.likePostController);
