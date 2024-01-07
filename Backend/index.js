const express =  require("express");
const authRouter = require("./router/authRouter");
const noteRouter = require("./router/noteRouter");
const cors = require("cors");

require("./db");
// create express app
const app = express();
app.use(cors());


const host  = "127.0.0.1";
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);
// LISTEN
app.listen(port, host, ()=>{
    console.log(`http://localhost:${port}`);
})
