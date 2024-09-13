<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

// TODO: controlador de facturas Tienda Cel@g

require_once('../models/iva_model.php');
error_reporting(0);
$iva = new Iva;

switch ($_GET["op"]) {
        // TODO: operaciones de facturas

    case 'todos': // Procedimiento para cargar todas las facturas
        $datos = array();
        $datos = $iva->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todas[] = $row;
        }
        echo json_encode($todas);
        break;

    case 'uno': // Procedimiento para obtener una factura por ID
        if (!isset($_POST["idIVA"])) {
            echo json_encode(["error" => "Factura ID not specified."]);
            exit();
        }
        $idIVA = intval($_POST["idIVA"]);
        $datos = array();
        $datos = $iva->uno($idIVA);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}