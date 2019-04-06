const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.locals.notes = [
  {
    id: 1242,
    title: "test",
    listItems: [
      { text: "testone", isChecked: false },
      { text: "testtwo", isChecked: false },
      { text: "testthree", isChecked: true }
    ]
  }
];

app.get("/api/v1/notes", (request, response) => {
  response.status(200).json(app.locals.notes);
});

app.post("/api/v1/notes", (request, response) => {
  const { notes } = app.locals;
  const newNote = request.body;
  if (Object.keys(newNote).length === 0)
    return response.status(422).json("No request body found");
  notes.push({
    title: newNote.title,
    listItems: newNote.listItems,
    id: Date.now()
  });
  response.status(201).json(notes[notes.length - 1]);
});

app.put("/api/v1/notes/:id", (request, response) => {
  const { id } = request.params;
  const noteIndex = app.locals.notes.find(note => {
    return note.id == id;
  });
  if (!noteIndex) {
    return response.sendStatus(404);
  } else {
		const index = app.locals.notes.indexOf(noteIndex);
		// console.log(request.body)
		// console.log('before', app.locals.notes)
		app.locals.notes.splice(index, 1, request.body);
		// console.log('after', app.locals.notes)
    return response.status(200).json("successfully updated");
  }
});

app.delete("/api/v1/notes/:id", (request, response) => {
	const { id } = request.params;
  const updatedNotes = app.locals.notes.filter(note => note.id != id);
  if (updatedNotes.length === app.locals.notes.length) return response.sendStatus(422);
  app.locals.notes = updatedNotes;
  return response.sendStatus(204);
});

export default app;
