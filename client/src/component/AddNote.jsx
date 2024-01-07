import React, { useContext, useEffect, useState } from 'react'
import OurContext from '../context/ourContext'



const AddNote = () => {
  const [noteData, setnoteData] = useState({title:"", description: ""});
  const our_context = useContext(OurContext);
  // console.log(our_context);
  const {AddNote, GetAllNote, Note, AddedNote} = our_context;

  const onChangeFunc = (event)=>{
    setnoteData({...noteData, [event.target.name]: event.target.value})
  }

  const addNoteFunc = (e)=>{
    e.preventDefault();
    AddNote(noteData);
    setnoteData({title:"", description: ""});
  }

  useEffect(() => {
    GetAllNote();
    console.log(Note);
  }, [AddedNote])
  
  
  return (
    
    <form onSubmit={addNoteFunc}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
            <input type="text" className="form-control" id="exampleInputTitle1" aria-describedby="titleHelp" name="title" value={noteData.title} onChange={onChangeFunc}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputDescription1" className="form-label">Description</label>
            <input type="description" className="form-control" id="exampleInputDescription1" name="description" value={noteData.description} onChange={onChangeFunc}/>
        </div>
        <button type="submit" className="btn btn-primary">Add Note</button>
    </form>
  )
}

export default AddNote