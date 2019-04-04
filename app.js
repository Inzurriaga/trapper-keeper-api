import express from 'express'
const app = express()
import cors from 'cors'
app.use(cors())
app.use(express.json())


app.locals.notes = [{ id: 1242, title: "test", body: [{ context: "testone", isChecked: false }, { context: "testtwo", isChecked: false }, { context: "testthree", isChecked: true }] }]

app.get("/api/v1/notes", (request, response) => {
	// check if this is capable of a sad path
	response.status(200).json(app.locals.notes)
})

app.get("/api/v1/notes/:id", (request, response) => {
	
})

app.post("/api/v1/notes", (request, response) => {
	const { notes } = app.locals
	const newNote = request.body
	if (Object.keys(newNote).length === 0) return response.status(422).send({
		error: 'No request body found'
	});
	notes.push({ ...newNote, id: Date.now() })
	response.status(201).json(notes[notes.length - 1])

})

// check if we need both patch and put or just require user to update both ?????????
app.patch("/api/v1/notes/:id", (request, response) => {

})


app.put("/api/v1/notes/:id", (request, response) => {

})

app.delete("/api/v1/notes/:id", (request, response) => {

})

export default app