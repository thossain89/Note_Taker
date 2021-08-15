const fs = require('fs');
const utils = require('util');


// Promise version of fs.readFile
const readFromFile = utils.promisify(fs.readFile);

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} path The file we want to write to.
 *  @param {object} content The content we want to write to the file.
 *  
 */

 const writeToFile = (path, content) =>
 fs.writeFile(path, JSON.stringify(content, null, 4), (err) =>
   err ? console.error(err) : console.info(`\nData written to ${path}`)
 );

 /**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} path The path to the file you want to save to.
 * 
 */

  const readAndAppend = (path, content) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(path, parsedData);
      }
    });
  };

  /** 
   * Function to delete the note with unique ID 
   * @param {id} id from uuid helper   
  */

  const deleteFromFile = (id) => {

        let dbFilePath = './db/db.json';
        readFromFile(dbFilePath, 'utf-8')
        .then((stringData) => {
            const parsedData =JSON.parse(stringData);
            let output = parsedData.filter((note) => note.id !== id);
            writeToFile(dbFilePath, output);
        }).catch((err) => {
            console.error(err);
        });    
  };

  module.exports = { readFromFile, writeToFile, readAndAppend, deleteFromFile };