import Sequelize from 'sequelize';
import { sequelize } from '../baseDatos/baseDatos';

const Usuario= sequelize.define('usuario',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    }, 
    username:{
        type: Sequelize.STRING
    },
	passwd:{
        type: Sequelize.STRING
    }, 
	primer_nombre: {
        type: Sequelize.STRING
    }, 
    segundo_nombre: {
        type: Sequelize.STRING
    }, 
    primer_apellido: {
        type: Sequelize.STRING
    },
    segundo_apellido: {
        type: Sequelize.STRING
    },
	direccion_residencia: {
        type: Sequelize.STRING
    },
	pais: {
        type: Sequelize.STRING
    },
	telefono: {
        type: Sequelize.STRING
    },
    fecha_registro: {
        type: Sequelize.DATEONLY
    },
	estado: {
        type: Sequelize.INTEGER
    },
	codigo_de_descuento: {
        type: Sequelize.STRING
    },
	vendedor: {
        type: Sequelize.BOOLEAN
    }
},{
    freezeTableName: true,
    timestamps:false
});

export default Usuario;
