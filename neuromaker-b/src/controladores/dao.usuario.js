import Usuario from '../modelos/usuario';
import { sequelize } from '../baseDatos/baseDatos';
import {
    Sequelize
} from 'sequelize';

export async function obtenerVentas(req,res){
    const {
        cedula
    } = req.body;

    try {
        const compras = await sequelize.query(
            `select 
                producto.nombre as nombre,
                detalle_venta.cantidad as cantidad,
                concat('$',TO_CHAR(producto.costo,'FM999999999.00')) as costoUnitario,
                TO_CHAR(venta.fecha :: DATE, 'mm/dd/yyyy') as fechaCompra,
                comprador.nombre as nombreComprador
            from 
                detalle_venta,
                producto,
                usuario as comprador,
                venta
            where
                detalle_venta.id_vendedor = '${cedula}' and
                venta.id = detalle_venta.id_venta and
                producto.id = detalle_venta.id_producto and
                comprador.cedula = venta.id_comprador`
                , {
                    type: Sequelize.QueryTypes.SELECT
                }
        )
        if (compras) {
            res.json({
                mensaje: 'consulta exitosa',
                data: compras
            })
        } else {
            res.json({
                mensaje: 'consulta vacia',
                data: {}
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.json({
            mensaje: 'Ocurrio un error',
            data: {}
        })
    }
}

export async function obtenerCompras(req,res){
    const {
        cedula
    } = req.body;

    try {
        const compras = await sequelize.query(
            `select 
                producto.nombre as nombre,
                detalle_venta.cantidad as cantidad,
                concat('$',TO_CHAR(producto.costo,'FM999999999.00')) as costoUnitario,
                TO_CHAR(venta.fecha :: DATE, 'mm/dd/yyyy') as fechaCompra,
                vendedor.cedula as codVendedor
            from 
                detalle_venta,
                producto,
                usuario as vendedor,
                venta
            where
                venta.id_comprador = '${cedula}' and
                venta.id = detalle_venta.id_venta and
                producto.id = detalle_venta.id_producto and
                vendedor.cedula = detalle_venta.id_vendedor`
                , {
                    type: Sequelize.QueryTypes.SELECT
                }
        )
        if (compras) {
            res.json({
                mensaje: 'consulta exitosa',
                data: compras
            })
        } else {
            res.json({
                mensaje: 'consulta vacia',
                data: {}
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.json({
            mensaje: 'Ocurrio un error',
            data: {}
        })
    }
}

export async function registrarUsuario(req, res) {
    const {
        cedula,
            clave,
            nombre,
            direccion,
            codigo_postal,
            tarjeta,
            correo,
            estado,
            comision
    } = req.body;
    try {
        let newUsuario = await Usuario.create({
            cedula,
            clave,
            nombre,
            direccion,
            codigo_postal,
            tarjeta,
            correo,
            estado,
            comision
        }, {
            fields: ['cedula','clave','nombre','direccion','codigo_postal','tarjeta','correo','estado','comision']
        });
        if (newUsuario) {
            return res.json({
                mensaje: 'Usuario creado exitosamente',
                datos: newUsuario
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensaje: 'no se pudo crear usuario',
            data: {}
        });
    }
    res.send('recibido');
}
export async function loginUsuario(req,res){
    const { cedula, clave}= req.body;
    console.log(cedula, "   ", clave)
    try {
        const busquedaUsuario = await Usuario.findOne({
            attributes: ['cedula','nombre'],
            where: {
                cedula: cedula,
                clave: clave
            }
        });
        if(busquedaUsuario){
            return res.json({
                mensaje: 'Usuario encontrado',
                data: busquedaUsuario
            })
        }else{
            return res.json({
                mensaje: 'Usuario no encontrado',
                data: {}
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            mensaje: 'Error no detectado',
            data: {}
        })
    }
}

export async function obtenerDatosUsuario(req,res){
    const { id_comprador}= req.body;
    try {
        const busquedaUsuario = await Usuario.findOne({
            where: {
                cedula: id_comprador
            }
        });
        if(busquedaUsuario){
            return res.json({
                mensaje: 'Usuario encontrado',
                data: busquedaUsuario
            })
        }else{
            return res.json({
                mensaje: 'Usuario no encontrado',
                data: {}
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            mensaje: 'Error no detectado',
            data: {}
        })
    }
}