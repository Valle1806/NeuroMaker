import Sequelize from 'sequelize'
import { sequelize } from '../baseDatos/baseDatos'
import { Envio } from './envio';

export const Estado_envio = sequelize.define('estado_envio',{
    id:{
        type: Sequelize.INTEGER,
        notNull: true,
        primaryKey: true
    },
    nombre:{
        type: Sequelize.INTEGER,
        notNull: true
    }
},{
    freezeTableName: true,
    timestamps: false
})

Estado_envio.hasMany(Envio,{foreignKey:'estado'})