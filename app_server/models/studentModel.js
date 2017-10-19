var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var Schema = mongoose.Schema;
var SchemaType = mongoose.Schema.Types;

var studentSchema = Schema({
	firstName: {type: String, unique: false, required: true},
	lastName: {type: String, unique: false, required: true},
	studentID: {type: String, unique: false, required: true},
	phoneNumber: {type: String, unique: false, required: true},
	discipline: {type: String, unique: false, required: true},
	wam: {type: SchemaType.Double, unique: false, required: true},
	preferences: [{type: String, unique: false, required: true}],
	assignedProject: {type : String, unique: false, required: false}
});



module.exports = mongoose.model('Student', studentSchema);
