const {request, response}=require('express');
const bcryptjs=require('bcryptjs');

const Usuario=require('../models/usuario');

const usuariosGet=async (req=request, res=response) =>{

    // const query=req.query;
    const {limit=5,from=0}=req.query;
    const statusQuery={status:true}

    // const usuarios=await Usuario.find(statusQuery)
    //     .skip(from)
    //     .limit(limit);

    // const total= await Usuario.countDocuments(statusQuery);

    const [total,usuarios]=await Promise.all([
        Usuario.countDocuments(statusQuery),
        Usuario.find(statusQuery)
            .skip(from)
            .limit(limit)
    ])
    res.json({
        // respuesta
        total,
        // // ok:true,
        // // msg:'Get exitoso - controlador',
        // // query
        usuarios
    })
}

const usuariosPost=async (req=request, res=response) =>{


    const {name,email,password,rol}=req.body;
    const usuario=new Usuario({name,email,password,rol});


    //Encript password
    const salt=bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password,salt);

    //SAVE
    await usuario.save();
    res.json({
        // ok:true,
        // msg:'Post exitoso-controlador',
        usuario
    })
}

const usuariosPut=async (req=request, res=response) =>{

    const {id}=req.params;

    const{_id,password,google,email,...resto}=req.body;

    //TODO validate BBDD

    if(password){
        const salt=bcryptjs.genSaltSync();
        resto.password=bcryptjs.hashSync(password,salt);
    }

    const usuario=await Usuario.findOneAndUpdate(id,resto);

    res.json({
        // ok:true,
        // msg:'Put exitoso-controlador',
        usuario
    })
}

const usuariosPatch=(req=request, res=response) =>{
    res.json({
        ok:true,
        msg:'Patch exitoso-controlador'
    })
}

const usuariosDelete=async (req=request, res=response) =>{

    const {id}=req.params;

    //Borrado fisico
    // const usuario=await Usuario.findByIdAndDelete(id);
    
    //Cambio de estado
    const usuario=await Usuario.findByIdAndUpdate(id,{status:false});
    
    res.json(usuario)
    
}


module.exports={
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut
}