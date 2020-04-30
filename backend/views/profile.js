import { userInfo } from "os";

// const express = require ('express');
// // const router = express.Router();
// // const User = require('../models/user');
// const User = require('../models/user');
var addUsername = function(e){
    e.preventDefault();
    $.ajax({
    url:'/username',
    data:{id:user.id,name:$("input").value()}
    });
    console.log("Hey");
}