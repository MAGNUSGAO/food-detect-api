const handleRegister = (req, res, db, bcrypt) => {
    // Destructre
    const { email, name, password } = req.body 
    if(!(email && name && password)) {
        return res.status(400).json('Incorrect submission')
    }
    const hash = bcrypt.hashSync(password)
    // Transaction: if one action fails, the entire action fails
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into("login")
            .returning('email')
            .then(loginEmail => {
                db('users').returning('*').insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                }).then(response => {
                    res.json(response[0]) 
                })
            })
            // We have to commit after using trx
            .then(trx.commit).catch(trx.rollback)
        }).catch(err => {
            res.status(400).json('Unable to Register')
        })
}

module.exports = {
    handleRegister: handleRegister
}