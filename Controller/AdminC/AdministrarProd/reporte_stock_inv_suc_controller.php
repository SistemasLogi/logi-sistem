<?php

date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
$fech_solo = date('Y-m-d');

require '../../../Class/phpspreadsheet/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

\PhpOffice\PhpSpreadsheet\Cell\Cell::setValueBinder(new \PhpOffice\PhpSpreadsheet\Cell\AdvancedValueBinder());
if ($_POST) {
    require '../../../config.php';
    $product_dao = new Producto_DAO();

    $suc_num_id = $_POST["suc"];

    $datosStock = json_encode($product_dao->consultaInventarioStock($suc_num_id, $fecha_hora_now));
    $datosDecode = json_decode($datosStock);

    $fila = 2;

    if (!empty($datosStock)) {

        if (isset($_SESSION["adminlogi"])) {
            //Crear carpeta por usuario para imagenes QR
            $directorioQR = '../../Files/Reporte_Stock_adm/' . $num_doc_client . '_' . $tipo_docum_cli . '/';
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

        }
    }
} else {
    header("location../");
}    