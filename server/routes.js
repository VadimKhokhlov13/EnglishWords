const express = require('express');
const Words = require('./models/Words');

const router = express.Router();

router.get('/', async (req, res) => {
    const words = await Words.find({});
    res.send(words);
});

router.post('/word', async (req, res) => {
    const id = req.body.id;
    const data = Math.floor(Date.now() / 1000);
    const word = await Words.aggregate([
        { $match:  {id: {$ne : id}, date: {$lt : data}} },
        { $sample: {size: 1} }
    ]);
    res.send(word[0]);
});

router.post('/points', (req, res) => {
    const id = req.body.id;
    const isRemembered = req.body.isRemembered;
    if (isRemembered) {
        Words.updateOne(
            { id: id },
            { $inc: {points: 1} }
        )
        .then((obj) => {
            console.log('Updated - ' + obj);
            setDate(id, res);
        })
        .catch((err) => {
            console.log('Error: ' + err);
        })
    } else {
        Words.updateOne(
            { id: id },
            { $set: {points: 0} }
        )
        .then((obj) => {
            console.log('Updated - ' + obj);
            res.send('ok')
        })
        .catch((err) => {
            console.log('Error: ' + err);
        })
    }
})

router.post('/', (req, res) => {
    const id = hash();
    const word = req.body.data.word;
    const translation = req.body.data.translation;
    const item = new Words({id, word, translation});
        
    item.save(err => {
        if(err) {
            return console.log(err);
        }
        res.send(item);
    });
});

router.post('/delete', (req, res) => {
    const id = req.body.id;
    Words.deleteOne({id: id}, function(err, result) {
        console.log(result);
    });
    console.log(id);
})

function hash() {
    let str = '';
    for(let i = 0; i < 8; i++) {
        let charCode = Math.floor(Math.random() * (122 - 48 + 1)) + 48;
        str += String.fromCharCode(charCode);
    }
    return str;
}

async function setDate(id, res) {
    const word = await Words.aggregate([
        { $match:  {id: id} }
    ]);
    const points = word[0].points;
    let date = Math.floor(Date.now() / 1000);
    switch(points) {
        case 5:
            date += 60 * 60 * 24;
            break;
        case 10:
            date += 60 * 60 * 24 * 2;
            break;
        case 13:
            date += 60 * 60 * 24 * 5;
            break;
        case 16:
            date += 60 * 60 * 24 * 10;
            break;
        case 18:
            date += 60 * 60 * 24 * 20;
            break;
        case 20:
            date += 60 * 60 * 24 * 30;
            break;
    }
    if (points > 20 && points % 2 == 0) {
        date += 60 * 60 * 24 * 45;
    }
    Words.updateOne(
        { id: id },
        { $set: {date: date} }
    )
    .then((obj) => {
        console.log('Updated - ' + obj);
        res.send('ok')
    })
    .catch((err) => {
        console.log('Error: ' + err);
    })
}

module.exports = router;