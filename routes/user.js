const {Router}=require('express');
const { check,query } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/users');
const { esRoleValido, emailExiste, existeUsuarioById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router=Router();

router.get('/',[
    query('limit','El valor del limite debe ser numérico')
        .isNumeric()
        .optional(),
    query('from','El valor debe ser numérico').optional().isNumeric(),
    validarCampos
], usuariosGet);  

router.put('/:id',[
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut); 

router.post('/',[
    
    check('name','El nombre es obligatorio').notEmpty(),
    check('email','El email no es valido').isEmail(),
    check('password','El password debe tener más de 6 letras').isLength({min:6}),
    check('email').custom(emailExiste),
    // check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos

], usuariosPost); 

router.delete('/:id',[
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports=router;
