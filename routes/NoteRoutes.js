const noteModel = require('../models/Notes.js');
//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
app.post('/notes', (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to save the note

    const { noteTitle, noteDescription, priority } = req.body ;
    
    const note = new noteModel({
        noteTitle,
        noteDescription,
        priority
    });

    note.save()
        .then(savedNote => {
            res.status(201).send(savedNote)
        }) 
        .catch(error => {
            res.status(400).send(error)
        });

    
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to returns all note

    noteModel.find()
        .then( notes => {
            res.status(200).send(notes)
        }) 
        .catch(error =>{
            res.status(500).send(error)
        });
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to return onlt one note using noteid
    const { noteId } = req.params;
    noteModel.findById(noteId)
        .then(note =>{
            if(!note) {
                res.status(404).send({message:"Note Not Found"})
            }
            res.status(200).send(note)
        })
        .catch(error => {
            res.status(500).send(error)
        })
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to update the note using noteid
    const { noteId } = req.params;

    const updatedData = {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateUpdated: Date.now()
    }

    noteModel.findByIdAndUpdate(noteId, updatedData, {new: true})
        .then(updatedNote =>{
            if(!updatedNote) {
                return res.status(404).send({message: "Note Not Found"})
            }
            res.status(201).send(updatedNote)
        }
        )
        .catch(error => {
            res.status(400).send(error)
        });
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to delete the note using noteid

    const { noteId } = req.params;
    
    noteModel.findByIdAndRemove(noteId)
        .then(deletedNote => {
            if(!deletedNote) {
                return res.status(404).send({message:"Note Not Found"})
            }
            res.status(200).send({message: "Note Deleted Successfully"})
        })
        .catch(error => {
            res.status(400).send(error)
        });
    
});
