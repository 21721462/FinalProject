var mongoose = require('mongoose')


var Schema = mongoose.Schema;

var studentSchema = Schema({
	firstName: {type: String, unique: false, required: true},
	lastName: {type: String, unique: false, required: true},
	studentID: {type: String, unique: true, required: true},
	phoneNumber: {type: Number, unique: true, required: true},
	discipline: {type: String, unique: false, required: true},
	wam: {type: Number, unique: false, required: true},
	preferences: [{p1: {type: String}, p2: {type: String}, p3: {type: String}, p4: {type: String}, p5: {type: String}, p6: {type: String}}]
	assighnedProject: [{type: Schema.Types.ObjectId, ref :'Project', unique: true, required: true}]
});



module.exports = mongoose.model('Student', studentSchema);