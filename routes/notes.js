const notesRouter = require('express').Router();
const { readAndAppend, deleteFromFile, readFromFile }= require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notesRouter.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => {
  console.log(data);
  res.json(JSON.parse(data))})
  .catch((err) => {
    console.log(err);
  })
});

// POST Route for submitting notes
notesRouter.post('/', (req, res) => {
  
  console.log(req.body);

    const { title, text } = req.body;
  
    // If all the required properties are present

    if (req.body) {

      // Variable for the object we will save
      const newNote = {
        
        title,
        text,
        id: uuid(),

      };
  
      readAndAppend(newNote,'./db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);

    } else {

      res.json('Error in posting Note');
    }
});

  // Delete route for removing notes using id
 notesRouter.delete('/:id', (req, res) => {
 
    // Check for query parameters
    const queryParams = Object.keys(req.params).length > 0;

    
    if(queryParams){
        let id = req.params.id;
        deleteFromFile(id);
        const response = {
            status: 'removed',
            body: id,
        };
        
        res.json(response);
    }else{
        res.json(`Failed`);
    }

});
  
module.exports = notesRouter;