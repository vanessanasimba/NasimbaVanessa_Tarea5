<?php
// TODO: Clase de Producto
require_once('../config/config.php');

class Detalle_Factura{
    public function detalle_IdFactura($id){
        $con = new ClaseConectar();
        $con = $con->conectarBaseDatos();
        $cadena = "SELECT 
                    p.Nombre_Producto,
                    df.Cantidad,
                    df.Precio_Unitario,
                    df.Sub_Total_item
                    FROM sexto.detalle_factura df
                    LEFT JOIN sexto.kardex k ON k.idKardex = df.Kardex_idKardex
                    LEFT JOIN sexto.productos p ON p.idProductos = k.Productos_idProductos
                    WHERE df.Factura_idFactura = $id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }
}