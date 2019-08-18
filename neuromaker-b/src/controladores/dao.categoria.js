import Categoria from '../modelos/categoria'

export async function registrarCategoria(req,res){
    const {
        nombre,id
    } = req.body
    try {
        let newCategoria = await Categoria.create(
            {nombre,id},{
            field:['name','id']
        })
        if(newCategoria){
            return res.json({
                mensaje: 'Categoria registrada',
                data: newCategoria
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            mensaje: 'Categoria no registrada',
            data: {}
        })
    }
    res.send('recibo')
}

export async function consultarCategorias(req,res){
    const {nombre,id} = req.body
    try {
        let busquedaCategorias = await Categoria.findAll({
            attributes:['id','nombre'],
            where: {
                id
            }
        })
        if(busquedaCategorias){
            return res.json({
                mensaje: 'Categoria encontrada',
                data: busquedaCategorias
            })
        }else{
            return res.json({
                mensaje: 'Categoria no encontrada',
                data: {}
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            mensaje: 'Error',
            data: {}
        })
    }
}