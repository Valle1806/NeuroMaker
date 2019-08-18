import Calificacion from '../modelos/calificacion'

export async function registarCalificacion(req, res){
    const {
        id_producto,
        id_autor,
        calificacion
    } = req.body
    try {
        let newCalificacion = await Calificacion.create({
            id_producto,id_autor,calificacion
        },{
            fields: ['id_producto','id_autor','calificacion']
        })
        if(newCalificacion){
            return res.json({
                mensaje: 'Calificación registrada',
                datos: newCalificacion
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            mensaje: 'No se pudo registrar la calificacion',
            data:{}
        })
    }
    res.send('recibido')

}

export async function consultarCalificaciones(req,res){
    const{
        id_producto,
        id_autor,
        calificacion
    } = req.body
    try {
        let busquedaCalificacion = await Calificacion.findAll({
        attributes: ['id_producto','id_autor','calificacion'],
        where: [
            id_producto
        ]           
        })
        if(busquedaCalificacion){
            return res.json({
                mensaje: 'Calificaciones encontradas',
                data: busquedaCalificacion
            })
        }else{
            return res.json({
                mensaje: 'Calificaciones no encontradas',
                data: {}
            })
        }
    } catch (error) {
        return console.log(error)
        res.satus(500).json({
            mensaje: 'Error'
        })
    }
}