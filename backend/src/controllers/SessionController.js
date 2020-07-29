//index, show, store, update, destroy
//Métodos de um controller MVC

const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { email } = req.body;
        //Procura se ja tem algum usuario cadastrado com aquele email
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email });
        }

        return res.json(user);
    }
};