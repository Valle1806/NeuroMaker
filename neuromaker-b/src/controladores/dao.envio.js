import Envio from '../modelos/envio'

export async function registrarEnvio(req, res) {
    const {
        id_venta,
        estado
    } = req.body
    try {
        let newEnvio = await Envio.create({
            attributes: ['id_venta','estado'],
        })
        if (newEnvio) {
            return res.json({
                mensaje: 'Envio registrado',
                data: newEnvio
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            mensaje: 'Envio no registrado',
            data: {}
        })
    }
    res.send('recibido')
}

export async function consultarEnvio(req, res) {
    const {
        id_venta,
        estado
    } = req.body
    try {
        let busquedaDetalle = await Detalle.findAll({
            attributes:['id_venta','estado'],
            where:{
                id_venta
            }
        })
        if(busquedaDetalle){
            return res.json({
                mensaje: 'Envio encontrado',
                data: busquedaComentarios
            })
        }else{
            return res.json({
                mensaje: 'Envio no encontrado',
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