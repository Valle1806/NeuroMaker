import Sequelize from 'sequelize'
import { sequelize } from '../baseDatos/baseDatos'

export const Comentario = sequelize.define('comentario',{
    id_producto:{
        type: Sequelize.INTEGER,
        notNull: true,
        primaryKey: true
    },
    id_autor:{
        type: Sequelize.STRING(50),
        notNull: true,
        primaryKey: true
    },
    fecha:{
        type: 'TIMESTAMP',
        notNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        primaryKey: true
    }
},{
    freezeTableName: true,
    timestamps: false
});