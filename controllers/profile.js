const handleProfileGet = (req, res, db) => {
    let { id } = req.params;

    db.select('*').from('users').where('id', parseInt(id)).then(user => {
        if(user.length > 0){
            res.json(user[0])
        } else {
            res.status(400).json("User Not found")
        }
    })
}

module.exports = {
    handleProfileGet : handleProfileGet
}