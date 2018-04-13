var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var PetSchema = new Schema({
    name: String,

})


mongoose.model("Pet", PetSchema);