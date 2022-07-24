const {request, response}=require('express');

const usuariosGet=(req=request, res=response) =>{

    const query=req.query;

    res.json({
        ok:true,
        msg:'Get exitoso - controlador',
        query
    })
}

const usuariosPost=(req, res) =>{

    const body=req.body;

    res.json({
        ok:true,
        msg:'Post exitoso-controlador',
        body
    })
}

const usuariosPut=(req, res) =>{

    const {id}=req.params;

    res.json({
        ok:true,
        msg:'Put exitoso-controlador',
        id
    })
}

const usuariosPatch=(req, res) =>{
    res.json({
        ok:true,
        msg:'Patch exitoso-controlador'
    })
}

const usuariosDelete=(req, res) =>{
    res.json({
        ok:true,
        msg:'Delete exitoso-controlador'
    })
}


module.exports={
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut
}