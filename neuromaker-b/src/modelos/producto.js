import Sequelize from 'sequelize'
import { sequelize } from '../baseDatos/baseDatos'
import { Detalle_venta } from './detalle_venta';
import { Calificacion } from './calificacion';
import { Comentario } from './comentario';

export const Producto = sequelize.define('producto', {
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
        type: Sequelize.INTEGER,
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


Producto.hasMany(Calificacion,{foreignKey:'id_producto'})
Producto.hasMany(Detalle_venta,{foreignKey:'id_producto'})
Producto.hasMany(Comentario,{foreignKey:'id_producto'})

export default Producto