const express = require ('express');
const router = express.Router(); 
const {readFile, writeFile} = require ('fs').promises; //destructring

router.get('/', (req, res)=>{
    res.send('Word Home Page');
});
router.get('/word',async (req, res) =>{ // /users/
    let wordArray = await getWordFromDictionary();
    let [word, part, definition] = wordArray;
    res.render('wotd',{word: word, part:part, definition:definition});
    //do soemthign with that fucntion up here
});
router.get('allwords', (req,res)=>{
/**?
 * --class guidance to reference below --
hw-make path, simialr function like in get from dictionary 
that grabs all the words in order
then have a page like render wotd,(wotd.ejs) we need to make an all words view
that this will render and then loop thru all the words to make it happen and send back 
and object with everything use the same concepts as in the get word form dictionary
*/

 try {
    const data = await readFile('resources/allwords.txt', 'utf8');
    let lines = data.split('\n');

    lines.sort();
   
    res.render('words', {allWords: lines});
 } catch (err){
    console.log('There was an error reading the file:', err);
 }
// added refernece to this portion  in the words.ejs file 
 });
 

let getWordFromDictionary = async ()=>{
    try{
        const data = await readFile('resources/allwords.txt', 'utf8');
        let lines = data.split('\n');
        let randomNumber = (Math.random() *lines.length);
        let randomLine = lines[randomNumber];
        let wordArray = randomLine.split('\t');
        console.log(wordArray);
        return wordArray;
    }
    catch(err){
        console.log('There was an error reading the file:', err);
    }
};
module.exports = router;
