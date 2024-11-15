const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    binaryClassResult: [{
        modelUsed: {
            type: String,
            required: true,
            enum: ['knn', 'rf', 'cnn', 'lstm']
        },
        result: {
            type: String,
            required: true,
            enum: ['normal', 'attack']
        }
    }],
    multiClassResult: [{
        modelUsed: {
            type: String,
            required: true,
            enum: ['knn', 'rf', 'cnn', 'lstm']
        },
        result: {
            type: String,
            required: true,
            enum: ['dos', 'normal', 'probe', 'u2r', 'r2l']
        }
    }],
    networkTraffic: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'NetworkTraffic', 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;

// Explanation:
// binaryClassResult: An array containing objects with modelUsed and result fields, indicating binary classification results.
// multiClassResult: An array containing objects with modelUsed and result fields, indicating multi-class classification results.
// networkTraffic: A reference to the NetworkTraffic model, which is required for each log entry.
// createdAt: Automatically sets the date and time when the log entry is created.
// This model structure ensures that all required fields are included and properly referenced.
