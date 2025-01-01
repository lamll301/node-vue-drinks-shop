
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const BeverageIngredient = new Schema({
    _id: Number,
    beverageId: { type: Number, ref: 'Beverage' },
    ingredientId: { type: Number, ref: 'Ingredient' },
    unitId: { type: Number, ref: 'Unit' },
    quantity: Number,
});

BeverageIngredient.plugin(AutoIncrement, { id: 'beverageIngredientId', inc_field: '_id' });

module.exports = mongoose.model('BeverageIngredient', BeverageIngredient);