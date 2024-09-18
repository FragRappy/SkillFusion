import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

class Comment extends Model {}

Comment.init({

    content: {
        type: DataTypes.TEXT,
        allowNull: false
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
},
{ 
    sequelize,
    modelName: 'Comment', 
    tableName: 'comment',
});

export default Comment ;