import {getFeed,createPost,likePost,unlikePost} from "../services/post.api"
import { useContext,useEffect} from "react"
import { PostContext } from "../post.context.jsx"


export function usePost(){

  const context=useContext(PostContext)
  const {loading,setLoading,post,setPost,feed,setFeed}=context

  const handleGetFeed=async(token)=>{
      setLoading(true)
      try{
        const data=await getFeed(token)
        setFeed(data.posts || [])
      }catch(err){
        console.error("Failed to load feed:", err)
        setFeed([])
      }finally{
        setLoading(false)
      }
    }

  const handleCreatePost=async(imageFile,caption)=>{
    setLoading(true)
    try{
      if(!imageFile){
        alert("Please select an image")
        setLoading(false)
        return
      }
      const data=await createPost(imageFile,caption)
      setFeed([data.post,...feed])
      alert("Post created successfully!")
    }catch(err){
      console.error("Failed to create post:", err)
      alert("Failed to create post: " + (err.response?.data?.message || err.message))
    }finally{
      setLoading(false)
    }
  }

  const handleLike=async(post)=>{
    try{
      await likePost(post)
      setFeed(currentFeed => currentFeed.map(item => (
        item._id === post ? { ...item, isLiked: true } : item
      )))
    }catch(err){
      console.error("Failed to like post:", err)
    }
  }

  const handleUnlike=async(post)=>{
    try{
      await unlikePost(post)
      setFeed(currentFeed => currentFeed.map(item => (
        item._id === post ? { ...item, isLiked: false } : item
      )))
    }catch(err){
      console.error("Failed to unlike post:", err)
    }
  }

  useEffect(()=>{
    handleGetFeed()
  },[])

  return {loading,feed,post,handleGetFeed,handleCreatePost,handleLike,handleUnlike}
}


