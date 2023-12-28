import express from 'express';
import dotenv from 'dotenv';
import Route from './src/Route/routes.js';
import {db} from './src/models/index.js';

dotenv.config();

const app = express();

app.use("/",Route);



app.listen(5000, async ()=>{
    try{
        await db.authenticate()
        console.log("server started on port 5000")
    }
    catch(err){
        console.log(err);
    }
});