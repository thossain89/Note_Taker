const notesRouter = require('express').Router();
const { readAndAppend }= require('../helpers/fsUtils');
const { deleteFromFile}= require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notesRouter.get('/', (req, res) =>
  readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting notes
notesRouter.post('/', (req, res) => {
    // Destructuring 

    const { title, text } = req.body;
  
    // If all the required properties are present

    if (title && text) {

      // Variable for the object we will save
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, '../db/db.json');
  
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