
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
	estado INTEGER NOT NULL DEFAULT 1,
	comision INTEGER NOT NULL,

	CONSTRAINT usuario_pk PRIMARY KEY (cedula)
);

-- SUSCRIPCION ----------------------------------------------------------------------------------------
DROP TABLE IF EXISTS suscripcion CASCADE;
CREATE TABLE suscripcion(
	nodo_lider VARCHAR(50) NOT NULL,
	suscriptor VARCHAR(50) NOT NULL,

	CONSTRAINT suscripcion_pk PRIMARY KEY (nodo_lider, suscriptor),
	CONSTRAINT suscripcion_fk1 FOREIGN KEY (nodo_lider) REFERENCES usuario (cedula),
	CONSTRAINT suscripcion_fk2 FOREIGN KEY (suscriptor) REFERENCES usuario (cedula)
);

-- CATEGORIA ------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS categoria CASCADE;
CREATE TABLE categoria(
	id SERIAL NOT NULL,
	nombre VARCHAR(50) NOT NULL,
	CONSTRAINT categoria_pk PRIMARY KEY (id)
);

-- PRODUCTO ------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS producto CASCADE;
CREATE TABLE producto(
	id SERIAL NOT NULL,
	nombre VARCHAR(50) NOT NULL,
	imagen VARCHAR(200) NOT NULL,
	descripcion VARCHAR(500) NOT NULL,
	categoria INTEGER NOT NULL,
	costo INTEGER NOT NULL DEFAULT 0,
	descuento INTEGER NOT NULL DEFAULT 0,
	id_vendedor VARCHAR(50) NOT NULL, 
	existencias INTEGER NOT NULL DEFAULT 0,

	CONSTRAINT producto_pk PRIMARY KEY (id),
	CONSTRAINT producto_fk1 FOREIGN KEY (id_vendedor) REFERENCES usuario (cedula) ON DELETE CASCADE,
	CONSTRAINT producto_fk2 FOREIGN KEY (categoria) REFERENCES categoria (id) ON DELETE CASCADE
);

-- CALIFICACION --------------------------------------------------------------------------------------
DROP TABLE IF EXISTS calificacion CASCADE;
CREATE TABLE calificacion(
	id_producto INTEGER NOT NULL,
	id_autor VARCHAR(50) NOT NULL,
	calificacion INTEGER NOT NULL DEFAULT 0,

	CONSTRAINT calificacion_pk PRIMARY KEY (id_producto, id_autor),
	CONSTRAINT calificacion_fk1 FOREIGN KEY (id_producto) REFERENCES producto (id) ON DELETE CASCADE,
	CONSTRAINT calificacion_fk2 FOREIGN KEY (id_autor) REFERENCES usuario (cedula) ON DELETE CASCADE
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
	comentario TEXT NOT NULL,
	fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT comentario_pk PRIMARY KEY (id_producto, id_autor, fecha),
	CONSTRAINT comentario_fk1 FOREIGN KEY (id_producto) REFERENCES producto (id) ON DELETE CASCADE,
	CONSTRAINT comentario_fk2 FOREIGN KEY (id_autor) REFERENCES usuario (cedula) ON DELETE CASCADE
);

-- ESTADO ENVIO -------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS estado_envio CASCADE;
CREATE TABLE estado_envio(
	id SERIAL NOT NULL,
	nombre VARCHAR(50) NOT NULL,
	CONSTRAINT estado_envio_pk PRIMARY KEY (id)

);

-- ENVIO -------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS envio CASCADE;
CREATE TABLE envio(
	id_venta INTEGER NOT NULL,
	estado INTEGER NOT NULL DEFAULT 1,

	CONSTRAINT envio_pk PRIMARY KEY (id_venta),
	CONSTRAINT envio_fk1 FOREIGN KEY (id_venta) REFERENCES venta (id) ON DELETE CASCADE,
	CONSTRAINT envio_fk2 FOREIGN KEY (estado) REFERENCES estado_envio (id) ON DELETE CASCADE
);
	
-- INSERTS ----------------------------------------------------------------------------------------------------------------------

-- USUARIOS ---------------------------------------------------------------------------------------------------------------------
INSERT INTO usuario (cedula,clave,nombre,direccion,codigo_postal,tarjeta,correo,comision) VALUES 
	('1144182479','0000','Santiago Hernández','Poblado Campestre','760001','5487895436120157','santiago@correo.com',25),
	('1143992392','1111','Cristian Vallecilla','Los Naranjos','760015','7684153598784565','cristian@correo.com',10),
	('1144208998','2222','Christian Taborda','Ulpiano Lloreda','760007','1595351648960231','christian@correo.com',30),
	('1151957133','3333','Sebastían Afanador','Meléndez','760003','3456817154980205','sebastian@correo.com',15);

-- CATEGORIAS --------------------------------------------------------------------------------------------------------------------
INSERT INTO categoria(nombre) VALUES
	('Videojuegos'),('Vehiculos'),('Ropa'),('Libros'),
	('Electrodomesticos'),('Alimentos'),('Medicinas'),('Muebles'),
	('Otros'),('Herramientas');

-- PRODUCTOS --------------------------------------------------------------------------------------------------------------------
INSERT INTO producto (nombre,imagen,descripcion,categoria,costo,descuento,id_vendedor,existencias) VALUES
	('Xbox One','1db4vtfa0jzpzbywm.jpeg','Consola Xbox One nueva en color blanco con 500GB y un control',1,900000,0,'1144208998',2),
	('Honda Civic','1db4vtfa0jzpzfgsn.jpg','Automóvil Honda Civic modelo 2013 en color Plateado (NO ES ROBADO)',2,43000000,15,'1144182479',1),
	('Gorra Nike','1db4vtfa0jzpzg3yf.jpg','Gorra color gris marca Nike',3,18000,10,'1143992392',20),
	('Spiderman PS4','1db4vtfa0jzpzgs3b.jpg','Videojuego de Spiderman para la consola PS4',1,200000,10,'1144208998',3),
	('Las manchas del leopardo','1db4vtfa0jzpzhu7x.jpg','Libro sobre la evolución de la complejidad del autor Brian Goodwin',4,30000,0,'1144208998',5),
	('Televisor Samsung','1db4vtfa0jzpzj5e6.jpg','Televisor SMART TV Samsung 49 pulgadas',5,1400000,15,'1151957133',1),
	('Brownies Bimbo','1db4vtfa0jzpzjtfi.jpg','Paquete de deliciosos brownies marca Bimbo (NO VENCIDOS)',6,12000,0,'1144182479',8),
	('Lavadora LG Turbodrum','1db4vtfa0jzpzlwb8.jpg','Lavadora LG Turbodrum con 12 kg de capacidad',5,1100000,25,'1151957133',2),
	('Sevedol Extrafuerte','1db4vtfa0jzpzmcu6.jpg','Paquete de medicinas Sevedol Extrafuerte, para severos dolores de cabeza',7,24900,0,'1143992392',10),
	('Escritorio Ermes','1db4vtfa0jzpzmvme.jpg','Escritorio Ermes color chocolate',8,170000,10,'1143992392',1),
	('Juego de mancuernas','1db4vtfa0jzpznboh.jpg','Juego de mancuernas de 70 LBS',9,135000,0,'1151957133',5),
	('Caja de herramientas CAT Premium','1db4vtfa0jzpznu2m.jpg','Caja de herramientas portátil de plástico marca CAT',10,280000,5,'1151957133',3);
	

-- ESTADO_ENVIO --------------------------------------------------------------------------------------------------------------------
INSERT INTO estado_envio (nombre) VALUES ('En camino');

-- CALIFICACION --------------------------------------------------------------------------------------------------------------------
insert into calificacion (id_producto,id_autor,calificacion) values 
	(1,'1151957133',4),
	(1,'1143992392',5),
	(1,'1144208998',5),
	(1,'1144182479',2),
	(2,'1151957133',4),
	(2,'1143992392',5),
	(2,'1144208998',1),
	(2,'1144182479',1),
	(3,'1151957133',5),
	(3,'1143992392',5),
	(3,'1144208998',5),
	(3,'1144182479',5);
	
-- COMENTARIOS --------------------------------------------------------------------------------------------------------------------
insert into comentario (id_producto,id_autor,comentario) values 
	(1,'1151957133','No me ha gustao'),
	(1,'1143992392','Me ha parecido la leche'),
	(1,'1144208998','genial!!'),
	(1,'1144182479','De verdad esto es real'),
	(2,'1151957133','No me ha gustao'),
	(2,'1143992392','Me ha parecido la leche'),
	(2,'1144208998','genial!!'),
	(2,'1144182479','De verdad esto es real'),
	(3,'1151957133','No me ha gustao'),
	(3,'1143992392','Me ha parecido la leche'),
	(3,'1144208998','genial!!'),
	(3,'1144182479','De verdad esto es real');
	

-- SUSCRIPCIONES -------------------------------------------------------------------------------------------------------------------
INSERT INTO suscripcion (nodo_lider, suscriptor) VALUES
	('1143992392', '1144208998'),
	('1151957133', '1144182479'),
	('1144208998', '1144182479');
	
	
	