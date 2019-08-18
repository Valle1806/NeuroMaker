import Carrito from '../modelos/carrito'

export async function registrarCarrito(req, res) {
    const {
        id_producto,
        cantidad,
        id_comprador,
        id_vendedor
    } = req.body
    try {
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
        id_producto,
        cantidad,
        id_comprador,
        id_vendedor
    } = req.body

    try {
        let busquedaCarrito = await Carrito.findAll({
            attributes: ['id_producto', 'cantidad', 'id_comprador', 'id_vendedor'],
            where:{
                id_comprador
            }
        })
        if(busquedaCarrito){
            return res.json({
                mensaje: 'Carrito encontrado',
                data: busquedaCarrito
            })
        }else{
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