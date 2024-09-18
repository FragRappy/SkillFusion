import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

class Rate extends Model {}

Rate.init({

    rate:{
        type: DataTypes.INTEGER,
    },
},
{ 
    sequelize,
    modelName: 'Rate', 
    tableName: 'rate',
    timestamps: false
});

export default Rate ;

