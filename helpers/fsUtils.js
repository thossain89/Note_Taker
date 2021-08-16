const fs = require('fs');
const util = require('util');


// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);



/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file we want to write to.
 *  @param {object} content The content we want to write to the file.
 *  
 */

 const writeToFile = (destination, content) =>
 fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
   err ? console.error(err) : console.info(`\nData written to ${destination}`)
 );

 /**
 *  Function to read data from a given a file and append some content
 * @param {string} file The path to the file you want to save to.
 * @param {object} content The content you want to append to the file.  
 * 
 */

  const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };

  /** 
   * Function to delete the note with unique ID 
   * @param {id} id from uuid helper   
  */

  const deleteFromFile = (id) => {

        
        readFromFile('./db/db.json', 'utf-8')
        .then((stringData) => {
            const parsedData =JSON.parse(stringData);
            let output = parsedData.filter((notes) => notes.id !== id);
            writeToFile('./db/db.json', output);
        }).catch((err) => {
            console.error(err);
        });    
  };

  module.exports = { readFromFile, writeToFile, readAndAppend, deleteFromFile };