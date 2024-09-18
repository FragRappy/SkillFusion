import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

class Step extends Model {}

Step.init({

    image: {
        type: DataTypes.TEXT,
        defaultValue: 'http://localhost:8080/public/images/img_placeholder.jpg',
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
},
{ 
    sequelize,
    modelName: 'Step', 
    tableName: 'step',
    timestamps: false
});

export default Step ;