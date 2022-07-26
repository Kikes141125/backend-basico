const Role = require('../models/role');
const Usuario=require('../models/usuario');

const esRoleValido=async (rol='')=>{
    const existeRol= await Role.findOne({rol});
    if(!existeRol){
        throw new Error (`El rol ${rol} no está registrado en la BBDD`)
    }
}

const emailExiste=async(email='')=>{
    const existEmail=await Usuario.findOne({email});
    if(existEmail){
        throw new Error (`El email ${email} ya está registrado en la BBDD`)
    }
}

const existeUsuarioById=async(id)=>{
    const existUsuario=await Usuario.findById(id);
    if(!existUsuario){
        throw new Error (`El id ${id} no está registrado en la BBDD`)
    }
}

module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioById
}