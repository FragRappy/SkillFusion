import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

class Like extends Model {}

Like.init({

    iLike: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
    }
},
{ 
    sequelize,
    modelName: 'Like', 
    tableName: 'like',
    timestamps: false
});

export default Like ;