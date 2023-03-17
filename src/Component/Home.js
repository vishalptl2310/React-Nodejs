import React, { useContext, useEffect, useState } from 'react'
import Addnotes from './Addnotes'
import NoteItem from './NoteItem'
import noteContext from '../Context/NotesContext';
import { useNavigate  } from 'react-router-dom';

export default function Home() {
  const navigation = useNavigate();
  const { notes, fetchaAllNotes, updateNote } = useContext(noteContext);
  const [editNote, seteditNote] = useState({ id: "", title: "", desciption: "" });

  useEffect(() => {

    console.log("hello")
    if(!localStorage.getItem("token")){
      navigation("/login")
    }
    else{
      fetchaAllNotes()
    }

  }, []);

  const updateCurrentNote = (id, title, desciption) => {
    seteditNote({ id, title, desciption })
  }

  const handleChange = (e) => {
    seteditNote({ ...editNote, [e.target.name]: e.target.value })
  }

  const finalUpdateCall = () => {
    updateNote(editNote.id, editNote.title, editNote.desciption)

  }

  return (
    <>
      <div className='container d-flex justify-content-center' id="add_notes">
        <Addnotes />
      </div>
      <div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label id='label'>Title</label>
                    <input className="form-control" id="title" name='title' value={editNote.title} aria-describedby="emailHelp" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label id='label'>Desciption</label>
                    <textarea className="form-control" name="desciption" value={editNote.desciption} rows="4" cols="50" onChange={handleChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-success" data-dismiss="modal" onClick={finalUpdateCall}>Save changes</button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="yournotes">
        <hr></hr>

        <div>
          <h1> <b>YOUR NOTES</b></h1>
        </div>
        
        <div className='row my-3' id="each_note">

          {notes.map((element) => {
            return <NoteItem key={element._id} title={element.title} desciption={element.desciption} id={element._id} updateNotes={updateCurrentNote} />
          })}

        </div>
      </div>
    </>
  )
}
