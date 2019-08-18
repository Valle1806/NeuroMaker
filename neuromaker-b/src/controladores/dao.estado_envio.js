import Estado_envio from '../modelos/estado_envio'

export async function registrarEstado_envio(req, res) {
    const {
        id,
        nombre
    } = req.body
    try {
        let newEstado_envio = await Estado_envio.create({
            attributes: ['id','nombre'],
        })
        if (newEstado_envio) {
            return res.json({
                mensaje: 'Envio registrado',
                data: newEnvio
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            mensaje: 'Estado_envio no registrado',
            data: {}
        })
    }
    res.send('recibido')
}

export async function consultarEstado_envio(req, res) {
    const {
        id,
        nombre
    } = req.body
    try {
        let busquedaEstado_envio = await Detalle.findAll({
            attributes:['id','nombre'],
            where:{
                id
            }
        })
        if(busquedaEstado_envio){
            return res.json({
                mensaje: 'Estado_envio encontrado',
                data: busquedaEstado_envio
            })
        }else{
            return res.json({
                mensaje: 'Estado_envio no encontrado',
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