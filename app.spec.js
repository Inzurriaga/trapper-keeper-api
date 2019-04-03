import request from 'supertest'
import '@babel/polyfill'
import app from './app.js'

describe('api', () => {
  let notes;
  beforeEach(() => {
    notes = [{id: 1242, title: "test", body: [{context: "testone", isChecked: false}, {context: "testtwo", isChecked: false}, {context: "testthree", isChecked: true}]}]
    app.locals.notes = notes
  })

  describe('get /api/v1/notes', () => {
    it('should return a 200 status and an array of notes', async () => {
      const response = await request(app).get('/api/v1/notes')
      expect(response.status).toBe(200)
      expect(response.body).toEqual(app.locals.notes)
    })

    it('should return a 404 if something is arye', async () => {
      const response = await request(app).get('/api/v1/not/')
      expect(response.status).toBe(404)
      
    })
  })

  describe('post /api/v1/notes/', () => {
    it('should return a 201 status and a note object if all goes well', async () => {
      expect(app.locals.notes.length).toBe(1)
      Date.now = jest.fn().mockImplementation(() => 10)
      const goodNote = [{title: "test", body: [{context: "testone", isChecked: false}, {context: "testtwo", isChecked: false}, {context: "testthree", isChecked: true}]}]
      const response = await request(app).post('/api/v1/notes/').send(goodNote)
      
      expect(response.status).toBe(201)
      expect(response.body).toEqual({id: 10, ...goodNote})
      expect(app.locals.notes.length).toBe(2)
    })

    it('should return a 422 if there is a problem', async () => {
      const badNote = {}
      const response = await request(app).post('/api/v1/notes').send(badNote)
      expect(response.status).toBe(422)
      expect(response.body).toEqual({error: 'No request body found'})
    })
  })

})