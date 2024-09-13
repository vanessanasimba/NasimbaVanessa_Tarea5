<?php 
require_once('../config/config.php');
error_reporting(0);

class UsuarioModel {


    public function todos(){
        $con = new ClaseConectar();
        $con = $con->conectarBaseDatos();
        $sql = "SELECT * FROM usuarios";
        $datos = mysqli_query($con, $sql);
        $con->close();
        return $datos;
    }

    public function uno($idUsuario){
        $con = new ClaseConectar();
        $con = $con->conectarBaseDatos();
        $sql = "SELECT * FROM usuarios WHERE id='$idUsuario'";
        $datos = mysqli_query($con, $sql);
        $con->close();
        return $datos;
    }

    public function insertar($Nombre_usuario, $Contrasenia, $Estado, $Roles_idRoles){
       try{

             $con = new ClaseConectar();
            $con = $con->conectarBaseDatos();
            $pass = md5($Contrasenia);
            $sql = "INSERT INTO usuarios (Nombre_usuario, Contrasenia, Estado, Roles_idRoles) VALUES ('$Nombre_usuario','$pass','$Estado','$Roles_idRoles')";
            if (mysqli_query($con, $sql)) {
                    return $con->insert_id;
                } else {
                    return $con->error;
                }
           
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($idUsuario, $Nombre_usuario, $Contrasenia, $Estado, $Roles_idRoles){
       try{
           
            $con = new ClaseConectar();
            $con = $con->conectarBaseDatos();
            $pass = md5($Contrasenia);
            $sql = "UPDATE usuarios SET Nombre_usuario='$Nombre_usuario', Contrasenia='$pass', Estado='$Estado', Roles_idRoles='$Roles_idRoles' WHERE idUsuarios='$idUsuario'";
            if (mysqli_query($con, $sql)) {
                return $idUsuario;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idUsuario){
        $con = new ClaseConectar();
        $con = $con->conectarBaseDatos();
        $sql = "DELETE FROM usuarios WHERE idUsuarios='$idUsuario'";
        $datos = mysqli_query($con, $sql);
        $con->close();
    }

    public function login($Nombre_usuario, $Contrasenia){
        $con = new ClaseConectar();
        $con = $con->conectarBaseDatos();
        $sql = "SELECT * FROM usuarios WHERE Nombre_usuario='$Nombre_usuario' and Estado = 1";
        $datos = mysqli_query($con, $sql);
        if ($datos && mysqli_num_rows($datos) > 0) {
            $usuario = mysqli_fetch_assoc($datos);
            if (md5($Contrasenia)== $usuario['Contrasenia']) {
                return $usuario;
            }else {
                return false;
            }
        }
        $con->close();
    }
}

?>