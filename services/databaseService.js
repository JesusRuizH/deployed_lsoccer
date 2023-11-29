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
        const client = await pool.connect();
        //console.log(username)
        const userInfo = await client.query(`SELECT * FROM usuario WHERE usuario = '${username}'`)
        //const user = await knex(TABLE).select().where('usuario', username);
        const user = userInfo.rows;
        if (user.length === 0) {
            throw new Error("User not found");
        } 
        //console.log(user[0])
        return user[0];
    };

    const createUser = async (username, hashedPassword) => {
        //console.log("hash", hashedPassword)
        await knex('usuario').insert({usuario: `${username}`,pw: `${hashedPassword}`});
    };

    const getAlumno = async (pk_usuario) => {
        const client = await pool.connect();
        const userInfo = await client.query('SELECT * FROM alumno WHERE fk_usuario = $1', [pk_usuario])
        //const user = await knex(TABLE).select().where('usuario', username);
        const user = userInfo.rows;
        if (user.length === 0) {
            throw new Error("User not found");
        } 
        //console.log(user[0])
        return user[0];
    };

    const getAdministrador = async (pk_usuario) => {
        const client = await pool.connect();
        const userInfo = await client.query('SELECT * FROM administracion WHERE fk_usuario = $1', [pk_usuario])
        const user = userInfo.rows;
        if (user.length === 0) {
            throw new Error("User not found");
        } 
        //console.log(user[0])
        return user[0];
    };

    const getProfesor = async (pk_usuario) => {
        const client = await pool.connect();
        const userInfo = await client.query('SELECT * FROM profesor WHERE fk_usuario = $1', [pk_usuario])
        const user = userInfo.rows;
        if (user.length === 0) {
            throw new Error("User not found");
        } 
        //console.log(user[0])
        return user[0];
    };

    const getDirector = async (pk_usuario) => {
        const client = await pool.connect();
        const userInfo = await client.query('SELECT * FROM director_deportivo WHERE fk_usuario = $1', [pk_usuario])
        const user = userInfo.rows;
        if (user.length === 0) {
            throw new Error("User not found");
        } 
        //console.log(user[0])
        return user[0];
    };

    const eventos = async (fk_categoria) => {
        const client = await pool.connect();
        const eventoInfo = await client.query('SELECT * FROM eventos_importantes WHERE fk_categoria = $1', [fk_categoria])
        //const user = await knex(TABLE).select().where('usuario', username);
        const evento = eventoInfo.rows;
        if (evento.length === 0) {
            throw new Error("No eventos existentes");
        } 
        //console.log(user[0])
        return evento[0];
    };

    return {getUser, createUser, getAlumno, getAdministrador, getProfesor, getDirector, eventos};
};

module.exports = {
    databaseServiceFactory
};