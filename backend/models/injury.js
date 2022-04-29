const mongoose = require('mongoose')

const injurySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter injury name'],
        trim: true,
        maxLength: [100, 'Injury name cannot exceed 100 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Injury', injurySchema);