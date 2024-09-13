<?php
require('fpdf/fpdf.php');
require_once("../models/detalle_factura_model.php");
require_once("../models/factura_model.php");

$pdf = new FPDF();
$pdf->AddPage();
$productos = new Detalle_Factura();
$factura = new Factura();


$pdf->SetFont('Arial', 'B', 12);
$pdf->Text(10, 10, 'EMPRESA XYZ');
$pdf->SetFont('Arial', '', 10);
$pdf->Text(10, 20, 'RUC: 172155440000');
$pdf->Text(10, 25, 'DIRECCION: CALLE A Y CALLE B');
$pdf->Text(10, 30, 'TELEFONO: 112255');
$pdf->Text(10, 35, 'EMAIL: INFO@GMAIL.COM');
$pdf->Ln(10);

$pdf->SetFont('Courier', 'B', 11);
$pdf->Text(15, 50, 'Cliente');
$pdf->SetFont('Arial', '', 10);
$pdf->Text(15, 55, 'NOMBRE: VANESSA NASIMBA');
$pdf->Text(15, 60, 'CEDULA/RUC: 14455222');
$pdf->Text(15, 65, 'DIRECCION: CALLE A Y CALLE B');
$pdf->Text(15, 70, 'TELEFONO: 112255');

$pdf->SetFont('Courier', 'B', 11);
$pdf->Text(15, 80, 'PRODUCTOS');

$pdf->Ln(70);
$pdf->Cell(50, 10, "Descripcion",1);
$pdf->Cell(25, 10, "Cantidad", 1);
$pdf->Cell(40, 10, "Precio unitario", 1);
$pdf->Cell(55, 10, "Total", 1);

$listaproductos = $productos->detalle_IdFactura(14);

$index = 1;
$pdf->Ln();
while ($prod = mysqli_fetch_assoc($listaproductos)) {
    //      Ancho   alto de la celda
    $pdf->Cell(50, 10, $prod["Nombre_Producto"], 1);
    $pdf->Cell(25, 10, $prod["Cantidad"], 1);
    $pdf->Cell(40, 10, $prod["Precio_Unitario"], 1);
    $pdf->Cell(55, 10, $prod["Sub_Total_item"], 1);
    $pdf->Ln();
    $index++;
}
//consultar actura segun i para datos de totale
$DatosFactura = $factura->uno(14);
$datos = mysqli_fetch_assoc($DatosFactura);
$pdf -> SetXY(85,120);
$pdf->Cell(40, 10, "Subtotal",1);
$pdf -> SetXY(125,120);
$pdf->Cell(55, 10, $datos["Sub_total"],1);
//iva
$pdf -> SetXY(85,130);
$pdf->Cell(40, 10, "IVA",1);
$pdf -> SetXY(125,130);
$pdf->Cell(55, 10, $datos["Sub_total_iva"],1);
//total
$pdf -> SetXY(85,140);
$pdf->Cell(40, 10, "TOTAL",1);
$pdf -> SetXY(125,140);
$pdf->Cell(55, 10, $datos["Sub_total_iva"] + $datos["Sub_total"],1);


$pdf->SetFont('Arial', '', 9);
$pdf->Text(15, 175, 'Forma de pago: TRANSFERENCIA BANCARIA');
$pdf->Text(15, 180, 'Cueta bancaria: 14455222');



ob_end_clean();
$pdf->Output('Factura1.pdf','I');
?>