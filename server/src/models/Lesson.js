import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

class Lesson extends Model {}

Lesson.init({

    image: {
        type:DataTypes.TEXT,
        defaultValue: 'http://localhost:8080/public/images/img_placeholder.jpg'
    },
    video: {
        type: DataTypes.TEXT,
        defaultValue: 'http://localhost:8080/public/images/img_placeholder.jpg'
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false ,
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
    modelName: 'Lesson', 
    tableName: 'lesson',
});

export default Lesson;