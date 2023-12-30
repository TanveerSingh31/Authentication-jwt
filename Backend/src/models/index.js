import sequelize from 'sequelize';
import dotenv from 'dotenv'; dotenv.config();


console.log(process.env.DB, process.env.DB_USER, process.env.DB_PASS);


const db = new sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});


export {
    db
}