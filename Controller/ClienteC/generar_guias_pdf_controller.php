<?php

if (isset($_SESSION["adminlogi"])) {
    //Crear carpeta por usuario para imagenes QR
    $directorioQR = '../../img/tmp_qr_adm/' . $_SESSION["num_doc_cli_adm"] . '_' . $_SESSION["td_cli_adm"] . '/';
    if (!file_exists($directorioQR)) {
        mkdir($directorioQR, 0777, true);
    }
//elimina el contenido en carpeta imagenes QR existente
    $filesQR = glob($directorioQR . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesQR as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }

//Crear carpeta por usuario para imagenes Barras
    $directorioBar = '../../img/tmp_barras_adm/' . $_SESSION["num_doc_cli_adm"] . '_' . $_SESSION["td_cli_adm"] . '/';
    if (!file_exists($directorioBar)) {
        mkdir($directorioBar, 0777, true);
    }
//elimina el contenido en carpeta imagenes Barras existente
    $filesBar = glob($directorioBar . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesBar as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }
} else {
    //Crear carpeta por usuario para imagenes QR
    $directorioQR = '../../img/tmp_qr/' . $_SESSION["numero_doc"] . '_' . $_SESSION["tipo_doc"] . '/';
    if (!file_exists($directorioQR)) {
        mkdir($directorioQR, 0777, true);
    }
//elimina el contenido en carpeta imagenes QR existente
    $filesQR = glob($directorioQR . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesQR as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }

//Crear carpeta por usuario para imagenes Barras
    $directorioBar = '../../img/tmp_barras/' . $_SESSION["numero_doc"] . '_' . $_SESSION["tipo_doc"] . '/';
    if (!file_exists($directorioBar)) {
        mkdir($directorioBar, 0777, true);
    }
//elimina el contenido en carpeta imagenes Barras existente
    $filesBar = glob($directorioBar . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesBar as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }
}

include '../../barcode/barcode.php';

$pdf = new FPDF();

for ($i = $inicio_array; $i < $pag_fin; $i++) {

    $separar = (explode(" ", $array[$i]->exe_fec_hora));
    $fecha = $separar[0];
    $hora = $separar[1];
    $code = $array[$i]->en_id;
    $file_qr_name = $directorioQR . $code . '.png';
    $file_bar_name = $directorioBar . $code . '.png';

    $tamanio = 10;
    $lavel = 'H';
    $framesize = 1;
    $contenido = $code;

    $pdf->AddPage(); //agregar pagina
    $pdf->SetFont('Arial', 'B', 15);
    $pdf->Image('../../img/logos/LOGO-ESTILO-1500x500.png', 15, 12, 30);
    barcode($file_bar_name, $code, 30, 'horizontal', 'code39', true, 1);
    $pdf->Image($file_bar_name, 12, 30, 35);
    QRcode::png($contenido, $file_qr_name, $lavel, $tamanio, $framesize);
    $pdf->Image($file_qr_name, 165, 47, 30);
    $pdf->Cell(40, 35, '', 1, 0, 'C');
    $pdf->Cell(60, 35, '', 1, 0, 'C');
    $pdf->Cell(90, 35, '', 1, 1, 'C');
    $pdf->Cell(30, 35, '', 1, 0, 'C');
    $pdf->Cell(30, 35, '', 1, 0, 'C');
    $pdf->Cell(40, 35, '', 1, 0, 'C');
    $pdf->Cell(50, 35, '', 1, 0, 'C');
    $pdf->Cell(40, 35, '', 1, 1, 'C');

    $pdf->Cell(40, 24, '', 0, 1, 'C');

    $pdf->Image('../../img/logos/LOGO-ESTILO-1500x500.png', 15, 106, 30);
    $pdf->Image($file_bar_name, 12, 124, 35);
    $pdf->Image($file_qr_name, 165, 141, 30);
    $pdf->Cell(40, 35, '', 1, 0, 'C');
    $pdf->Cell(60, 35, '', 1, 0, 'C');
    $pdf->Cell(90, 35, '', 1, 1, 'C');
    $pdf->Cell(30, 35, '', 1, 0, 'C');
    $pdf->Cell(30, 35, '', 1, 0, 'C');
    $pdf->Cell(40, 35, '', 1, 0, 'C');
    $pdf->Cell(50, 35, '', 1, 0, 'C');
    $pdf->Cell(40, 35, '', 1, 1, 'C');

    $pdf->Cell(40, 24, '', 0, 1, 'C');

    $pdf->Image('../../img/logos/LOGO-ESTILO-1500x500.png', 15, 200, 30);
    $pdf->Image($file_bar_name, 12, 218, 35);
    $pdf->Image($file_qr_name, 165, 235, 30);
    $pdf->Cell(40, 35, '', 1, 0, 'C');
    $pdf->Cell(60, 35, '', 1, 0, 'C');
    $pdf->Cell(90, 35, '', 1, 1, 'C');
    $pdf->Cell(30, 35, '', 1, 0, 'C');
    $pdf->Cell(30, 35, '', 1, 0, 'C');
    $pdf->Cell(40, 35, '', 1, 0, 'C');
    $pdf->Cell(50, 35, '', 1, 0, 'C');
    $pdf->Cell(40, 35, '', 1, 1, 'C');


    $pdf->SetXY(50, 10);
    $pdf->SetFont('Arial', 'BI', 9);
    $pdf->Cell(50, 5, utf8_decode('Remitente'), 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, '', 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, utf8_decode($array[$i]->cli_nombre), 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, 'Tel. ' . $array[$i]->os_tel_cont, 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, utf8_decode($array[$i]->os_direccion), 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, utf8_decode($array[$i]->ciu_nombre), 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, utf8_decode($array[$i]->dep_desc), 0, 1, 'L');


    $pdf->SetXY(110, 10);
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(60, 5, 'Destinatario', 0, 1, 'L');
    $pdf->SetX(110);
//    $pdf->Cell(60, 5, '', 0, 1, 'L');
    $pdf->SetX(110);
    $pdf->SetFont('Arial', '', 6);
    $pdf->Cell(60, 5, utf8_decode($array[$i]->en_nombre), 0, 1, 'L');
    $pdf->SetX(110);
    $pdf->SetFont('Arial', '', 6);
    $pdf->Cell(60, 5, 'Tel. ' . $array[$i]->en_telefono, 0, 1, 'L');
    $pdf->SetX(110);
    $pdf->SetFont('Arial', '', 6);
    $pdf->MultiCell(60, 3, utf8_decode($array[$i]->en_direccion), 0, 'L', 0);
    $pdf->SetX(110);
    $pdf->SetFont('Arial', '', 6);
    $pdf->Cell(60, 5, utf8_decode($array[$i]->en_ciudad), 0, 1, 'L');
    $pdf->SetX(110);
    $pdf->SetFont('Arial', '', 6);
    $pdf->Cell(60, 5, utf8_decode($array[$i]->en_departamento), 0, 1, 'L');



    $pdf->SetXY(10, 45);
    $pdf->SetFont('Arial', 'BI', 8);
    $pdf->Cell(30, 5, utf8_decode('Causal Devolución'), 0, 1, 'C');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, 'Desconocido', 0, 1, 'L');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, 'Rehusado: ', 0, 1, 'L');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, 'No reside', 0, 1, 'L');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, utf8_decode('No reclamado'), 0, 1, 'L');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, utf8_decode('Derección errada'), 0, 1, 'L');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, 'Otro', 0, 1, 'L');

    $pdf->SetXY(30, 50);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->SetFillColor(246, 237, 255);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(9, 1, '', 0, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(9, 1, '', 0, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(9, 1, '', 0, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(9, 1, '', 0, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(9, 1, '', 0, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);


    $pdf->SetXY(40, 45);
    $pdf->SetFont('Arial', 'BI', 8);
    $pdf->Cell(30, 5, utf8_decode('Fecha Devolución'), 0, 1, 'C');
    $pdf->SetX(42);
    $pdf->Cell(30, 5, '', 0, 1, 'L');
    $pdf->SetX(42);
    $pdf->SetFont('Arial', 'BI', 7);
    $pdf->SetFillColor(246, 237, 255);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(7, 4, 'D', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, 'M', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, 'A', 1, 1, 'C', 1);
    $pdf->SetX(42);
    $pdf->SetFont('Arial', 'BI', 7);
    $pdf->SetFillColor(246, 237, 255);
    $pdf->Cell(4, 4, '1', 1, 0, 'L', 1);
    $pdf->Cell(7, 4, '', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, '', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, '', 1, 1, 'C', 1);
    $pdf->SetX(42);
    $pdf->SetFont('Arial', 'BI', 7);
    $pdf->SetFillColor(246, 237, 255);
    $pdf->Cell(4, 4, '2', 1, 0, 'L', 1);
    $pdf->Cell(7, 4, '', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, '', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, '', 1, 1, 'C', 1);
    $pdf->SetX(42);
    $pdf->Cell(50, 3, '', 0, 1, 'L');
    $pdf->SetX(40);
    $pdf->SetFont('Arial', 'BI', 6);
    $pdf->Cell(30, 5, utf8_decode('Fecha Devolución a Rem.'), 0, 1, 'C');
    $pdf->SetX(45);
    $pdf->Cell(6, 5, utf8_decode('_____/'), 0, 0, 'L');
    $pdf->Cell(6, 5, utf8_decode('_____/'), 0, 0, 'L');
    $pdf->Cell(6, 5, utf8_decode('_____'), 0, 0, 'L');


    $pdf->SetXY(70, 45);
    $pdf->SetFont('Arial', 'BI', 8);
    $pdf->Cell(40, 5, utf8_decode('Descripción Envio'), 0, 1, 'C');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, 'Fecha: ' . $fecha, 0, 1, 'L');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, 'Unidades: ' . $array[$i]->en_cantidad, 0, 1, 'L');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, utf8_decode('Dice Contener: ' . $array[$i]->en_contiene), 0, 1, 'L');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, utf8_decode('Peso: ' . $array[$i]->en_peso . ' Kg'), 0, 1, 'L');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, utf8_decode('Medidas: ' . $array[$i]->en_alto . ' cm x ' . $array[$i]->en_ancho . ' cm x ' . $array[$i]->en_largo . ' cm'), 0, 1, 'L');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, 'Valor Declarado: $' . number_format($array[$i]->en_valor_decl), 0, 1, 'L');


    $pdf->SetXY(110, 45);
    $pdf->SetFont('Arial', 'BI', 9);
    $pdf->Cell(50, 5, utf8_decode('Recibido a Conformidad'), 0, 1, 'C');
    $pdf->SetX(110);
    $pdf->Cell(40, 25, utf8_decode(''), 0, 1, 'C');
    $pdf->SetFont('Arial', 'B', 7);
    $pdf->SetX(110);
    $pdf->Cell(50, 5, utf8_decode('Nombre legible, sello y D.I'), 0, 1, 'C');





    $pdf->SetXY(50, 104);
    $pdf->SetFont('Arial', 'BI', 9);
    $pdf->Cell(50, 5, 'Remitente', 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, '', 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, utf8_decode($array[$i]->cli_nombre), 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, 'Tel. ' . $array[$i]->os_tel_cont, 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, utf8_decode($array[$i]->os_direccion), 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, utf8_decode($array[$i]->ciu_nombre), 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, utf8_decode($array[$i]->dep_desc), 0, 1, 'L');


    $pdf->SetXY(110, 104);
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(60, 5, 'Destinatario', 0, 1, 'L');
    $pdf->SetX(110);
//    $pdf->Cell(60, 5, '', 0, 1, 'L');
    $pdf->SetX(110);
    $pdf->SetFont('Arial', '', 6);
    $pdf->Cell(60, 5, utf8_decode($array[$i]->en_nombre), 0, 1, 'L');
    $pdf->SetX(110);
    $pdf->SetFont('Arial', '', 6);
    $pdf->Cell(60, 5, 'Tel. ' . $array[$i]->en_telefono, 0, 1, 'L');
    $pdf->SetX(110);
    $pdf->SetFont('Arial', '', 6);
    $pdf->MultiCell(60, 3, utf8_decode($array[$i]->en_direccion), 0, 'L', 0);
    $pdf->SetX(110);
    $pdf->SetFont('Arial', '', 6);
    $pdf->Cell(60, 5, utf8_decode($array[$i]->en_ciudad), 0, 1, 'L');
    $pdf->SetX(110);
    $pdf->SetFont('Arial', '', 6);
    $pdf->Cell(60, 5, utf8_decode($array[$i]->en_departamento), 0, 1, 'L');



    $pdf->SetXY(10, 139);
    $pdf->SetFont('Arial', 'BI', 8);
    $pdf->Cell(30, 5, utf8_decode('Causal Devolución'), 0, 1, 'C');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, 'Desconocido', 0, 1, 'L');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, 'Rehusado: ', 0, 1, 'L');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, 'No reside', 0, 1, 'L');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, utf8_decode('No reclamado'), 0, 1, 'L');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, utf8_decode('Derección errada'), 0, 1, 'L');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, 'Otro', 0, 1, 'L');

    $pdf->SetXY(30, 144);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->SetFillColor(246, 237, 255);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(9, 1, '', 0, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(9, 1, '', 0, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(9, 1, '', 0, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(9, 1, '', 0, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(9, 1, '', 0, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);


    $pdf->SetXY(40, 139);
    $pdf->SetFont('Arial', 'BI', 8);
    $pdf->Cell(30, 5, utf8_decode('Fecha Devolución'), 0, 1, 'C');
    $pdf->SetX(42);
    $pdf->Cell(30, 5, '', 0, 1, 'L');
    $pdf->SetX(42);
    $pdf->SetFont('Arial', 'BI', 7);
    $pdf->SetFillColor(246, 237, 255);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(7, 4, 'D', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, 'M', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, 'A', 1, 1, 'C', 1);
    $pdf->SetX(42);
    $pdf->SetFont('Arial', 'BI', 7);
    $pdf->SetFillColor(246, 237, 255);
    $pdf->Cell(4, 4, '1', 1, 0, 'L', 1);
    $pdf->Cell(7, 4, '', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, '', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, '', 1, 1, 'C', 1);
    $pdf->SetX(42);
    $pdf->SetFont('Arial', 'BI', 7);
    $pdf->SetFillColor(246, 237, 255);
    $pdf->Cell(4, 4, '2', 1, 0, 'L', 1);
    $pdf->Cell(7, 4, '', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, '', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, '', 1, 1, 'C', 1);
    $pdf->SetX(42);
    $pdf->Cell(50, 3, '', 0, 1, 'L');
    $pdf->SetX(40);
    $pdf->SetFont('Arial', 'BI', 6);
    $pdf->Cell(30, 5, utf8_decode('Fecha Devolución a Rem.'), 0, 1, 'C');
    $pdf->SetX(45);
    $pdf->Cell(6, 5, utf8_decode('_____/'), 0, 0, 'L');
    $pdf->Cell(6, 5, utf8_decode('_____/'), 0, 0, 'L');
    $pdf->Cell(6, 5, utf8_decode('_____'), 0, 0, 'L');


    $pdf->SetXY(70, 139);
    $pdf->SetFont('Arial', 'BI', 8);
    $pdf->Cell(40, 5, utf8_decode('Descripción Envio'), 0, 1, 'C');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, 'Fecha: ' . $fecha, 0, 1, 'L');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, 'Unidades: ' . $array[$i]->en_cantidad, 0, 1, 'L');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, utf8_decode('Dice Contener: ' . $array[$i]->en_contiene), 0, 1, 'L');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, utf8_decode('Peso: ' . $array[$i]->en_peso . ' Kg'), 0, 1, 'L');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, utf8_decode('Medidas: ' . $array[$i]->en_alto . ' cm x ' . $array[$i]->en_ancho . ' cm x ' . $array[$i]->en_largo . ' cm'), 0, 1, 'L');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, 'Valor Declarado: $' . number_format($array[$i]->en_valor_decl), 0, 1, 'L');


    $pdf->SetXY(110, 139);
    $pdf->SetFont('Arial', 'BI', 9);
    $pdf->Cell(50, 5, utf8_decode('Recibido a Conformidad'), 0, 1, 'C');
    $pdf->SetX(110);
    $pdf->Cell(40, 25, utf8_decode(''), 0, 1, 'C');
    $pdf->SetFont('Arial', 'B', 7);
    $pdf->SetX(110);
    $pdf->Cell(50, 5, utf8_decode('Nombre legible, sello y D.I'), 0, 1, 'C');





    $pdf->SetXY(50, 198);
    $pdf->SetFont('Arial', 'BI', 9);
    $pdf->Cell(50, 5, 'Remitente', 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, '', 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, utf8_decode($array[$i]->cli_nombre), 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, 'Tel. ' . $array[$i]->os_tel_cont, 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, utf8_decode($array[$i]->os_direccion), 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, utf8_decode($array[$i]->ciu_nombre), 0, 1, 'L');
    $pdf->SetX(50);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(50, 5, utf8_decode($array[$i]->dep_desc), 0, 1, 'L');


    $pdf->SetXY(110, 198);
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(60, 5, 'Destinatario', 0, 1, 'L');
    $pdf->SetX(110);
//    $pdf->Cell(60, 5, '', 0, 1, 'L');
    $pdf->SetX(110);
    $pdf->SetFont('Arial', '', 6);
    $pdf->Cell(60, 5, utf8_decode($array[$i]->en_nombre), 0, 1, 'L');
    $pdf->SetX(110);
    $pdf->SetFont('Arial', '', 6);
    $pdf->Cell(60, 5, 'Tel. ' . $array[$i]->en_telefono, 0, 1, 'L');
    $pdf->SetX(110);
    $pdf->SetFont('Arial', '', 6);
    $pdf->MultiCell(60, 3, utf8_decode($array[$i]->en_direccion), 0, 'L', 0);
    $pdf->SetX(110);
    $pdf->SetFont('Arial', '', 6);
    $pdf->Cell(60, 5, utf8_decode($array[$i]->en_ciudad), 0, 1, 'L');
    $pdf->SetX(110);
    $pdf->SetFont('Arial', '', 6);
    $pdf->Cell(60, 5, utf8_decode($array[$i]->en_departamento), 0, 1, 'L');



    $pdf->SetXY(10, 233);
    $pdf->SetFont('Arial', 'BI', 8);
    $pdf->Cell(30, 5, utf8_decode('Causal Devolución'), 0, 1, 'C');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, 'Desconocido', 0, 1, 'L');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, 'Rehusado: ', 0, 1, 'L');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, 'No reside', 0, 1, 'L');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, utf8_decode('No reclamado'), 0, 1, 'L');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, utf8_decode('Derección errada'), 0, 1, 'L');
    $pdf->SetX(10);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->Cell(30, 5, 'Otro', 0, 1, 'L');

    $pdf->SetXY(30, 238);
    $pdf->SetFont('Arial', 'I', 6);
    $pdf->SetFillColor(246, 237, 255);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(9, 1, '', 0, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(9, 1, '', 0, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(9, 1, '', 0, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(9, 1, '', 0, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(9, 1, '', 0, 1, 'L', 1);
    $pdf->SetX(30);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(1, 4, '', 0, 0, 'L', 1);
    $pdf->Cell(4, 4, '', 1, 1, 'L', 1);


    $pdf->SetXY(40, 233);
    $pdf->SetFont('Arial', 'BI', 8);
    $pdf->Cell(30, 5, utf8_decode('Fecha Devolución'), 0, 1, 'C');
    $pdf->SetX(42);
    $pdf->Cell(30, 5, '', 0, 1, 'L');
    $pdf->SetX(42);
    $pdf->SetFont('Arial', 'BI', 7);
    $pdf->SetFillColor(246, 237, 255);
    $pdf->Cell(4, 4, '', 1, 0, 'L', 1);
    $pdf->Cell(7, 4, 'D', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, 'M', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, 'A', 1, 1, 'C', 1);
    $pdf->SetX(42);
    $pdf->SetFont('Arial', 'BI', 7);
    $pdf->SetFillColor(246, 237, 255);
    $pdf->Cell(4, 4, '1', 1, 0, 'L', 1);
    $pdf->Cell(7, 4, '', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, '', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, '', 1, 1, 'C', 1);
    $pdf->SetX(42);
    $pdf->SetFont('Arial', 'BI', 7);
    $pdf->SetFillColor(246, 237, 255);
    $pdf->Cell(4, 4, '2', 1, 0, 'L', 1);
    $pdf->Cell(7, 4, '', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, '', 1, 0, 'C', 1);
    $pdf->Cell(7, 4, '', 1, 1, 'C', 1);
    $pdf->SetX(42);
    $pdf->Cell(50, 3, '', 0, 1, 'L');
    $pdf->SetX(40);
    $pdf->SetFont('Arial', 'BI', 6);
    $pdf->Cell(30, 5, utf8_decode('Fecha Devolución a Rem.'), 0, 1, 'C');
    $pdf->SetX(45);
    $pdf->Cell(6, 5, utf8_decode('_____/'), 0, 0, 'L');
    $pdf->Cell(6, 5, utf8_decode('_____/'), 0, 0, 'L');
    $pdf->Cell(6, 5, utf8_decode('_____'), 0, 0, 'L');


    $pdf->SetXY(70, 233);
    $pdf->SetFont('Arial', 'BI', 8);
    $pdf->Cell(40, 5, utf8_decode('Descripción Envio'), 0, 1, 'C');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, 'Fecha: ' . $fecha, 0, 1, 'L');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, 'Unidades: ' . $array[$i]->en_cantidad, 0, 1, 'L');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, utf8_decode('Dice Contener: ' . $array[$i]->en_contiene), 0, 1, 'L');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, utf8_decode('Peso: ' . $array[$i]->en_peso . ' Kg'), 0, 1, 'L');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, utf8_decode('Medidas: ' . $array[$i]->en_alto . ' cm x ' . $array[$i]->en_ancho . ' cm x ' . $array[$i]->en_largo . ' cm'), 0, 1, 'L');
    $pdf->SetX(70);
    $pdf->SetFont('Arial', 'I', 5);
    $pdf->Cell(40, 5, 'Valor Declarado: $' . number_format($array[$i]->en_valor_decl), 0, 1, 'L');


    $pdf->SetXY(110, 233);
    $pdf->SetFont('Arial', 'BI', 9);
    $pdf->Cell(50, 5, utf8_decode('Recibido a Conformidad'), 0, 1, 'C');
    $pdf->SetX(110);
    $pdf->Cell(40, 25, utf8_decode(''), 0, 1, 'C');
    $pdf->SetFont('Arial', 'B', 7);
    $pdf->SetX(110);
    $pdf->Cell(50, 5, utf8_decode('Nombre legible, sello y D.I'), 0, 1, 'C');
}
if (isset($_SESSION["adminlogi"])) {
    //Crear carpeta por usuario para Guias en pdf
    $directorioGuias_pdf = '../../Files/GuiasPDF_temp_adm/' . $_SESSION["num_doc_cli_adm"] . '_' . $_SESSION["td_cli_adm"] . '/';
    if (!file_exists($directorioGuias_pdf)) {
        mkdir($directorioGuias_pdf, 0777, true);
    }
//elimina el contenido en carpeta imagenes QR existente
    $filesGuias = glob($directorioGuias_pdf . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesGuias as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }

//elimina el contenido en carpeta imagenes QR existente
    $filesQR_Del = glob($directorioQR . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesQR_Del as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }

//elimina el contenido en carpeta imagenes Barras existente
    $filesBar_Del = glob($directorioBar . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesBar_Del as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }

    $file_pdf_name = $directorioGuias_pdf . $_SESSION["num_doc_cli_adm"] . '.pdf';

    $pdf->Output($file_pdf_name, 'F');
} else {
    //Crear carpeta por usuario para Guias en pdf
    $directorioGuias_pdf = '../../Files/GuiasPDF_temp/' . $_SESSION["numero_doc"] . '_' . $_SESSION["tipo_doc"] . '/';
    if (!file_exists($directorioGuias_pdf)) {
        mkdir($directorioGuias_pdf, 0777, true);
    }
//elimina el contenido en carpeta imagenes QR existente
    $filesGuias = glob($directorioGuias_pdf . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesGuias as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }

//elimina el contenido en carpeta imagenes QR existente
    $filesQR_Del = glob($directorioQR . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesQR_Del as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }

//elimina el contenido en carpeta imagenes Barras existente
    $filesBar_Del = glob($directorioBar . '*'); //obtenemos todos los nombres de los ficheros
    foreach ($filesBar_Del as $file) {
        if (is_file($file)) {
            unlink($file); //elimino el fichero
        }
    }

    $file_pdf_name = $directorioGuias_pdf . $_SESSION["numero_doc"] . '.pdf';

    $pdf->Output($file_pdf_name, 'F');
}

