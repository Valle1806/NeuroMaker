const Sequelize = require('sequelize'),
{sequelize} = require('../baseDatos/baseDatos'),
Producto = require('./producto')


export const Categoria = sequelize.define('categoria',{
    id:{
        type: Sequelize.INTEGER,
        notNull: true,
        primaryKey: true
    },
    nombre:{
        type:Sequelize.STRING,
        notNull: true
    }
})

Categoria.hasMany(Producto, {foreignKey:'categoria'})