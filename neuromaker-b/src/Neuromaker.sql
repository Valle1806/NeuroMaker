
-- USUARIO -------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS usuario CASCADE;
CREATE TABLE usuario(
	cedula VARCHAR(50) NOT NULL,
	clave VARCHAR(50) NOT NULL,
	nombre VARCHAR(50) NOT NULL,
	direccion VARCHAR(50) NOT NULL,
	codigo_postal VARCHAR(50) NOT NULL,
	tarjeta VARCHAR(50) NOT NULL,
	correo VARCHAR(50) NOT NULL,
	estado BIT(1) NOT NULL DEFAULT B'1',
	comision INTEGER NOT NULL,

	CONSTRAINT usuario_pk PRIMARY KEY (cedula)
);

-- PRODUCTO ------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS producto CASCADE;
CREATE TABLE producto(
	id SERIAL NOT NULL,
	nombre VARCHAR(50) NOT NULL,
	imagen VARCHAR(200) NOT NULL,
	descripcion VARCHAR(500) NOT NULL,
	categoria VARCHAR(50) NOT NULL,
	costo INTEGER NOT NULL DEFAULT 0,
	descuento INTEGER NOT NULL DEFAULT 0,
	id_vendedor VARCHAR(50) NOT NULL, 
	existencias INTEGER NOT NULL DEFAULT 0,

	CONSTRAINT producto_pk PRIMARY KEY (id),
	CONSTRAINT producto_fk FOREIGN KEY (id_vendedor) REFERENCES usuario (cedula) ON DELETE CASCADE
);

-- CALIFICACION --------------------------------------------------------------------------------------
DROP TABLE IF EXISTS calificacion CASCADE;
CREATE TABLE calificacion(
	id_producto INTEGER NOT NULL,
	id_autor VARCHAR(50) NOT NULL,
	calificacion INTEGER NOT NULL DEFAULT 0,

	CONSTRAINT calificacion_pk PRIMARY KEY (id_producto, id_autor),
	CONSTRAINT calificacion_fk FOREIGN KEY (id_autor) REFERENCES usuario (cedula) ON DELETE CASCADE
);	

-- CARRITO -------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS carrito CASCADE;
CREATE TABLE carrito(
	id_producto INTEGER NOT NULL,
	cantidad INTEGER NOT NULL,
	id_comprador VARCHAR(50) NOT NULL,
	id_vendedor VARCHAR(50) NOT NULL,

	CONSTRAINT carrito_pk PRIMARY KEY (id_producto, id_comprador),
	CONSTRAINT carrito_fk1 FOREIGN KEY (id_comprador) REFERENCES usuario (cedula) ON DELETE CASCADE,
	CONSTRAINT carrito_fk2 FOREIGN KEY (id_vendedor) REFERENCES usuario (cedula) ON DELETE CASCADE
);

-- VENTA ---------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS venta CASCADE;
CREATE TABLE venta(
	id SERIAL NOT NULL,
	id_comprador VARCHAR(50) NOT NULL,
	fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT venta_pk PRIMARY KEY (id),
	CONSTRAINT venta_fk FOREIGN KEY (id_comprador) REFERENCES usuario (cedula) ON DELETE CASCADE
);

-- DETALLE_VENTA -------------------------------------------------------------------------------------
DROP TABLE IF EXISTS detalle_venta CASCADE;
CREATE TABLE detalle_venta(
	id_venta INTEGER NOT NULL,
	id_vendedor VARCHAR(50) NOT NULL,
	id_producto INTEGER NOT NULL,
	cantidad INTEGER NOT NULL,

	CONSTRAINT detalle_venta_pk PRIMARY KEY (id_venta, id_producto),
	CONSTRAINT detalle_venta_fk1 FOREIGN KEY (id_venta) REFERENCES venta (id) ON DELETE CASCADE,
	CONSTRAINT detalle_venta_fk2 FOREIGN KEY (id_vendedor) REFERENCES usuario (cedula) ON DELETE CASCADE,
	CONSTRAINT detalle_venta_fk3 FOREIGN KEY (id_producto) REFERENCES producto (id) ON DELETE CASCADE
);

-- COMENTARIO ----------------------------------------------------------------------------------------
DROP TABLE IF EXISTS comentario CASCADE;
CREATE TABLE comentario(
	id_producto INTEGER NOT NULL,
	id_autor VARCHAR(50) NOT NULL,
	fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT comentario_pk PRIMARY KEY (id_producto, id_autor, fecha),
	CONSTRAINT comentario_fk1 FOREIGN KEY (id_producto) REFERENCES producto (id) ON DELETE CASCADE,
	CONSTRAINT comentario_fk2 FOREIGN KEY (id_autor) REFERENCES usuario (cedula) ON DELETE CASCADE
);

-- ENVIO -------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS envio CASCADE;
CREATE TABLE envio(
	id_venta INTEGER NOT NULL,
	estado VARCHAR(50) NOT NULL DEFAULT 'En camino',

	CONSTRAINT envio_pk PRIMARY KEY (id_venta),
	CONSTRAINT envio_fk FOREIGN KEY (id_venta) REFERENCES venta (id) ON DELETE CASCADE
);
	
-- INSERTS ----------------------------------------------------------------------------------------------------------------------

-- USUARIOS ---------------------------------------------------------------------------------------------------------------------
INSERT INTO usuario (cedula,clave,nombre,direccion,codigo_postal,tarjeta,correo,comision) VALUES 
	('1144182479','0000','Santiago Hernández','Poblado Campestre','760001','5487895436120157','santiago@correo.com',25),
	('1143992392','1111','Cristian Vallecilla','Los Naranjos','760015','7684153598784565','cristian@correo.com',10),
	('1144208998','2222','Christian Taborda','Ulpiano Lloreda','760007','1595351648960231','christian@correo.com',30),
	('1151957133','3333','Sebastían Afanador','Meléndez','760003','3456817154980205','sebastian@correo.com',15);

-- PRODUCTOS --------------------------------------------------------------------------------------------------------------------
INSERT INTO producto (nombre,imagen,descripcion,categoria,costo,descuento,id_vendedor,existencias) VALUES
	('Xbox One','imagen','Consola Xbox One nueva en color blanco con 500GB y un control','Videojuegos',900000,0,'1144208998',2),
	('Honda Civic','imagen','Automóvil Honda Civic modelo 2013 en color Plateado (NO ES ROBADO)','Vehículos',43000000,15,'1144182479',1),
	('Gorra Nike','imagen','Gorra color gris marca Nike','Ropa',18000,10,'1143992392',20),
	('Spiderman PS4','imagen','Videojuego de Spiderman para la consola PS4','Videojuegos',200000,10,'1144208998',3),
	('Las manchas del leopardo','imagen','Libro sobre la evolución de la complejidad del autor Brian Goodwin','Libros',30000,0,'1144208998',5),
	('Televisor Samsung','imagen','Televisor SMART TV Samsung 49 pulgadas','Electrodomésticos',1400000,15,'1151957133',1),
	('Brownies Bimbo','imagen','Paquete de deliciosos brownies marca Bimbo (NO VENCIDOS)','Alimentos',12000,0,'1144182479',8),
	('Lavadora LG Turbodrum','imagen','Lavadora LG Turbodrum con 12 kg de capacidad','Electrodomésticos',1100000,25,'1151957133',2),
	('Sevedol Extrafuerte','imagen','Paquete de medicinas Sevedol Extrafuerte, para severos dolores de cabeza','Medicinas',24900,0,'1143992392',10),
	('Escritorio Ermes','imagen','Escritorio Ermes color chocolate','Muebles',170000,10,'1143992392',1),
	('Juego de mancuernas','imagen','Juego de mancuernas de 70 LBS','Otros',135000,0,'1151957133',5),
	('Caja de herramientas CAT Premium','imagen','Caja de herramientas portátil de plástico marca CAT','Herramientas',280000,5,'1151957133',3);
	
	
	
	