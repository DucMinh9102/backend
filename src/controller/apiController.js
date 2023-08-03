import e from "express"
import pool  from "../config/connectDB.js"
 
let getAllUser = async (req, res) => {

    const [rows, fields] = await pool.execute('select * from users')

    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async (req, res) => {

    let {firstName, lastName, email, address} = req.body;

    if(!firstName || !lastName || !email || !address){
        return res.status(200).json({
            message: 'missing require'
        })
    }

    await pool.execute(`insert into users(firstName, lastName, email, address) values(?, ?, ?, ?)`, [firstName, lastName, email, address])

    return res.status(200).json({
        message: 'ok'
    })
}

let updateUser = async (req, res) =>{
    
    let {firstName, lastName, email, address, id} = req.body;
    if(!firstName || !lastName || !email || !address){
        return res.status(200).json({
            message: 'missing require'
        })
    }

    await pool.execute('update users set firstName=?, lastName=?, email=?, address=? where id=?', [firstName,lastName,email,address, id])

    return res.status(200).json({
        message: 'ok'
    })
}

let deleteUser = async (req, res) =>{

    let userID = req.params.id;
    if(!userID) {
        return res.status(200).json({
            message: 'missing require'
        })
    }

    await pool.execute('delete from users where id = ?',[userID])

    return res.status(200).json({
        message: 'ok'
    })
}

export default {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser
}