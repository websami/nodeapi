// routes/note_routes.js

var ObjectID    = require('mongodb').ObjectID;
var moment      = require('moment');
var Objutc      = null;

function getTimeStamp(timestamp) {
    var interval = 1000;
    var timestamp = Number(moment().format('X'));
    setInterval(function() { clearInterval(timestamp) },interval);
    return timestamp;
}

module.exports = function(app, db) { 
    
    //http get specific data    
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
              } else {
                res.send(item);
              }
        });
    });
    
    
     //http get specific idkey    
    app.get('/notes/:id?timestamp=:oras', (req, res) => {
        const id = req.params.id;
        const oras = req.params.value;
        const details = { '_id': new ObjectID(id), 'timestamp': new ObjectID(oras) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
              } else {
                res.send(item);
              }
        });
    });
    
   
    //http post data
    app.post('/notes', (req, res) => {
        const note = { value: req.body.value, timestamp: getTimeStamp(Objutc) }
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' }); 
              } else {
                    res.send(result.ops[0]);
            }
        });
    });
    
    //http remove data in specific id
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
                } else {
                    res.send('Note ' + id + ' deleted!');
            } 
        });
    });
    
    //http edit data in specific id
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { value: req.body.value, timestamp: getTimeStamp(Objutc) };
        db.collection('notes').update(details, note, (err, result) => {
              if (err) {
                  res.send({'error':'An error has occurred'});
                } else {
                    res.send(note);
            } 
        });
    });
    
};