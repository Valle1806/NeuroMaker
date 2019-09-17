import Detalle from '../modelos/detalle_venta'

export async function registrarDetalle(req, res) {
    
    var productos= req.body

    try {
        let newDetalle =Detalle.bulkCreate(productos,  
            {fields: ['cantidad','id_producto','id_vendedor','id_venta',]},{returning: true})
        if (newDetalle) {
            return res.json({
                mensaje: 'Detalle de venta registrado',
                data: newDetalle
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            mensaje: 'Detalle de venta no registrado',
            data: {}
        })
    }
}

export async function consultarDetalle(req, res) {
    const {
        id_venta,
        id_vendedor,
        id_producto,
        cantidad
    } = req.body
    try {
        let busquedaDetalle = await Detalle.findAll({
            attributes:['id_venta','id_vendedor','id_producto','cantidad'],
            where:{
                id_venta
            }
        })
        if(busquedaDetalle){
            return res.json({
                mensaje: 'Detalle de venta encontrado',
                data: busquedaComentarios
            })
        }else{
            return res.json({
                mensaje: 'Detalle de venta no encontrado',
                data: {}
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            mensaje: 'Error',
            data: {}
        })
    }
}