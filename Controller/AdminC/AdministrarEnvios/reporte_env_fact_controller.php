<?php

session_start();
require '../../../Class/phpspreadsheet/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

\PhpOffice\PhpSpreadsheet\Cell\Cell::setValueBinder(new \PhpOffice\PhpSpreadsheet\Cell\AdvancedValueBinder());

date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
$fech_solo = date('Y-m-d');
if ($_POST) {
    require '../../../config.php';
    $client_dao = new Cliente_DAO();

    $fecha_inicial = $_POST["InputFecIni"];
    $fecha_final = $_POST["InputFecFin"];

    $hora_desde = '00:00:00';
    $hora_hasta = '23:59:00';

    $fecha_ini = $fecha_inicial . " " . $hora_desde;
    $fecha_fin = $fecha_final . " " . $hora_hasta;

    $porciones = explode("|", $_POST["selectCliente"]);
    $td_cli = $porciones[0];
    $num_doc_cli = $porciones[1];

    $datos_fact_json = json_encode($client_dao->consulta_hist_env_cliente_fact($fecha_ini, $fecha_fin, $td_cli, $num_doc_cli));
    $datosDecode = json_decode($datos_fact_json);
    $fila = 3;

    if (!empty($datosDecode)) {

        $nom_cli = $datosDecode[0]->cli_nombre;
        $num_doc_client = $datosDecode[0]->cli_num_doc;
        $tipo_docum_cli = $datosDecode[0]->cli_td_id;

        if (isset($_SESSION["adminlogi"])) {
            //Crear carpeta por usuario
            $directorioReport = '../../../Files/Reporte_Factura_adm/' . $num_doc_client . '_' . $tipo_docum_cli . '/';
            if (!file_exists($directorioReport)) {
                mkdir($directorioReport, 0777, true);
            }
//elimina el contenido en carpeta 
            $filesReport = glob($directorioReport . '*'); //obtenemos todos los nombres de los ficheros
            foreach ($filesReport as $file) {
                if (is_file($file)) {
                    unlink($file); //elimino el fichero
                }
            }
        } elseif (isset($_SESSION["cliente_a"])) {
            //Crear carpeta por usuario
//            $directorioReport = '../../../Files/Reporte_Stock/' . $num_doc_client . '_' . $tipo_docum_cli . '/';
//            if (!file_exists($directorioReport)) {
//                mkdir($directorioReport, 0777, true);
//            }
////elimina el contenido en carpeta
//            $filesReport = glob($directorioReport . '*'); //obtenemos todos los nombres de los ficheros
//            foreach ($filesReport as $file) {
//                if (is_file($file)) {
//                    unlink($file); //elimino el fichero
//                }
//            }
        } elseif (isset($_SESSION["sucursal"])) {
//            //Crear carpeta por usuario
//            $directorioReport = '../../../Files/Reporte_Stock_suc/' . $num_doc_client . '_' . $tipo_docum_cli . '/';
//            if (!file_exists($directorioReport)) {
//                mkdir($directorioReport, 0777, true);
//            }
////elimina el contenido en carpeta
//            $filesReport = glob($directorioReport . '*'); //obtenemos todos los nombres de los ficheros
//            foreach ($filesReport as $file) {
//                if (is_file($file)) {
//                    unlink($file); //elimino el fichero
//                }
//            }
        }

        $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
        $drawing->setName('Logo');
        $drawing->setDescription('Logo');
        $drawing->setPath('../../../img/logos/LOGO_CLAROS_500.png');
        $drawing->setCoordinates('A1');
        $drawing->setHeight(100);


        $objPhpexcel = new Spreadsheet();
        $objPhpexcel->getProperties()->setCreator("LOGI")->setDescription("Reporte Envios");
        $objPhpexcel->setActiveSheetIndex(0);
        $objPhpexcel->getActiveSheet()->setTitle("Stock Cliente");
        $objPhpexcel->getActiveSheet()->mergeCells('A1:B1');
        $objPhpexcel->getActiveSheet()->getRowDimension('1')->setRowHeight(70);
        $drawing->setWorksheet($objPhpexcel->getActiveSheet());
        $objPhpexcel->getActiveSheet()->getStyle('A1:E1')
                ->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
        $objPhpexcel->getActiveSheet()->getStyle('A1:E1')
                ->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

        $objPhpexcel->getActiveSheet()->mergeCells('C1:I1');
        $objPhpexcel->getActiveSheet()->getCell('C1')->setValue("INFO FACTURA CLIENTE " . $datosDecode[0]->cli_nombre . "\n de " . $fecha_inicial . " al " . $fecha_final);
        $objPhpexcel->getActiveSheet()->getStyle('C1')->getAlignment()->setWrapText(true);

        $objPhpexcel->getActiveSheet()->setCellValue('A2', 'CLIENTE');
        $objPhpexcel->getActiveSheet()->setCellValue('B2', 'FECHA');
        $objPhpexcel->getActiveSheet()->setCellValue('C2', 'OS');
        $objPhpexcel->getActiveSheet()->setCellValue('D2', 'T. SERVICIO');
        $objPhpexcel->getActiveSheet()->setCellValue('E2', 'ENVIO N°');
        $objPhpexcel->getActiveSheet()->setCellValue('F2', 'GUIA OP');
        $objPhpexcel->getActiveSheet()->setCellValue('G2', 'T. ENVIO');
        $objPhpexcel->getActiveSheet()->setCellValue('H2', 'SUCURSAL');
        $objPhpexcel->getActiveSheet()->setCellValue('I2', 'NOMBRE DESTINATARIO');
        $objPhpexcel->getActiveSheet()->setCellValue('J2', 'DIRECCIÓN DESTINATARIO');
        $objPhpexcel->getActiveSheet()->setCellValue('K2', 'TELEFONO DESTINATARIO');
        $objPhpexcel->getActiveSheet()->setCellValue('L2', 'CIUDAD DESTINO');
        $objPhpexcel->getActiveSheet()->setCellValue('M2', 'CANTIDAD ENV');
        $objPhpexcel->getActiveSheet()->setCellValue('N2', 'DICE CONTENER');
        $objPhpexcel->getActiveSheet()->setCellValue('O2', 'PESO Kg');
        $objPhpexcel->getActiveSheet()->setCellValue('P2', 'ALTO cm');
        $objPhpexcel->getActiveSheet()->setCellValue('Q2', 'ANCHO cm');
        $objPhpexcel->getActiveSheet()->setCellValue('R2', 'LARGO cm');
        $objPhpexcel->getActiveSheet()->getRowDimension('2')->setRowHeight(25);
        $objPhpexcel->getActiveSheet()->getStyle('A2:R2')->getFont()->setBold(TRUE);
        $objPhpexcel->getActiveSheet()->getStyle('C1')->getFont()->setBold(TRUE)
                ->setName('Calibri')->setSize(16)->getColor()->setRGB('660066');
        $objPhpexcel->getActiveSheet()->getStyle('A2:R2')
                ->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID);
        $objPhpexcel->getActiveSheet()->getStyle('A2:R2')
                ->getFill()->getStartColor()->setRGB('D1C5E2');

        for ($i = 0; $i < count($datosDecode); $i++) {
            $fecha_est = $datosDecode[$i]->exe_fec_hora;
            $orden_serv = $datosDecode[$i]->os_id;
            $tipo_serv = $datosDecode[$i]->ts_desc;
            $num_env = $datosDecode[$i]->exe_en_id;
            $guia_op = $datosDecode[$i]->en_guia;
            $tipo_env = $datosDecode[$i]->te_desc;
            $sucursal = $datosDecode[$i]->suc_nombre;
            $env_nombre = $datosDecode[$i]->en_nombre;
            $env_dir = $datosDecode[$i]->en_direccion;
            $env_tel = $datosDecode[$i]->en_telefono;
            $env_ciudad = $datosDecode[$i]->en_ciudad;
            $env_cantidad = $datosDecode[$i]->en_cantidad;
            $env_contenido = $datosDecode[$i]->en_contiene;
            $env_peso = $datosDecode[$i]->en_peso;
            $env_alto = $datosDecode[$i]->en_alto;
            $env_ancho = $datosDecode[$i]->en_ancho;
            $env_largo = $datosDecode[$i]->en_largo;

            $objPhpexcel->getActiveSheet()->setCellValue('A' . $fila, $nom_cli);
            $objPhpexcel->getActiveSheet()->setCellValue('B' . $fila, $fecha_est);
            $objPhpexcel->getActiveSheet()->setCellValue('C' . $fila, $orden_serv);
            $objPhpexcel->getActiveSheet()->setCellValue('D' . $fila, $tipo_serv);
            $objPhpexcel->getActiveSheet()->setCellValue('E' . $fila, $num_env);
            $objPhpexcel->getActiveSheet()->setCellValue('F' . $fila, $guia_op);
            $objPhpexcel->getActiveSheet()->setCellValue('G' . $fila, $tipo_env);
            $objPhpexcel->getActiveSheet()->setCellValue('H' . $fila, $sucursal);
            $objPhpexcel->getActiveSheet()->setCellValue('I' . $fila, $env_nombre);
            $objPhpexcel->getActiveSheet()->setCellValue('J' . $fila, $env_dir);
            $objPhpexcel->getActiveSheet()->setCellValue('K' . $fila, $env_tel);
            $objPhpexcel->getActiveSheet()->setCellValue('L' . $fila, $env_ciudad);
            $objPhpexcel->getActiveSheet()->setCellValue('M' . $fila, $env_cantidad);
            $objPhpexcel->getActiveSheet()->setCellValue('N' . $fila, $env_contenido);
            $objPhpexcel->getActiveSheet()->setCellValue('O' . $fila, $env_peso);
            $objPhpexcel->getActiveSheet()->setCellValue('P' . $fila, $env_alto);
            $objPhpexcel->getActiveSheet()->setCellValue('Q' . $fila, $env_ancho);
            $objPhpexcel->getActiveSheet()->setCellValue('R' . $fila, $env_largo);

            $fila++;
        }

        $objPhpexcel->getActiveSheet()->getColumnDimension('A')->setWidth(17);
        $objPhpexcel->getActiveSheet()->getColumnDimension('B')->setWidth(16);
        $objPhpexcel->getActiveSheet()->getColumnDimension('C')->setWidth(7);
        $objPhpexcel->getActiveSheet()->getColumnDimension('D')->setWidth(13);
        $objPhpexcel->getActiveSheet()->getColumnDimension('E')->setWidth(9);
        $objPhpexcel->getActiveSheet()->getColumnDimension('F')->setWidth(12);
        $objPhpexcel->getActiveSheet()->getColumnDimension('G')->setWidth(13);
        $objPhpexcel->getActiveSheet()->getColumnDimension('H')->setWidth(24);
        $objPhpexcel->getActiveSheet()->getColumnDimension('I')->setWidth(30);
        $objPhpexcel->getActiveSheet()->getColumnDimension('J')->setWidth(52);
        $objPhpexcel->getActiveSheet()->getColumnDimension('K')->setWidth(24);
        $objPhpexcel->getActiveSheet()->getColumnDimension('L')->setWidth(16);
        $objPhpexcel->getActiveSheet()->getColumnDimension('M')->setWidth(14);
        $objPhpexcel->getActiveSheet()->getColumnDimension('N')->setWidth(24);
        $objPhpexcel->getActiveSheet()->getColumnDimension('O')->setWidth(10);
        $objPhpexcel->getActiveSheet()->getColumnDimension('P')->setWidth(10);
        $objPhpexcel->getActiveSheet()->getColumnDimension('Q')->setWidth(10);
        $objPhpexcel->getActiveSheet()->getColumnDimension('R')->setWidth(10);

        if (isset($_SESSION["adminlogi"])) {
            $writer = new Xlsx($objPhpexcel);
            $writer->save('../../../Files/Reporte_Factura_adm/' . $num_doc_client . '_' . $tipo_docum_cli . '/INFO_FACT_' . $nom_cli . '_' . $fecha_inicial . '_a_' . $fecha_final . '.xlsx');
            echo 'Reporte_Factura_adm/' . $num_doc_client . '_' . $tipo_docum_cli . '/INFO_FACT_' . $nom_cli . '_' . $fecha_inicial . '_a_' . $fecha_final;
        } elseif (isset($_SESSION["cliente_a"])) {
//            $writer = new Xlsx($objPhpexcel);
//            $writer->save('../../../Files/Reporte_Stock/' . $num_doc_client . '_' . $tipo_docum_cli . '/Reporte_Stock_' . $nom_cli . '_' . $numero_suc . '.xlsx');
//            echo 'Reporte_Stock/' . $num_doc_client . '_' . $tipo_docum_cli . '/Reporte_Stock_' . $nom_cli . '_' . $numero_suc;
        } elseif (isset($_SESSION["sucursal"])) {
//            $writer = new Xlsx($objPhpexcel);
//            $writer->save('../../../Files/Reporte_Stock_suc/' . $num_doc_client . '_' . $tipo_docum_cli . '/Reporte_Stock_' . $nom_suc . '_' . $numero_suc . '.xlsx');
//            echo 'Reporte_Stock_suc/' . $num_doc_client . '_' . $tipo_docum_cli . '/Reporte_Stock_' . $nom_suc . '_' . $numero_suc;
        }
    } else {
        echo 1;
    }
} else {
    header("location../");
}    