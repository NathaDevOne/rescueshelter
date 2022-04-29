const mongoose = require('mongoose');

const rescuerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    name: {
        fname: {
            type: String,
            required: [true, 'Please enter your name'],
        	maxLength: [30, 'Your name cannot exceed 30 characters']
        },
        lname: {
            type: String,
            required: [true, 'Please enter your name'],
        	maxLength: [30, 'Your name cannot exceed 30 characters']
        },
    },
	email: {
	    type: String,
	    required: [true, 'Please enter your email'],
	    unique: true,
	    validate: [validator.isEmail, 'Please enter valid email address']
	},
    addr: {
        type: String,
        required: true
    },
    num: {
        type: Number,
        required: [true, 'Please enter contact number'],
        maxLength: [11, 'Contact number cannot exceed 11 characters'],
        default: 0
    },
	createdAt: {
	    type: Date,
	    default: Date.now
	}
})

module.exports = mongoose.model('Rescuer', userSchema);