const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/mytask`).then(()=>{
    console.log("mongoose connection successfull*******");
}).catch((error)=>{
    console.log("mongoose connection Error");
})