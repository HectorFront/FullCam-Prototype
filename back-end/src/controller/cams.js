const conn = require('../config/database');

module.exports = {

    create: (req, res) => {

        const { nome, localidade, url} = req.body;

        if (!nome || !localidade || !url)
            res.status(400).send({ error: "erro ao cadastrar camêra, campos estão nulos!" })

        let sqlSet = `INSERT INTO cameras SET nome='${nome}', localidade='${localidade}', url='${url}'`;
        conn.query(sqlSet, (err, result) => {
            if (err)
                res.status(500).send({ err: 'erro ao inserir usuario!', status: err });

            let idUser = req.params.idUser;
            let idCam = result.insertId;

            let sqlSetUserCam = `INSERT INTO usuarios_cameras SET id_usuario='${idUser}', id_cameras='${idCam}'`;
            conn.query(sqlSetUserCam, (err)=>{
                if (err)
                    res.status(500).send({ err: "erro ao inserir em usuarios_cameras", status: err });
                    res.status(201).send({ sucess: "camera adicionada com sucesso!"});
            });

        });
    },

    createMosaic: (req, res)=>{   
                
                let idUser = req.params.idUser;

                const {name, CamOne, CamTwo, CamThree, CamFour, CamFive, CamSix, CamSeven, CamEight, CamNine} = req.body;

                if(!name || !CamOne || !CamTwo || !CamThree || !CamFour || !CamFive || !CamSeven || !CamEight || !CamNine)
                     res.status(400).send( { err: 'erro ao criar um mosaico!'});

                let sqlSetMosaic = `INSERT INTO mosaicos SET name_mosaic='${name}', id_user_connected='${idUser}', CamOne='${CamOne}', CamTwo='${CamTwo}', CamThree='${CamThree}', CamFour='${CamFour}', CamFive='${CamFive}',
                CamSix='${CamSix}', CamSeven='${CamSeven}', CamEight='${CamEight}', CamNine='${CamNine}'`;
                conn.query(sqlSetMosaic, (err)=>{
                if (err)
                res.status(500).send( { err: "erro ao criar um novo mosaico!" });
                res.status(201).send({ sucess: "mosaico adicionado com sucesso!" });
        });
    },

    read: (req, res) => {

                let idUser = req.params.idUser;

                let sqlGet = `SELECT * FROM cameras INNER JOIN usuarios_cameras ON usuarios_cameras.id_cameras = cameras.id WHERE usuarios_cameras.id_usuario = ${idUser}`;
                conn.query(sqlGet, (err, result) => {
                if (err)
                res.status(500).send({ err: "erro ao listar cameras!", status: err });
                res.status(200).send(result);
        });
    },

    readOne: (req, res) => {

                let idUser = req.params.idUser;
                let idCam = req.params.idCam;

                if(idCam != 0){

                let sqlGetId = `SELECT * FROM cameras INNER JOIN usuarios_cameras ON usuarios_cameras.id_cameras = cameras.id WHERE usuarios_cameras.id_usuario = ${idUser} AND cameras.id = ${idCam};`;
                conn.query(sqlGetId, (err, result) => {
                if (err)
                res.status(500).send({ err: "erro ao listar cameras!", status: err });
                if (result.length > 0)
                res.status(200).send(result[0]);
                else
                res.status(404).send();
         });
                }else if(idCam == 0){
                res.status(200).send({ url: '../images/null.jpeg'});
                }
        
    },

            getCams: (req, res) =>{

                let countCam = "SELECT COUNT(id) as count FROM cameras";
                conn.query(countCam, (err, result)=>{
                    if (err)
                    res.status(500).send({ err: 'erro ao contar cameras!', status, err })
                    if(result.length > 0)
                    res.status(200).send(result[0]);
                });
            },

            getMosaic: (req, res)=>{
                
                let idUser = req.params.idUser;

                let sqlMosaic = `SELECT * FROM mosaicos WHERE id_user_connected = ${idUser}`;
                conn.query(sqlMosaic, (err, result)=>{
                    if (err)
                    res.status(500).send({ err: 'erro ao selecionar mosaicos do usuário', status, err });
                    res.status(200).send(result);
                });
            },

            getCamsMosaic: (req, res)=>{
                let idMosaic = req.params.idMosaic;

                let sqlCamsMosaic = `SELECT * FROM mosaicos WHERE id = ${idMosaic}`;
                conn.query(sqlCamsMosaic, (err, result)=>{
                    if (err)
                    res.status(500).send({ err: 'erro ao selecionar o mosaico específico!', status, err});
                    res.status(200).send(result[0]);
                });
            },

    update: (req, res) => {

                let idCam = req.params.idCam;

                const { nome, localidade, url} = req.body;

                if (!nome || !localidade || !url)
                        res.status(400).send({ err: "Erro ao atualizar os dados, campos estão nulos" });

                let updateCam = `UPDATE cameras SET nome='${nome}', localidade='${localidade}', url='${url}' WHERE id = ${idCam}`;

                conn.query(updateCam, (err) => {
                if (err)
                res.status(500).send({ err: "erro ao atualizar os dados", status: err });
                res.status(200).send({ sucess: "camera atualizada com sucesso" });
        });
    },

    updateMosaic: (req, res)=>{
            
                let idMosaic = req.params.idMosaic;
                let idUser = req.params.idUser;

                const {name, CamOne, CamTwo, CamThree, CamFour, CamFive, CamSix, CamSeven, CamEight, CamNine} = req.body;

                if(!name || !CamOne || !CamTwo || !CamThree || !CamFour || !CamFive || !CamSeven || !CamEight || !CamNine)
                     res.status(400).send( { err: 'erro ao atualizar o mosaico especificado!'});

                let updateMosaic = `UPDATE mosaicos SET id_user_connected='${idUser}', name_mosaic='${name}', CamOne='${CamOne}', CamTwo='${CamTwo}',
                CamThree='${CamThree}', CamFour='${CamFour}', CamFive='${CamFive}', CamSix='${CamSix}', CamSeven='${CamSeven}', CamEight='${CamEight}',
                CamNine='${CamNine}' WHERE id = ${idMosaic} AND id_user_connected='${idUser}'`;

                conn.query(updateMosaic, (err)=>{
                if (err)
                res.status(500).send({ err: "erro ao atualizar mosaico", status: err });
                res.status(200).send({ sucess: "mosaico atualizado com sucesso" });
                });
    },

    deleteMosaic: (req, res)=>{
      
               let idMosaic = req.params.idMosaic;
               let idUser = req.params.idUser;

               let deleteMosaic = `DELETE FROM mosaicos WHERE id = ${idMosaic} AND id_user_connected='${idUser}'`;
               conn.query(deleteMosaic, (err)=>{
                   if (err)
                   res.status(500).send({ err: "erro ao deletar mosaico", status: err});
                   res.status(200).send({ sucess: "sucesso ao deletar mosaico" });
               });
    },

    delete: (req, res) => {

                let idCam = req.params.idCam;

                let deleteCam = `DELETE FROM cameras WHERE id = ${idCam};`;
                conn.query(deleteCam, (err) => {
                if (err)
                res.status(500).send({ err: "erro ao deletar a camera", status: err });
                res.status(200).send({ sucess: "camera deletada com sucesso" });
        });
    }
}