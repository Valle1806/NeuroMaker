import Venta from '../modelos/venta'


export async function registrarVenta(req, res) {
    const { id_comprador } = req.body;
    try {
        let nuevaVenta= await Factura.create({
            id_comprador
        },{
            fields: ['id_comprador']
        });
        return res.json({
            message: "Venta creada con exito",
            data : nuevaVenta
        })
    } catch (e) {
        console.log(e);
        res.status(200).json({
            message: "Something goes wrong 200",
            data: {}
        });
    }
}