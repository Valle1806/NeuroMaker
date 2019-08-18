import Sequelize from 'sequelize'
import {sequelize} from '../baseDatos/baseDatos'
import Producto from './producto'

export const Categoria = sequelize.define('categoria',{
    id:{
        type: Sequelize.INTEGER,
        notNull: true,
        primaryKey: true
    },
    nombre:{
        type:Sequelize.STRING,
        notNull: true
    }
},{
    freezeTableName: true,
    timestamps: false
})

Categoria.hasMany(Producto,{foreignKey:'categoria'})

export default Categoria