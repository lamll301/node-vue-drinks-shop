

class AdminController {

    // [GET] /admin
    index(req, res) {
        res.send('admin home')
    }
}

module.exports = new AdminController