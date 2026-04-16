import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const API_BASE = '/api/notes'

function App() {
  const [notes,setNotes] = useState([]);
 function fetchNotes(){
   axios.get(API_BASE).then((res)=>{
    setNotes(res.data.notes);
    console.log(res.data.notes);
  });
 }
 useEffect(()=>{
  fetchNotes();
 },[])

 function handlesubmit(e){
  e.preventDefault();
  const {title,description} = e.target.elements;
    console.log(title.value,description.value);
    axios.post(API_BASE,
      {
        title:title.value,
        description:description.value
      }).then((res)=>{
      console.log(res.data);
      fetchNotes();
    });
 
 }

 function handleDeleteNote(id){
  console.log(id);
 }
  return (
    <>
      <form className='note-create-form' onSubmit={handlesubmit}>
        <input name='title' type="text" placeholder='Enter title' />
        <input name='description' type="text" placeholder='Enter description' />
        <button type='submit'>Create Note</button>
      </form>
       <div className='notes'>
           {notes.map((note, index) => (
             <div className='note' key={index}>
               <h1>{note.title}</h1>
               <p>{note.description}</p>
             </div>
           ))}
       </div>
    </>
  )
}

export default App
