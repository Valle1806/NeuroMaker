import Sequelize from 'sequelize'
import {sequelize} from '../baseDatos/baseDatos'
import { Detalle_venta } from './detalle_venta';
import { Envio } from './envio';

export const Venta = sequelize.define('venta',{
    id:{
        type:Sequelize.INTEGER,
        notNull: true,
        primaryKey: true
    },
    id_comprador:{
        type: Sequelize.STRING(50),
        notNull: true
    },
    fecha:{
        type: 'TIMESTAMP',
        notNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
}, {
    freezeTableName: true,
    timestamps: false
})

Venta.hasMany(Detalle_venta,{foreignKey:'id_venta'})
Venta.hasMany(Envio,{foreignKey:'id_venta'})