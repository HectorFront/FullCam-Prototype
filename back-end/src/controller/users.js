const conn = require('../config/database');

module.exports = {

        create: (req, res) => {

                    const { nome, login, email, cpf, senha, telefone, estado} = req.body;

                    if (!nome || !login || !email || !cpf || !senha)
                            res.status(400).send({ error: 'campos nulos!' });

                    let sqlUser = `INSERT INTO usuarios (nome, login, email, cpf, telefone, estado) VALUES ('${nome}', '${login}', '${email}', '${cpf}', '${telefone}', '${estado}');`;
                    conn.query(sqlUser, (err, result) => {
                    if (err)
                    res.status(500).send({ err: 'erro ao inserir usuario!', status: err });
                    console.log(result);
            });
            
                    let sqlLogin = `INSERT INTO login (login, senha) VALUES ('${login}', '${senha}')`;
                    conn.query(sqlLogin, (err, result) => {
                    if (err)
                    res.status(500).send({ err: "erro ao inserir o usuario no login!", status: err });
                    res.status(201).send({ sucess: "usuario adicionado com sucesso" });
            }); 
        },

        getUsers: (req, res)=>{
                    let getUsers = "SELECT COUNT(id) as count FROM usuarios";
                    conn.query(getUsers, (err, result)=>{
                    if(err)
                    res.status(500).send({ err: "erro ao contar usuários!", status: err });
                    res.status(200).send(result[0]);
        });
        },

        /* SELECT FROM cameras INNER JOIN usuarios_cameras on id_cameras = res.id */

        getLogin: (req, res)=>{
                    let getLogin = "SELECT * FROM login";
                    conn.query(getLogin, (err, result) =>{
                    if (err)
                    res.status(500).send({ err: "erro ao listar usuários de login!", status: err });
                    res.status(200).send(result);
        });
        },

        getLoginOne: (req, res)=>{
                    let id = req.params.idUser;
                    let getLoginOne = "SELECT login, email, senha FROM login WHERE id = ?";
                    conn.query(getLoginOne, id, (err, result) =>{
                    if (err)
                    res.status(500).send({ err: "erro ao listar usuários de login!", status: err });
                    res.status(200).send(result[0]);
            });
        },

        read: (req, res) => {
                    let sql = "SELECT * FROM usuarios";
                    conn.query(sql, (err, result) => {
                    if (err)
                    res.status(500).send({ err: "erro ao listar usuarios!", status: err });
                    res.status(200).send(result);
            });
        },

        readOne: (req, res) => {
                    let id = req.params.idUser;
                    let sql = "SELECT * FROM usuarios WHERE id = ?";
                    conn.query(sql, id, (err, result) => {
                    if (err)
                    res.status(500).send({ err: "erro ao listar usuarios!", status: err });
                    res.status(200).send(result[0]);
            });
        },

        update: (req, res) => {

                    let idUser = req.params.idUser;

                    const { nome, login, cpf, email, senha, telefone, estado} = req.body;

                    if (!nome || !login || !cpf || !email || !senha)
                            res.status(400).send({ error: 'campos invalidos!' });

                    let updateUser = `UPDATE usuarios SET nome='${nome}', login='${login}', cpf='${cpf}', email='${email}', telefone='${telefone}', estado='${estado}' WHERE id = ${idUser}`;

                    conn.query(updateUser, (err) => {
                    if (err)
                    res.status(500).send({ err: "erro ao atualizar os usuários", status: err });
                    res.status(200).send({ sucess: "usuario atualizado com sucesso" });
            });

                    let updateLogin = `UPDATE login  SET login='${login}', senha='${senha}' WHERE id = ${idUser}`;

                    conn.query(updateLogin, (err) => {
                    if(err)
                    res.status(500).send({ err: "erro ao atualizar o usuario no login!", status: err });
                    res.status(201).send();
            });
        },

        login: (req, res) => {

                    const { login, senha } = req.body;

                    let loginuser = `SELECT id, login, senha FROM login WHERE login ='${login}' AND senha = '${senha}'`;
                    conn.query(loginuser, (err, result) => {

                    if (result.length > 0) {

                    res.status(200).send(result[0]); 

                    console.log("Data in body: ", req.body)
                    console.log("Sucess in query: ", result)

                }else{

                    res.status(400).send({ error: 'campos incorretos' });
                    console.log("Data in body: ", req.body)
                    console.log("Error in query: ", result)

                }
            });
        },

        profilePut: (req, res) => {

                    const { login, senha } = req.body;

                    let id = req.params.idUser;

                    let profile = `UPDATE login SET login ='${login}', senha ='${senha}' WHERE id = ${id}`;
                    conn.query(profile, (err, result) => {
                    if(err)
                    res.status(500).send({ status: err });
                    res.status(200).send( { sucess: "perfil atualizado com sucesso!" });  
            });
        },

        delete: (req, res) => {
                let idUser = req.params.idUser;
                let deleteUser = "DELETE FROM usuarios WHERE id = " + idUser;
                conn.query(deleteUser, (err) => {

                if (err)
                res.status(500).send({ err: "erro ao deletar o usuario", status: err });
                res.status(200).send({ sucess: "usuário deletado com sucesso" });
            });

                let deleteLogin = "DELETE FROM login WHERE id = " + idUser;
                conn.query(deleteLogin, (err) => {

                if (err)
                res.status(500).send({ err: "erro ao deletar o login", status: err });
                res.status(200).send();
            });

                let deleteUserLogin = "DELETE FROM login_usuarios WHERE id = " + idUser;
                conn.query(deleteUserLogin, (err) => {

                if (err)
                res.status(500).send({ err: "erro ao deletar o usuario", status: err });
                res.status(200).send();
            });
        }
    }