import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

class Category extends Model {}

Category.init({

    name:{
        type: DataTypes.TEXT,
        allowNull:false,
        unique:true,
    }
},
{ 
    sequelize,
    modelName: 'Category', 
    tableName: 'category',
    timestamps: false
});

export default Category ;