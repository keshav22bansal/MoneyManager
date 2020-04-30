const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

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
    username: {
        type: String
    },
    avatar:{
        type:String,
        default:""
    },
    password: {
        type: String
    },
    transactions: [TransactionSchema]
});
// const Ninja = mongoose.model('ninja', NinjaSchema);
const AppUser = mongoose.model('appuser', UserSchema);

module.exports = AppUser;
