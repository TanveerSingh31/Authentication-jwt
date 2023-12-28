import express from 'express';
const Route = express.Router();




Route.get("/", (req, res)=>{
    res.send("req received inside route");
});




export default Route;