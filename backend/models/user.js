const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
// const TransactionSchema = require('./Transaction'); 
// create geolocation Schema
// const GeoSchema = new Schema({
//     type: {
//         type: String,
//         default: 'Point'
//     },
//     coordinates: {
//         type: [Number],
//         index: '2dsphere'
//     }
// });

const TransactionSchema = new Schema({
    username: {
        type: String
    },
    amount: {
        type: Number
    },
    date: {
        type: Date,
        default: moment().toDate()
    }
});
// create ninja Schema & model
// const NinjaSchema = new Schema({
//     name: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     rank: {
//         type: String
//     },
//     available: {
//         type: Boolean,
//         default: false
//     },
//     geometry: GeoSchema
// });
const UserSchema = new Schema({
    displayName: {
        type: String
    },
    username: {
        type: String
    },
    googleId: {
        type: String
    },
    transactions: [TransactionSchema]
});
// const Ninja = mongoose.model('ninja', NinjaSchema);
const User = mongoose.model('user', UserSchema);

module.exports = User;