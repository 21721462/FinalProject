var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var coordinatorSchema = Schema ({
	cutDate:{type: String, unique: false, required: true},
	password :{type: String, unique: false, required: true}
});

module.exports = mongoose.model('Coordinator', coordinatorSchema);
