import generarJWT from "../helpers/generarJWT.js";
import Veterinario from "../models/veterinario.js";

const registrar = async (req , res)=>{

    const {email}= req.body

    //  revisar si un usurio  esta registrado

    const existeUsuario = await Veterinario.findOne({email});

    if (existeUsuario) {
        const error = new Error("usuario registrado");

        return res.status(400).json({msg:error.message})
    }
    try {
       //  GUARDAR NUEVO VETERINARIO
       const veterinario = new Veterinario(req.body);
       const veterinarioGuardado = await veterinario.save();

       res.json(veterinarioGuardado);

    } catch (error) {
        console.log(error.message);

    }
 
}


const perfil = (req , res)=>{
    res.json({msg:'mostrando perfil'})
}


const confirmar = async (req , res)=>{

    const {token}= req.params;
    
    const usuarioConfirmar = await Veterinario.findOne({token});

    if (!usuarioConfirmar) {
        const error = new Error('token no valido');

        return res.status(404).json({ msg:error.message})
    }

    try {

        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json({msg:' Usuario confirmado correctamente'});

    } catch (error) {
        console.log(error.message);
    }  
};

const autenticar = async (req,res)=>{

    const {email,password} =req.body ;

    //  COMPROBAR SI EL USUARIO EXISTE

    const usuario = await Veterinario.findOne({email});

    if (!usuario) {
        const error = new Error('El usuario existe');

        return res.status(404).json({ msg:error.message})
    }
   
    // COMPROBAR SI EL USUARIO YA ESTA CONFIRMADO

    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no esta confirmada');

        return res.status(403).json({msg:error.message})
    }

    // REVISAR EL PASSWORD

    if (await usuario.comprobarPassword(password)) {
        // AUTENTICAR 
         res.json({token: generarJWT(usuario.id)});
    }else{
        const error = new Error('El password es incorrecto');

        return res.status(403).json({msg:error.message})
    }

    
};

export{
    registrar,
    perfil,
    confirmar,
    autenticar,
}