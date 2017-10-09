var mongoose = require('mongoose')


var Schema = mongoose.Schema;

var studentSchema = Schema({
	firstName: {type: String, unique: false, required: true},
	lastName: {type: String, unique: false, required: true},
	studentID: {type: String, unique: true, required: true},
	phoneNumber: {type: Number, unique: true, required: true},
	discipline: {type: String, unique: false, required: true},
	wam: {type: Number, unique: false, required: true},
	preferences: [{type: String, unique: false, required: true}],
	assignedProject: [{type: Schema.Types.ObjectId, ref :'Project', unique: false, required: true}]
});



module.exports = mongoose.model('Student', studentSchema);
