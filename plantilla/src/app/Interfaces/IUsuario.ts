export interface IUsuario {
    idUsuarios?: number; //opcional
    Nombre_usuario: string;
    Contrasenia: string;
    Estado?: number;
    Roles_idRoles?: number;
}