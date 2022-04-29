const mongoose = require('mongoose')

const rescueSchema = new mongoose.Schema({
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
        type: String,
        required: [true, 'Please enter animal name'],
        trim: true,
        maxLength: [10, 'animal name cannot exceed 10 characters']
    },
    type: {
        type: String,
        required: [true, 'Please select animal type'],
        enum: {
            values: [
                'Cat',
                'Dog'
            ],
            message: 'Please select correct type for animal'
        }
    },
    breed: {
        type: String,
        required: [true, 'Please select animal breed'],
        enum: {
            values: [
                'Aspin',
                'Bulldog',
                'Retriever',
                'Labrador',
                'Munchkin',
                'Persian',
                'Puspin',
                'Shiba inu',
                'Siberian',
                'Siamese'
            ],
            message: 'Please select correct breed for animal'
        }
    },
    gender: {
        type: String,
        required: [true, 'Please select animal type'],
        enum: {
            values: [
                'Female',
                'Male'
            ],
            message: 'Please select correct gender for animal'
        }
    },
    age: {
        type: Number,
        required: [true, 'Please enter animal age'],
        maxLength: [2, 'Animal age cannot exceed 2 characters'],
        default: 1
    },
    diseases: [
        {
            disease: {
                type: mongoose.Schema.ObjectId,
                ref: 'Disease'
            }
        }
    ],
    injuries: [
        {
            injury: {
                type: mongoose.Schema.ObjectId,
                ref: 'Injury'
            }
        }
    ],
    condition: {
        type: String,
        required: [true, 'Please select animal condition'],
        enum: {
            values: [
                'Adopted',
                'Not treated',
                'Requested',
                'Treated'
            ],
            message: 'Please select correct condition for animal'
        },
        default: 'Not treated'
    },
    request: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    adopter: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    adoptedAt: {
        type:Date
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Rescue', rescueSchema);