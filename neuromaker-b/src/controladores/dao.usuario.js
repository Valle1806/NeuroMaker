import Usuario from '../modelos/usuario';

export async function registrarUsuario(req, res) {
    const {
        cedula,
            clave,
            nombre,
            direccion,
            codigo_postal,
            tarjeta,
            correo,
            estado,
            comision
    } = req.body;
    try {
        let newUsuario = await Usuario.create({
            cedula,
            clave,
            nombre,
            direccion,
            codigo_postal,
            tarjeta,
            correo,
            estado,
            comision
        }, {
            fields: ['cedula','clave','nombre','direccion','codigo_postal','tarjeta','correo','estado','comision']
        });
        if (newUsuario) {
            return res.json({
                mensaje: 'Usuario creado exitosamente',
                datos: newUsuario
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensaje: 'no se pudo crear usuario',
            data: {}
        });
    }
    res.send('recibido');
}
export async function loginUsuario(req,res){
    const { cedula, clave}= req.body;
    console.log(cedula, "   ", clave)
    try {
        const busquedaUsuario = await Usuario.findOne({
            attributes: ['cedula','nombre'],
            where: {
                cedula: cedula,
                clave: clave
            }
        });
        if(busquedaUsuario){
            return res.json({
                mensaje: 'Usuario encontrado',
                data: busquedaUsuario
            })
        }else{
            return res.json({
                mensaje: 'Usuario no encontrado',
                data: {}
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            mensaje: 'Error no detectado',
            data: {}
        })
    }
}