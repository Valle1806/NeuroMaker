import Sequelize from 'sequelize'
import { sequelize } from '../baseDatos/baseDatos'

export  const Envio = sequelize.define('envio',{
    id_venta:{
        type: Sequelize.INTEGER,
        notNull: true
    },
    estado:{
        type: Sequelize.INTEGER,
        notNull: true
    }
},{
    freezeTableName: true,
    timestamps: false
})