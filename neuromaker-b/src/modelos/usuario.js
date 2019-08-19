import Sequelize from 'sequelize'
import { sequelize } from '../baseDatos/baseDatos'
import { Producto } from './producto'
import { Calificacion } from './calificacion'
import { Carrito } from './carrito';
import { Venta } from './venta';
import { Detalle_venta } from './detalle_venta';
import { Comentario } from './comentario';

const Usuario = sequelize.define('usuario', {
    cedula: {
        type: Sequelize.STRING(50),
        notNull: true,
        primaryKey: true
    },
    clave: {
        type: Sequelize.STRING(50),
        notNull: true
    },
    nombre: {
        type: Sequelize.STRING(50),
        notNull: true
    },
    direccion: {
        type: Sequelize.STRING(50),
        notNull: true
    },
    codigo_postal: {
        type: Sequelize.STRING(50),
        notNull: true
    },
    tarjeta: {
        type: Sequelize.STRING(50),
        notNull: true
    },
    correo: {
        type: Sequelize.STRING(50),
        notNull: true
    },
    estado: {
        type: Sequelize.INTEGER,
        notNull: true,
        defaultValue: 1
    },
    comision: {
        type: Sequelize.INTEGER,
        notNull: true
    },

}, {
    freezeTableName: true,
    timestamps: false
})

Usuario.hasMany(Producto,{foreignKey:'id_vendedor'})
Usuario.hasMany(Calificacion,{foreignKey:'id_autor'})
Usuario.hasOne(Carrito,{foreignKey:'id_comprador'})
Usuario.hasOne(Carrito,{foreignKey:'id_vendedor'})
Usuario.hasMany(Venta,{foreignKey:'id_comprador'})
Usuario.hasMany(Detalle_venta,{foreignKey:'id_vendedor'})
Usuario.hasMany(Comentario,{foreignKey:'id_autor'})

export default Usuario;