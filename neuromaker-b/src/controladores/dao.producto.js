import Producto from '../modelos/producto';

export async function registrarProducto(req, res) {
    const {
        id,
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
            id,
            nombre,
            imagen,
            descripcion,
            categoria,
            costo,
            descuento,
            id_vendedor,
            existencias
        }, {
            fields: ['id', 'nombre', 'imagen', 'descripcion', 'categoria', 'costo', 'descuento', 'id_vendedor', 'existencias']
        });
        if (newProducto) {
            return res.json({
                mensaje: 'Producto creado exitosamente',
                datos: newProducto
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'no se pudo crear producto',
            data: {}
        });
    }
    res.send('recibido');
}

export async function traerProducto(req, res) {
    const {
        nombre,
        costo,
        categoria,
        imagen,
        descripcion
    } = req.body;
    try {
        const busquedaProducto = await Producto.findAll({
            attributes: ['nombre',
                'costo',
                'categoria',
                'imagen',
                'descripcion'
            ],
            where: {

            }
        });
        if (busquedaProducto) {
            return res.json({
                mensaje: 'Producto encontrado',
                data: busquedaProducto
            })
        } else {
            return res.json({
                mensaje: 'Producto no encontrado',
                data: {}
            })
        }
    } catch (error) {
        console.log(error);
    }
}