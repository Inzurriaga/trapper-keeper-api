const express = require("express");
//brings in the express library
const app = express();
//sets up our express server
const cors = require("cors");
// brings in the CORS library
app.use(cors());
// our express server will use CORS to allow for resource sharing
// and let us bypass security issues
app.use(express.json());
// this is a built in middleware function that parses incoming requests
// it returns middleware that only parses json and only looks at 
// requests where the content-type matches the type option
app.locals.notes = [];
// sets up our storage for our notes

app.get("/api/v1/notes", (request, response) => {
  // if there is a GET request made to the url
  response.status(200).json(app.locals.notes);
  //return a status of 200 and the app.locals.notes contents as JSON
});

app.post("/api/v1/notes", (request, response) => {
  // if a POST request made to the url
  const { notes } = app.locals;
  //desructure notes from app.locals
  const newNote = request.body;
  // declare the request.body as newNote
  if (Object.keys(newNote).length === 0)
  // if the newNote has no keys
    return response.status(422).json("No request body found");
    //return a 422 status and a message as JSON
  notes.push({
    title: newNote.title,
    listItems: newNote.listItems,
    id: Date.now()
  });
  // push the newNote info (with a new ID) onto the notes array 
  response.status(201).json(notes[notes.length - 1]);
  // send a 201 status and the note object as JSON
});

app.put("/api/v1/notes/:id", (request, response) => {
  // if a PUT request is made to the url
  const { id } = request.params;
  // destructure the id from the request.params
  const noteIndex = app.locals.notes.find(note => {
    // declare a variable for noteIndex and 
    return note.id == id;
    // return the index number that matches 
  });
  if (!noteIndex) {
    //if there is no matching index
    return response.sendStatus(404);
    // respond that the note was not found
  } else {
		const index = app.locals.notes.indexOf(noteIndex);
    //declare index to be the index of the found note
    app.locals.notes.splice(index, 1, request.body);
    // splice in the request body to overwrite the outdated note
    return response.status(200).json("successfully updated");
    //respond with a 200 status and a message as JSON
  }
});

app.delete("/api/v1/notes/:id", (request, response) => {
  // if a DELETE request has been made to the url
  const { id } = request.params;
  //destructure the id from the request.params
  const updatedNotes = app.locals.notes.filter(note => note.id != id);
  // filter for all the notes that do not match the id
  if (updatedNotes.length === app.locals.notes.length) return response.sendStatus(422);
  // if no id is found and there is no length change, return a 422 status
  app.locals.notes = updatedNotes;
  // reassign updatedNotes to the local notes array
  return response.sendStatus(204);
  //response with a 204 status
});

export default app;
