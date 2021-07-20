// const Clarifai = require('clarifai')

// const app = new Clarifai.App({
//     apiKey: '85395c132796493384dba82d745c87e3'
// });

const handleImage = (req, res, db) => {
    const { id } = req.body
    db('users').where('id', parseInt(id))
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    }).catch(err => {
        res.status(400).json("Sorry, unable to get entries")
    })
}

module.exports = {
    handleImage : handleImage
}