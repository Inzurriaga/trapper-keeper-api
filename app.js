
const express = require("express")
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

app.locals.notes = [{id: 1242, title: "test", listItem: [{text: "testone", isChecked: false}, {text: "testtwo", isChecked: false}, {text: "testthree", isChecked: true}]}
]

app.get("/api/v1/notes", (request, response) => {
    response.status(200).json(app.locals.notes)
})

app.post("/api/v1/notes", (request, response) => {
    const { notes } = app.locals
    const newNote = request.body
    if(Object.keys(newNote).length === 0 ) return response.status(422).json('No request body found');
    notes.push({title: newNote.title, listItem: newNote.listItem , id: Date.now()})
    response.status(201).json(notes[notes.length - 1])
})

// check if we need both patch and put or just require user to update both ?????????
app.patch("/api/v1/notes/:id", (request, response) => {

})

// app.put("/api/v1/notes/:id", (request, response) => {
// 	const { id } = request.params;
// 	const updatedNotes =
// })

app.delete("/api/v1/notes/:id", (request, response) => {
		console.log('backend delete fires')
		console.log(request.params.id)
		const { id } = request.params
		const updatedNotes = app.locals.notes.filter(note => note.id != id);
		if(updatedNotes === app.locals.notes) return response.sendStatus(422)
		console.log("im working")
		app.locals.notes = updatedNotes
		return response.sendStatus(204)
})

export default app;
