import Producto from '../modelos/producto';
import {
    Sequelize
} from 'sequelize';
import {
    sequelize
} from '../baseDatos/baseDatos';


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
        const newTest = await sequelize.query(
            `select 
            producto.id as id,
            producto.nombre as nombre,
            producto.imagen as imagen,
            producto.descripcion as descripcion,
            categoria.nombre as categoria,
            producto.costo as costo,
			producto.existencias as cantidad,
            producto.descuento as descuento,
            vendedor.cedula as vendedor,
            coalesce(cast(substring(cast(avg(calificacion.calificacion) as varchar),0,2) as integer),0) as calificacion
        from 
            producto left join calificacion on producto.id = calificacion.id_producto,
            categoria, 
            usuario as vendedor
        where
            producto.categoria = categoria.id and 
            producto.id_vendedor = vendedor.cedula
            group by producto.id, categoria.nombre, vendedor.cedula
            order by producto.id`, {
                type: Sequelize.QueryTypes.SELECT
            })
        if (newTest) {
            res.json({
                mensaje: 'consulta exitosa',
                data: newTest
            })
        } else {
            res.json({
                mensaje: 'consulta vacia',
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
        const newTest = await sequelize.query(
            `select 
            producto.id as id,
            producto.nombre as nombre,
            producto.imagen as imagen,
            producto.descripcion as descripcion,
            categoria.nombre as categoria,
            producto.costo as costo,
			producto.existencias as cantidad,
            producto.descuento as descuento,
            vendedor.cedula as vendedor,
            coalesce(cast(substring(cast(avg(calificacion.calificacion) as varchar),0,2) as integer),0) as calificacion
        from 
            producto left join calificacion on producto.id = calificacion.id_producto,
            categoria, 
            usuario as vendedor
        where
            producto.id =${id} and
            producto.categoria = categoria.id and 
            producto.id_vendedor = vendedor.cedula
            group by producto.id, categoria.nombre, vendedor.cedula
            order by producto.id`, {
                type: Sequelize.QueryTypes.SELECT
            })
        if (newTest) {
            res.json({
                mensaje: 'consulta exitosa',
                data: newTest
            })
        } else {
            res.json({
                mensaje: 'consulta vacia',
                data: {}
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'error',
            data: {}
        })
    }
}

export async function consultarComentarios(req, res) {
    const {
        id
    } = req.params
    try {
        const newTest = await sequelize.query(
            `select 
                comentario.id_producto, 
                comentario.comentario,
                comentario.fecha,
                comentario.id_autor
            from
                comentario
                
            where
                comentario.id_producto = ${id}`, {
                type: Sequelize.QueryTypes.SELECT
            })
        if (newTest) {
            res.json({
                mensaje: 'consulta exitosa',
                data: newTest
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'error',
            data: {}
        })
    }
}


export async function filtarProductos(req, res) {
    console.log(req)
    const {
        filtro
    } = req.params;
    try {
        const newTest = await sequelize.query(
            `select 
            tablaDerivada.id,
            imagen,
            tablaDerivada.nombre,
            categoria.nombre as categoria,
            costo,
            calificacion from
                (select 
                 id, 
                 imagen,
                 categoria,
                 nombre, 
                 costo,
                 coalesce(cast(substring(cast(avg(calificacion.calificacion) as varchar),0,2) as integer),0) as calificacion
                 from producto left join calificacion on producto.id = calificacion.id_producto 
                 where 
                    nombre LIKE '%${filtro}%' OR
                    nombre LIKE '%${filtro}' OR
                    nombre LIKE '${filtro}%'
                group by producto.id) as tablaDerivada,categoria	
            where 
                tablaDerivada.categoria = categoria.id
                 order by tablaDerivada.id`, {
                type: Sequelize.QueryTypes.SELECT
            })
        if (newTest) {
            res.json({
                mensaje: 'consulta exitosa',
                data: newTest
            })
        } else {
            res.json({
                mensaje: 'consulta vacia',
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