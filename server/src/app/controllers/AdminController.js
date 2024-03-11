
const Beverage = require('../models/Beverage')

class AdminController {

    // [GET] /admin
    async index(req, res) {

        const instance = await Beverage.find({});
        res.send(instance)

        // const users = [{
        //     id: 1,
        //     name: 'Richard Hendricks',
        //     email: 'richard@piedpiper.com',
        // },
        // {
        //     id: 2,
        //     name: 'Bertram Gilfoyle',
        //     email: 'gilfoyle@piedpiper.com',
        // },
        // ];
        // res.send(users)
    }
}

module.exports = new AdminController