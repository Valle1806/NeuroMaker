const Sequelize = require('sequelize'),
{sequelize} = require('./../baseDatos/baseDatos')

export const Calificacion = sequelize.define('calificacion',{
    id_producto:{
        type: Sequelize.INTEGER,
        notNull: true,
        primaryKey: true
    },
    id_autor:{
        type: Sequelize.STRING,
        notNull: true,
        primaryKey: true,
        
    },
    calificacion:{
        type: Sequelize.INTEGER,
        notNull: true
    },
},{
    freezeTableName: true,
    timestamps: true
})
