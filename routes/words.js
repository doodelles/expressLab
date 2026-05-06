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
