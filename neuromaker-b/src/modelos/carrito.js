import { isPrimitive } from 'util';

const Sequelize = require('sequelize'),
{sequelize} = require('../baseDatos/baseDatos')

export const Carrito = sequelize.define('carrito', {
    id_producto: {
        type: Sequelize.INTEGER,
        notNull: true,
        primaryKey: true
    },
    cantidad: {
        type: Sequelize.INTEGER,
        notNull: true
    },
    id_comprador: {
        type: Sequelize.STRING(50),
        notNull: true,
        primaryKey: true
    },
    id_vendedor: {
        type: Sequelize.STRING(50),
        notNull: true
    },

}, {
    freezeTableName: true,
    timestamps: false
});

