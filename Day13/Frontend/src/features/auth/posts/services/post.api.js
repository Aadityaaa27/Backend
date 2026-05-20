import axios from "axios";
const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

function getAuthConfig(tokenFromCaller){
  const token = tokenFromCaller || localStorage.getItem("token");
  if(!token){
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
}

export async function getFeed(token){
  const response=await api.get("/api/posts/feed", getAuthConfig(token))
  return response.data
}
export async function createPost(imageFile,caption){
  const formData=new FormData()
  formData.append("image",imageFile)
  formData.append("caption",caption)

  const response=await api.post("/api/posts",formData,getAuthConfig())
  return response.data
}

export async function likePost(postId){
  const response=await api.post(`/api/posts/like/${postId}`, {}, getAuthConfig())
  return response.data;
}

export async function unlikePost(postId){
   const response=await api.post(`/api/posts/unlike/${postId}`, {}, getAuthConfig())
   return response.data;
}
    

