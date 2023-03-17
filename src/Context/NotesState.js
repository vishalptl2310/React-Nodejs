import noteContext from "./NotesContext";
import { useState } from "react";

import React from 'react'

export default function NotesState(props) {

  const [notes, setnotes] = useState([]);

  const addNewNotes = async (title, desciption) => {
    const url = "http://localhost:5000/api/notes/addnote"

    const json_data = {
      title,
      desciption
    }


    let promise = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(json_data)
    });

    let json = await promise.json();

    setnotes(notes.concat(json))

  }

  const updateNote = async (id, title, desciption) => {
    const url = `http://localhost:5000/api/notes/updatenote/${id}`

    let promise = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({
        title,
        desciption
      })
    });

    let json = await promise.json();
    console.log(json)

    setnotes( notes.map((value) => {

      if (value._id === id) {
        value.title = title;
        value.desciption = desciption;
        return value
      }
      else{
        return value
      }
    }))
    console.log(notes)

  }
  const deleteNotes = async (currentNoteid) => {
    let url = `http://localhost:5000/api/notes/deletenote/${currentNoteid}`

    let promise = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

    });
    let json = await promise.json();

    setnotes(
      notes.filter((element) => {
        return element._id !== currentNoteid
      })
    )
  }



  const fetchaAllNotes = async () => {
    let url = "http://localhost:5000/api/notes/fetchallnotes"

    let promise = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    console.log(promise)
    let json = await promise.json();
    setnotes(json)
  }


  return (
    <noteContext.Provider value={{ notes, setnotes, addNewNotes, deleteNotes, fetchaAllNotes, updateNote }}>
      {props.children}
    </noteContext.Provider>
  )
}
