import Carrito from '../modelos/carrito'
import {
    Sequelize
} from 'sequelize';
import {
    sequelize
} from '../baseDatos/baseDatos';


export async function registrarCarrito(req, res) {
    console.log("neeeeeeeeeeeeeeeeeeeeeeeeel")
    console.log(req.body)
    const {
        id_producto,
        cantidad,
        id_comprador,
        id_vendedor
    } = req.body
    try {
        let existe = await Carrito.findOne({
            attributes: ['id_producto', 'cantidad'],
            where: {
                id_producto,
                id_comprador
            }
        })
        if (existe) {
            let actualizar = await Carrito.update({
                cantidad: existe.cantidad+ cantidad
            }, {
                    where: { id_producto, id_comprador }
                }
            )
            if(actualizar){
                return res.json({
                    mensaje: 'Carrito registrado con exito',
                    datos: actualizar
                })
            }
        } else {
            let newCarrito = await Carrito.create({
                id_producto,
                cantidad,
                id_comprador,
                id_vendedor
            }, {
                    fields: ['id_producto', 'cantidad', 'id_comprador', 'id_vendedor']
                })
            if (newCarrito) {
                return res.json({
                    mensaje: 'Carrito registrado con exito',
                    datos: newCarrito
                })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            mensaje: 'no pudo registrarse el carrito',
            data: {}
        })
    }
    res.send('recibo')
}

export async function consultarCarritos(req, res) {
    const {
        id_comprador
    } = req.params

    try {
          const busquedaCarrito = await sequelize.query(
            `select id_producto, imagen, nombre, cantidad, costo, carrito.id_vendedor
            from carrito join producto on producto.id = carrito.id_producto 
            where id_comprador= '${id_comprador}' 
            `, {
                type: Sequelize.QueryTypes.SELECT
            })
        if (busquedaCarrito) {
            return res.json({
                mensaje: 'Carrito encontrado',
                data: busquedaCarrito
            })
        } else {
            return res.json({
                mensaje: 'Carrito no encontrado',
                data: {}
            })
        }

    } catch (error) {
        console.log(error)
        return res.status.json({
            mensaje: 'Error',
            data: {}
        })
    }
}
export async function borrarProductoCarrito(req, res) {
    const {  id_producto, id_comprador } = req.body;
    try {
        const numRowDelete = await Carrito.destroy({
            where: {
                id_producto, id_comprador 
            }
        });
        console.log(numRowDelete)
        return res.json(numRowDelete);
    } catch (e) {
        console.log(e);
        res.status(703).json({
            message: "Algo salio mal 703",
            data: {}
        });
    }
}