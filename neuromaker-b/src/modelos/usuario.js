import Sequelize from 'sequelize';
import {
    sequelize
} from '../baseDatos/baseDatos';


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
        type: Sequelize.BOOLEAN,
        notNull: true
    },
    comision: {
        type: Sequelize.INTEGER,
        notNull: true
    },

}, {
    freezeTableName: true,
    timestamps: false
});

export default Usuario;