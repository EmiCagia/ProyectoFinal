import { collection, getDocs, addDoc,getDoc, query, where, doc } from "firebase/firestore";
import { UserModel } from "../models/user.model.js";
import { db } from "../firebase/config.js";
import { hash, compare } from "bcrypt";

const collectionName = "usuarios"

export const createUser = async (data) => {
    const { id, nombre, email, password, rol, ubicacion, experiencia } = data;

    if (!email || !password) {
        throw new Error("Email y contraseña son obligatorios");
    }

    const q = query(
        collection(db, collectionName),
        where("email", "==", email)
    );

    const exists = await getDocs(q);

    if(!exists.empty){
        throw new Error("El correo electronico ya está registrado");
    }

    const hashedPassword = await hash(password,10);

    const newUser = {
        nombre,
        email,
        password: hashedPassword,
        rol: rol || "Sin rol",
        ubicacion: ubicacion || "Desconocida",
        experiencia: experiencia || "Sin experiencia"
    };

    const ref = await addDoc(collection(db, collectionName), newUser);

    const { password: _, ...safeUser} = newUser;

    return new UserModel({id: ref.id, ...safeUser});

}

export const verifyCredentials = async (email, password) => {
    const q = query(
        collection(db, collectionName),
        where("email", "==", email)
    );

    const snap = await getDocs(q);

    if (snap.empty) throw new Error("Usuario no encontrado");

    const userDoc = snap.docs[0];
    const user = userDoc.data();

    const valid = await compare(password, user.password);

    if(!valid) throw new Error("La contraseña es incorrecta");

    const {password: _, ...usersafe} = user;

    return {id: userDoc.id, ...usersafe};
}