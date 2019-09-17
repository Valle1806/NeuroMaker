import Venta from '../modelos/venta'


export async function registrarVenta(req, res) {
    console.log(req.body)
    const { id_comprador } = req.body;
    console.log("____________________")
    
    try {
        let nuevaVenta = await Venta.create({
            id_comprador
        }, {
            fields: ['id_comprador']
        });
        if (nuevaVenta) {
            return res.json({
                mensaje: "Venta creada con exito",
                data: nuevaVenta
            });
        }
    } catch (e) {
        console.log(e);
        res.status(200).json({
            mensaje: "Something goes wrong 200",
            data: {}
        });
    }
}