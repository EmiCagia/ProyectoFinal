export class UserModel {
  constructor({ id, nombre, email, password, rol, ubicacion, experiencia }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.rol = rol;
    this.ubicacion = ubicacion;
    this.experiencia = experiencia;
  }
}
