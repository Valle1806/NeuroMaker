import Producto from '../modelos/producto';
import Categoria from '../modelos/categoria';

export async function registrarProducto(req, res) {
    const {
        nombre,
        imagen,
        descripcion,
        categoria,
        costo,
        descuento,
        id_vendedor,
        existencias
    } = req.body;
    try {
        let newProducto = await Producto.create({
            nombre,
            imagen,
            descripcion,
            categoria,
            costo,
            descuento,
            id_vendedor,
            existencias
        }, {
            fields: ['nombre', 'imagen', 'descripcion', 'categoria', 'costo', 'descuento', 'id_vendedor', 'existencias']
        });
        if (newProducto) {
            return res.json({
                mensaje: 'Producto registrado',
                datos: newProducto
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensaje: 'Producto no registrado',
            data: {}
        });
    }
    res.send('recibido');
}

export async function consultarProductos(req, res) {
    const {
        id,
        nombre,
        costo,
        categoria,
        imagen,
        descripcion
    } = req.body;
    try {
        const busquedaProducto = await Producto.findAll({
            attributes: ['id',
                'nombre',
                'costo',
                'categoria',
                'imagen',
                'descripcion'
            ]
        });
        if (busquedaProducto) {
            return res.json({
                mensaje: 'Productos encontrados',
                data: busquedaProducto
            })
        } else {
            return res.json({
                mensaje: 'Productos no encontrados',
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

export async function consultarProducto(req, res) {
    const {
        id
    } = req.params
    try {
        const busquedaProducto = await Producto.findOne({
            where:{
                id
            }
        })
        return res.json(busquedaProducto)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'error',
            data: {}
        })
    }
}