import React, { useContext } from 'react'
import noteContext from '../Context/NotesContext';

export default function NoteItem(props) {

    const { deleteNotes } = useContext(noteContext);

    const { title, desciption, id } = props;

    const deleteNote = (id) => {
        deleteNotes(id)
    }

    return (
        <div className="card mx-3 my-3" style={{ "width": "18rem" }}>
            <div className='container' id="note_title">
                <div className='title'>
                    <h5 className="card-title">{title}</h5>
                </div>

                <div id="editors">
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => props.updateNotes(id, title, desciption)} data-toggle="modal" data-target="#exampleModal"></i>
                    <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(id) }}></i>
                </div>

            </div>
            <div className='card-desciption'>
                <p className="card-text">{desciption}</p>

            </div>
        </div>
    )
}
