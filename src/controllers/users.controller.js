import * as userService from "../services/user.service.js"
import jwt from "jsonwebtoken"

export const userLogin = async (req,res) => {
    try {
        const {email, password}= req.body;
        const user = await userService.verifyCredentials(email, password);
        const tokenPayLoad ={
            id: user.id,
            email: user.email,
            rol: user.rol
        }

        const token = jwt.sign(tokenPayLoad, process.env.JWT_SECRET,{expiresIn:'2h'});
        res.status(200).json({msj:"Credenciales verificadas, login exitoso.", token, user});
    } catch (err) {
        res.status(404).json({message: "No se pudo completar el login", error: err.message});
    }
}

export const createUser = async (req,res) => {
    try{
        const newUser = await userService.createUser(req.body);
        res.status(200).json( {message: "Usuario creado exitosamente"});
    }
    catch(err){
        res.status(400).json({message: "Error al crear el usuario"});
    }
}