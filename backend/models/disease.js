const mongoose = require('mongoose')

const diseaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter disease name'],
        trim: true,
        maxLength: [100, 'disease name cannot exceed 100 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Disease', diseaseSchema);