import React, { useContext, useState } from 'react'
import noteContext from '../Context/NotesContext';

export default function Addnotes() {


    const { addNewNotes } = useContext(noteContext);
    const [currentNote, setcurrentNote] = useState({ title: "", desciption: "" });

    const handleclick = (e) => {
        e.preventDefault()
        addNewNotes(currentNote.title, currentNote.desciption)
        setcurrentNote({ title: "", desciption: "" })
    }

    const handleChange = (e) => {
        setcurrentNote({ ...currentNote, [e.target.name]: e.target.value })
    }

    return (
        <div className='fillnote'>
            <h1>NEW NOTE!!</h1>
            <form>
                <div className="form-group">
                    <label id='label'>Title</label>
                    <input className="form-control" id="title" name='title'  value={currentNote.title} aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label id='label'>Desciption</label>
                    <textarea className="form-control" name="desciption" value={currentNote.desciption} rows="4" cols="50" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-success" onClick={handleclick}>Add Note</button>
            </form>
        </div>
    )
}
