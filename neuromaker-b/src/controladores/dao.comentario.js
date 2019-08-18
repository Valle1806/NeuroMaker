import Comentario from '../modelos/comentario'

export async function registrarComentario(req, res) {
    const {
        id_producto,
        id_autor,
        fecha
    } = req.body
    try {
        let newComentario = await Comentario.create({
            attributes: ['id_producto', 'id_autor', 'fecha'],
            where: {

            }
        })
        if (newComentario) {
            return res.json({
                mensaje: 'Comentario registrado',
                data: newComentario
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            mensaje: 'Comentario no registrado',
            data: {}
        })
    }
    res.send('recibido')
}

export async function consultarComentarios(req, res) {
    const {
        id_producto,
        id_autor,
        fecha
    } = req.body
    try {
        let busquedaComentarios = await Comentario.findAll({
            attributes:['id_producto'],
            where:{
                id_producto
            }
        })
        if(busquedaComentarios){
            return res.json({
                mensaje: 'Comentarios encontrados',
                data: busquedaComentarios
            })
        }else{
            return res.json({
                mensaje: 'Sin comentarios',
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