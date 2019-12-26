const express = require('express');
const router = express.Router();

const users = require('../controller/users');
const cams = require('../controller/cams');

router
     /* rotas da api */
    .get('/', (req, res) => res.send({ funcionando: "OK" }))
    .post('/users', users.create)
    .post('/login', users.login)
    .get('/login', users.getLogin)
    .get('/login/:idUser', users.getLoginOne)
    .put('/perfil/:idUser', users.profilePut)
    .get('/users', users.read)
    .get('/countusers', users.getUsers)
    .get('/users/:idUser', users.readOne)
    .put('/users/:idUser', users.update)
    .delete('/users/:idUser', users.delete)
    .post('/cameras/:idUser', cams.create)
    .post('/mosaic/:idUser', cams.createMosaic)
    .get('/mosaicTable/:idUser', cams.getMosaic)
    .get('/mosaicView/:idMosaic', cams.getCamsMosaic)
    .put('/mosaicUpdate/:idMosaic/:idUser', cams.updateMosaic)
    .delete('/mosaicDelete/:idMosaic/:idUser', cams.deleteMosaic)
    .get('/cameras/:idUser', cams.read)
    .get('/cameras/:idUser/:idCam', cams.readOne)
    .get('/camerasCount/:idUser', cams.getCams)
    .put('/cameras/:idCam', cams.update)
    .delete('/cameras/:idCam', cams.delete)


module.exports = router;