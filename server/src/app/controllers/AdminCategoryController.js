
const Category = require('../models/Category')

class AdminCategoryController {

    // [GET] /admin/category
    async show(req, res, next) {
        await Category.find({})
            .then(categories => res.send(categories))
            .catch(next)
    }   

    // [POST] /admin/category/create
    async create(req, res, next) {
        let categoryObj = { ...req.body }
        categoryObj.images = []
        if (req.file) {
            categoryObj.images.push({
                data: req.file.buffer,
                contentType: req.file.mimetype,
                name: req.file.filename,
            })
        }
        const category = new Category(categoryObj);
        await category.save()
            .then(() => res.send('success'))
            .catch(next)
    }

    // [DELETE] /admin/category/:id
    async delete(req, res, next) {
        await Category.deleteOne({ _id: req.params.id })
            .then(() => res.send('success'))
            .catch(next)
    }

    // [GET] /admin/category/:id
    async detail(req, res, next) {
        await Category.findById(req.params.id)
            .then(category => res.send(category))
            .catch(next)
    } 
    
    // [PUT] /admin/category/:id
    async update(req, res, next) {
        await Category.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('success'))
            .catch(next)
    } 
    // [PUT] /admin/category/:id/addImage
    async addImage(req, res, next) {
        if (!req.file) {
            return;
        } 
        const newImage = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
            name: req.file.filename,
        }
        await Category.updateOne(
            { _id: req.params.id },
            { $push: { images: newImage } }
        )
            .then(() => res.send('success'))
            .catch(next)
    } 
    // [PUT] /admin/category/:id/removeImage
    async removeImage(req, res, next) {
        const { imageId } = req.body
        await Category.updateOne(
            { _id: req.params.id },
            { $pull: { images: { _id: imageId } } }
        )
            .then(() => res.send('success'))
            .catch(next)
    }
}

module.exports = new AdminCategoryController