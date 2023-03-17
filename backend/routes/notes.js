const express = require('express');
const router = express.Router();
const notes = require('../models/Notes');
const { fetchusers } = require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator');


//Fetch all notes
router.get('/fetchallnotes', fetchusers, async (req, res) => {

    const note = await notes.find({ user: req.user });
    res.json(note)

})

//to add new notes
router.post('/addnote', fetchusers, [
    body('title', "title value should have atleast 5 length").isLength({ min: 5 }),
    body('desciption', "Enter a description with 5+ length").isLength({ min: 5 })
], async (req, res) => {

    const { title, desciption } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const note = await new notes({
        title,
        desciption,
        user: req.user
    })

    const savednotes = await note.save()

    res.json(savednotes)

})

//to update notes
router.put('/updatenote/:id', fetchusers, [
    body('title', "title value should have atleast 5 length").isLength({ min: 5 }),
    body('desciption', "Enter a valid email id").isLength({ min: 5 })
], async (req, res) => {

    const { title, desciption } = req.body;

    let newnote = {}
    if (title) { newnote.title = title }
    if (desciption) { newnote.desciption = desciption }

    let note = await notes.findById(req.params.id);

    if (!note) {
        return res.status(404).send("No notes found")
    }

    if (req.user !== note.user.toString()) {
        return res.status(404).send("No Allowed to edit notes")
    }

    note = await notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
    res.json({ note })

})

//delete notes
router.delete('/deletenote/:id', fetchusers, [
    body('title', "title value should have atleast 5 length").isLength({ min: 5 }),
    body('desciption', "Enter a valid email id").isLength({ min: 5 })
], async (req, res) => {

    let note = await notes.findById(req.params.id);

    if (!note) {
        return res.status(404).send("No notes found")
    }

    if (req.user !== note.user.toString()) {
        return res.status(404).send("No Allowed to delete notes")
    }

    note = await notes.findByIdAndDelete(req.params.id)
    res.json({ msg: "deleted successfully" })

})

module.exports = router