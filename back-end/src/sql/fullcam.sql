CREATE DATABASE IF NOT EXISTS new_fullcam;

use new_fullcam;

CREATE TABLE usuarios(
  id int(4) NOT NULL AUTO_INCREMENT, /* => id usuario */
  nome varchar(150) NOT NULL,
  login varchar(150) NOT NULL,
  email varchar(150) NOT NULL,
  cpf char(11) NOT NULL,
  data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  telefone varchar(13),
  estado varchar(60),
  PRIMARY KEY(id),
  INDEX idx_email(email ASC)
);


CREATE TABLE login(
  id int(4) NOT NULL AUTO_INCREMENT,
  login varchar(150) NOT NULL,
  senha varchar(100) NOT NULL,
  PRIMARY KEY(id),
  INDEX idx_login(id ASC)
);


CREATE TABLE login_usuarios(
  id int(4) AUTO_INCREMENT NOT NULL,
  id_usuario int(4) NOT NULL, 
  id_login int(4) NOT NULL,   
  PRIMARY KEY(id),
  INDEX idx_id_usuario(id_usuario ASC),
  INDEX idx_id_login(id_login ASC),
  CONSTRAINT fg_login_usuario_id_usuario
    foreign key(id_usuario)
    references usuarios(id),
  CONSTRAINT fg_login_usuario_id_login
    foreign key(id_login)
    references login(id)
);

CREATE TABLE cameras(
  id int(4) AUTO_INCREMENT,
  nome varchar(150) NOT NULL,
  localidade varchar(200) NOT NULL,
  url varchar(999) NOT NULL,
  PRIMARY KEY(id),
  INDEX idx_cameras(id ASC)
);


CREATE TABLE usuarios_cameras(
  id int(4) AUTO_INCREMENT NOT NULL,
  id_usuario int(4) NOT NULL, 
  id_cameras int(4) NOT NULL, 
  PRIMARY KEY(id),
  INDEX idx_id_usuario(id_usuario ASC),
  INDEX idx_id_cameras(id_cameras ASC),
  CONSTRAINT fg_cameras_usuario_id_usuario
    foreign key(id_usuario)
    references usuarios(id)
	ON DELETE CASCADE,
  CONSTRAINT fg_cameras_usuario_id_cameras
    foreign key(id_cameras)
    references cameras(id)
    ON DELETE CASCADE
);	

CREATE TABLE mosaicos(
  id int(4) AUTO_INCREMENT NOT NULL,
  id_user_connected int(4) NOT NULL,
  name_mosaic VARCHAR (200) NOT NULL,
  CamOne int(255),
  CamTwo int(255),
  CamThree int(255),
  CamFour int(255),
  CamFive int(255),
  CamSix int(255),
  CamSeven int(255),
  CamEight int(255),
  CamNine int(255),
  PRIMARY KEY(id)
);


INSERT INTO usuarios (nome, login, email, cpf, telefone, estado) VALUES ('Hector Silva', 'hector.silva', 'hectddos103@gmail.com', '52005605867', '(14)3484-1418', 'SP (São Paulo)'); 
INSERT INTO login (login, senha) VALUES ('hector.silva', 'DDOS192103');