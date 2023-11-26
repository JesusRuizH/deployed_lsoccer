/*
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : process.env.DB_HOST,
        port : 3306,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB,
    }
});*/

import { pool } from '../config/db'


const databaseServiceFactory = () => {
    //const TABLE = 'usuario';

    const getUser = async (username) => {
        const user = await pool.query('SELECT * FROM usuario WHERE usuario = ?', username)
        //const user = await knex(TABLE).select().where('usuario', username);
        if (user.length === 0) {
            throw new Error("User not found");
        } 
        //console.log(user[0])
        return user[0][0];
    };

    const createUser = async (username, hashedPassword) => {
        //console.log("hash", hashedPassword)
        await knex('usuario').insert({usuario: `${username}`,pw: `${hashedPassword}`});
    };

    const getAlumno = async (PK_usuario) => {
        const user = await pool.query('SELECT * FROM alumno WHERE FK_usuario = ?', PK_usuario)
        //const user = await knex(TABLE).select().where('usuario', username);
        if (user.length === 0) {
            throw new Error("User not found");
        } 
        //console.log(user[0])
        return user[0][0];
    };

    const getAdministrador = async (PK_usuario) => {
        const user = await pool.query('SELECT * FROM administracion WHERE FK_usuario = ?', PK_usuario)
        //const user = await knex(TABLE).select().where('usuario', username);
        if (user.length === 0) {
            throw new Error("User not found");
        } 
        //console.log(user[0])
        return user[0][0];
    };

    const getProfesor = async (PK_usuario) => {
        const user = await pool.query('SELECT * FROM profesor WHERE FK_usuario = ?', PK_usuario)
        //const user = await knex(TABLE).select().where('usuario', username);
        if (user.length === 0) {
            throw new Error("User not found");
        } 
        //console.log(user[0])
        return user[0][0];
    };

    const getDirector = async (PK_usuario) => {
        const user = await pool.query('SELECT * FROM director_deportivo WHERE FK_usuario = ?', PK_usuario)
        //const user = await knex(TABLE).select().where('usuario', username);
        if (user.length === 0) {
            throw new Error("User not found");
        } 
        //console.log(user[0])
        return user[0][0];
    };

    const eventos = async (FK_categoria) => {
        const evento = await pool.query('SELECT * FROM eventos_importantes WHERE FK_categoria = ?', FK_categoria)
        //const user = await knex(TABLE).select().where('usuario', username);
        if (evento.length === 0) {
            throw new Error("No eventos existentes");
        } 
        //console.log(user[0])
        return evento[0][0];
    };

    return {getUser, createUser, getAlumno, getAdministrador, getProfesor, getDirector, eventos};
};

module.exports = {
    databaseServiceFactory
};