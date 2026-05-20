import React ,{useEffect} from 'react'
import "./style/feed.scss"
import { usePost } from './hook/usePost'
import Post from './components/Post'
import Nav from '../../shared/components/Nav'
const Feed = () => {
  const {loading,feed,post,handleGetFeed}=usePost()

  useEffect(()=>{
    handleGetFeed()
  },[])

  useEffect(()=>{
    if(feed){
      console.log(feed)
    }
  },[feed])
   
  if(loading || !feed){
    return (<main><h1>Feed is Loading..</h1></main>)
  }

  if(Array.isArray(feed) && feed.length === 0){
    return (
      <main className='feed-page'>
        <Nav />
        <div className='feed'>
          <h2>No posts yet</h2>
        </div>
      </main>
    )
  }

  return (
    <main className='feed-page'>
     <Nav />

      <div className='feed'>
        <div className='posts'>
               {feed.map(post=>{
                return <Post key={post._id} user={post.user} post={post} />
               })}
        </div>
      </div>
    </main>
  )
}
export default Feed



