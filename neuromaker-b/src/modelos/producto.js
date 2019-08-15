import Sequelize from 'sequelize';
import {
    sequelize
} from '../baseDatos/baseDatos';

const Producto = sequelize.define('producto', {
    id: {
        type: Sequelize.INTEGER,
        notNull: true,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING(50),
        notNull: true
    },
    imagen: {
        type: Sequelize.STRING(50),
        notNull: true
    },
    descripcion: {
        type: Sequelize.STRING(50),
        notNull: true
    },
    categoria: {
        type: Sequelize.STRING(50),
        notNull: true
    },
    costo: {
        type: Sequelize.STRING(50),
        notNull: true,
        default: 0

    },
    descuento: {
        type: Sequelize.STRING(50),
        notNull: true,
        default: 0
    },
    id_vendedor: {
        type: Sequelize.STRING(50),
        notNull: true
    },
    existencias: {
        type: Sequelize.STRING(50),
        notNull: true,
        default: 0
    },

}, {
    freezeTableName: true,
    timestamps: false
});

export default Producto;