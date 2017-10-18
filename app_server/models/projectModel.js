var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = Schema({
	title: {type: String, unique: false, required: true},
	supervisor: {type: String, unique: false, required:true},
	supervisor2: {type: String, unique: false, required:false},
	supervisor3: {type: String, unique: false, required:false},
	supervisor4: {type: String, unique: false, required:false},
	supervisor5: {type: String, unique: false, required:false},
	capacityMIN: {type: Number, unique: false, required:true},
	capacityMAX: {type: Number, unique: false, required:true},
	description: {type: String, unique: false, required: true},
	prerequisites: {type: String, unique: false, required: false},
	discipline: [{type: String, unique: false, required: false}],
	timeStamp:{type: String, unique: false, required: true},
	numAllocated: {type: Number, unique: false, required: true}
})


module.exports = mongoose.model('Project', projectSchema);
