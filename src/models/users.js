import { Sequelize, DataTypes } from 'sequelize';
import { db } from './index.js';


const User = db.define('users', {    
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    freezetableName : true,
    paranoid: true
});
  



export default User;