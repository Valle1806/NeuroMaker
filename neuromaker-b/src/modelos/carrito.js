import Sequelize from 'sequelize';
import {
    sequelize
} from '../baseDatos/baseDatos';

const Carrito = sequelize.define('carrito', {
    id_producto: {
        type: Sequelize.INTEGER,
        notNull: true
    },
    cantidad: {
        type: Sequelize.INTEGER,
        notNull: true
    },
    id_comprador: {
        type: Sequelize.STRING(50),
        notNull: true
    },
    id_vendedor: {
        type: Sequelize.STRING(50),
        notNull: true
    },

}, {
    freezeTableName: true,
    timestamps: false
});

export default Carrito