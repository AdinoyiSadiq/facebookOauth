const mongoose = require('mongoose');
const { Schema }= mongoose;

const userSchema = new Schema({
	facebookId: String,
	email: { type: String, unique: true, lowercase: true }
});

mongoose.model('users', userSchema);