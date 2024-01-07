import React, { useContext } from 'react'
import OurContext from '../context/ourContext';



const Note = () => {
    const our_context = useContext(OurContext);
    const {Note, DeleteNote} = our_context;
    console.log(Note);

    const DeleteNoteFunc=(id) =>{
        DeleteNote(id);
    }
  return (
    <section>
        <div className='row'>
            {
                Note && Note.length!==0 && Note.map((element)=>{
                    return (
                        <div key={element._id} className="col-10 col-md-4 col-xl-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{element.title}</h5>
                                    <p className="card-description">{element.description}</p>
                                    <a href="#" className="btn btn-danger"
                                    onClick={()=>{DeleteNoteFunc(element._id)}}>Delete Note</a>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            
            
        </div>
    </section>
  )
}

export default Note