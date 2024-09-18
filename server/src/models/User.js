import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

class User extends Model {}

User.init({
    role:{
        type:DataTypes.TEXT,
        allowNull: false,
        defaultValue:'member',
    },
    username : {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    token: {
        type: DataTypes.TEXT,
    },
    tokenExpires: {
        type: DataTypes.DATEONLY,
    },
    createdAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
      },
    updatedAt: {
        type: DataTypes.DATEONLY,
        defaultValue: null
    }
    }, { 
    sequelize,
    modelName: 'User', 
    tableName: 'user',
});

export default User;