const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({

    busName: {
        type: String,
        required: true
    },

    from: {
        type: String,
        required: true
    },

    to: {
        type: String,
        required: true
    },

    departure: {
        type: String,
        required: true
    },

    arrival: {
    type: String,
    required: true
},

    type: {
        type: String,
        required: true
    },

    operator: {
        type: String,
        required: true
    },

    via: [String],

stops: [
    {
        name: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    }
],
    status: {
        type: String,
        default: "🟢 Running"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Bus", busSchema);