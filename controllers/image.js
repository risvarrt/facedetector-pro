const Clarifai = require('clarifai');
const knex = require('knex');

const app = new Clarifai.App({
    apiKey: '2ecce0c053ef463f8f6c8e53549b9059'
   });
const handleApiCall = (req, res) => {
    app.models
      // This part has been updated with the recent Clarifai changed. Used to be:
      // .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
  }

const handleImage = (req, res,db) => {
const { id }=req.body;
    knex('books')
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
      res.json(entries[0]);
  })
  .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports ={
    handleImage,
    handleApiCall
};