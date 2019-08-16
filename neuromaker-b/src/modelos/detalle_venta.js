import Sequelize from 'sequelize'
import {
    sequelize
} from '../baseDatos/baseDatos'

export const Detalle_venta = sequelize.define('detalle_venta', {
    id_venta: {
        type: Sequelize.INTEGER,
        notNull: true,
        primaryKey: true
    },
    id_vendedor: {
        type: Sequelize.STRING(50),
        notNull: true
    },
    id_producto: {
        type: Sequelize.INTEGER,
        notNull: true,
        primaryKey: true
    },
    cantidad: {
        type: Sequelize.INTEGER,
        notNull: true
    }
}, {
    freezeTableName: true,
    timestamps: true
})