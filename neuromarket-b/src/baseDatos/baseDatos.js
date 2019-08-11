import Sequelize from 'sequelize';

export const sequelize =new Sequelize(
    'postgres',   //nombre base de datos
    'postgres',    //nombre usuario
    'root',        //contraseña
    //configuraciones sequelize
    {
        host: 'localhost',
        dialect: 'postgres',
        pool:{
            max:5,
            min:0,
            require:30000,
            idle:10000
        },
        logging:false

    }

)