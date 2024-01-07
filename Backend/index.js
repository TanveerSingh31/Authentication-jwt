import express from 'express';
import dotenv from 'dotenv'; dotenv.config();
import cors from 'cors';
import Route from './src/Route/routes.js';
import {db} from './src/models/models.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use("/",Route);
    


app.listen(process.env.PORT, async ()=>{
    try{
        await db.authenticate();
        await db.sync({alter: true});    
        console.log("server started on port 5000")  
    }
    catch(err){
        console.log(err);
    }
});



export default app;