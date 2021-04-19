<?php

session_start();
require '../../../Class/phpspreadsheet/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

\PhpOffice\PhpSpreadsheet\Cell\Cell::setValueBinder(new \PhpOffice\PhpSpreadsheet\Cell\AdvancedValueBinder());

date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
$fech_solo = date('Y-m-d');

$suc_id = $_POST["sucursal_id"];
$fecha_inicio = $_POST["ini_fecha"];
$fecha_final = $_POST["fin_fecha"];

$hora_desde = '00:00:00';
$hora_hasta = '23:59:00';
if ($_POST) {
    require '../../../config.php';
    $est_env = new Estado_x_env_DAO();
//    if (isset($_SESSION["sucursal"])) {
//        $suc_num_id = $_SESSION["numero_suc"];
//    } else {
//        $suc_num_id = $_POST["suc"];
//    }


    if ($suc_id == '0') {

        $fecha_ini = $fecha_inicio . " " . $hora_desde;
        $fecha_fin = $fecha_final . " " . $hora_hasta;

        $datos_envios = json_encode($est_env->consulta_ultimo_est_envios("", "AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"] . " AND o.os_id = ess.os_id AND ess.exs_fecha_hora BETWEEN '" . $fecha_ini . "' AND '" . $fecha_fin . "'", ""));
    } else {

        $fecha_ini = $fecha_inicio . " " . $hora_desde;
        $fecha_fin = $fecha_final . " " . $hora_hasta;

        $datos_envios = json_encode($est_env->consulta_ultimo_est_envios_suc("", "AND cl.cli_td_id = " . $_SESSION["tipo_doc"] . " AND cl.cli_num_doc = " . $_SESSION["numero_doc"] . " AND o.os_id = ess.os_id AND ess.exs_fecha_hora BETWEEN '" . $fecha_ini . "' AND '" . $fecha_fin . "'", " AND oxs.suc_num_id = " . $suc_id . ""));
    }
    $datosDecode = json_decode($datos_envios);

    $fila = 3;

    if (!empty($datos_envios)) {

        $num_doc_client = $datosDecode[0]->cli_num_doc;
        $tipo_docum_cli = $datosDecode[0]->cli_td_id;
        $nom_cli = $datosDecode[0]->cli_nombre;
        $nom_suc = $datosDecode[0]->suc_nombre;
        $numero_suc = $datosDecode[0]->suc_num_id;

        if (isset($_SESSION["adminlogi"])) {
            //Crear carpeta por usuario
            $directorioReport = '../../../Files/Reporte_Stock_adm/' . $num_doc_client . '_' . $tipo_docum_cli . '/';
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
            $directorioReport = '../../../Files/Reporte_Envios_Cl/' . $num_doc_client . '_' . $tipo_docum_cli . '/';
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
        } elseif (isset($_SESSION["sucursal"])) {
            //Crear carpeta por usuario
            $directorioReport = '../../../Files/Reporte_Stock_suc/' . $num_doc_client . '_' . $tipo_docum_cli . '/';
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
        }

        $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
        $drawing->setName('Logo');
        $drawing->setDescription('Logo');
        $drawing->setPath('../../../img/logos/LOGO_CLAROS_500.png');
        $drawing->setCoordinates('A1');
        $drawing->setHeight(100);


        $objPhpexcel = new Spreadsheet();
        $objPhpexcel->getProperties()->setCreator("LOGI")->setDescription("Reporte Envios ");
        $objPhpexcel->setActiveSheetIndex(0);
        $objPhpexcel->getActiveSheet()->setTitle("Envios Cliente");
        $objPhpexcel->getActiveSheet()->mergeCells('A1:C1');
        $objPhpexcel->getActiveSheet()->getRowDimension('1')->setRowHeight(70);
        $drawing->setWorksheet($objPhpexcel->getActiveSheet());
        $objPhpexcel->getActiveSheet()->getStyle('A1:M1')
                ->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
        $objPhpexcel->getActiveSheet()->getStyle('A1:M1')
                ->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

        $objPhpexcel->getActiveSheet()->getCell('D1')->setValue("REPORTE ENVIOS CLIENTE " . $datosDecode[0]->cli_nombre . "\nSUC. " . $datosDecode[0]->suc_nombre);
        $objPhpexcel->getActiveSheet()->getStyle('D1')->getAlignment()->setWrapText(true);
        $objPhpexcel->getActiveSheet()->mergeCells('D1:I1');

        $objPhpexcel->getActiveSheet()->setCellValue('A2', 'N° ENVIO');
        $objPhpexcel->getActiveSheet()->setCellValue('B2', 'GUIA OP');
        $objPhpexcel->getActiveSheet()->setCellValue('C2', 'FECHA');
        $objPhpexcel->getActiveSheet()->setCellValue('D2', 'HORA');
        $objPhpexcel->getActiveSheet()->setCellValue('E2', 'ESTADO');
        $objPhpexcel->getActiveSheet()->setCellValue('F2', 'OBSERVACIONES');
        $objPhpexcel->getActiveSheet()->setCellValue('G2', 'DESTINATARIO');
        $objPhpexcel->getActiveSheet()->setCellValue('H2', 'DIRECCIÓN');
        $objPhpexcel->getActiveSheet()->setCellValue('I2', 'CIUDAD');
        $objPhpexcel->getActiveSheet()->setCellValue('J2', 'DPTO');
        $objPhpexcel->getActiveSheet()->setCellValue('K2', 'CLIENTE');
        $objPhpexcel->getActiveSheet()->setCellValue('L2', 'SUC');
        $objPhpexcel->getActiveSheet()->setCellValue('M2', 'SERVICIO');
        $objPhpexcel->getActiveSheet()->setCellValue('N2', 'T. ENVIO');
        $objPhpexcel->getActiveSheet()->getRowDimension('2')->setRowHeight(25);
        $objPhpexcel->getActiveSheet()->getStyle('A2:N2')->getFont()->setBold(TRUE);
        $objPhpexcel->getActiveSheet()->getStyle('D1')->getFont()->setBold(TRUE)
                ->setName('Calibri')->setSize(16)->getColor()->setRGB('660066');
        $objPhpexcel->getActiveSheet()->getStyle('A2:N2')
                ->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID);
        $objPhpexcel->getActiveSheet()->getStyle('A2:N2')
                ->getFill()->getStartColor()->setRGB('D1C5E2');

        for ($i = 0; $i < count($datosDecode); $i++) {

            $porciones = explode(" ", $datosDecode[$i]->exe_fec_hora);

            $fecha_est = $porciones[0];
            $hora_est = $porciones[1];
            $num_envio = $datosDecode[$i]->exe_en_id;
            $guia = $datosDecode[$i]->en_guia;
            $estado = $datosDecode[$i]->ee_desc;
            $cliente = $datosDecode[$i]->cli_nombre;
            $sucursal = $datosDecode[$i]->suc_nombre;
            $servicio = $datosDecode[$i]->ts_desc;
            $tipo_envio = $datosDecode[$i]->te_desc;
            $direccion = $datosDecode[$i]->en_direccion;
            $ciudad = $datosDecode[$i]->en_ciudad;
            $departamento = $datosDecode[$i]->en_departamento;
            $nombre_dest = $datosDecode[$i]->en_nombre;
            $obs = $datosDecode[$i]->exe_ee_id;

            if ($obs == 5) {
                $observaciones = "";
            } else {
                $observaciones = $datosDecode[$i]->exe_novedad;
            }


            $objPhpexcel->getActiveSheet()->setCellValue('A' . $fila, $num_envio);
            $objPhpexcel->getActiveSheet()->setCellValue('B' . $fila, $guia);
            $objPhpexcel->getActiveSheet()->setCellValue('C' . $fila, $fecha_est);
            $objPhpexcel->getActiveSheet()->setCellValue('D' . $fila, $hora_est);
            $objPhpexcel->getActiveSheet()->setCellValue('E' . $fila, $estado);
            $objPhpexcel->getActiveSheet()->setCellValue('F' . $fila, $observaciones);
            $objPhpexcel->getActiveSheet()->setCellValue('G' . $fila, $nombre_dest);
            $objPhpexcel->getActiveSheet()->setCellValue('H' . $fila, $direccion);
            $objPhpexcel->getActiveSheet()->setCellValue('I' . $fila, $ciudad);
            $objPhpexcel->getActiveSheet()->setCellValue('J' . $fila, $departamento);
            $objPhpexcel->getActiveSheet()->setCellValue('K' . $fila, $cliente);
            $objPhpexcel->getActiveSheet()->setCellValue('L' . $fila, $sucursal);
            $objPhpexcel->getActiveSheet()->setCellValue('M' . $fila, $servicio);
            $objPhpexcel->getActiveSheet()->setCellValue('N' . $fila, $tipo_envio);

            $objPhpexcel->getActiveSheet()->getStyle('C' . $fila)->getNumberFormat()
                    ->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_DATE_XLSX15);
            $objPhpexcel->getActiveSheet()->getStyle('D' . $fila)->getNumberFormat()
                    ->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_DATE_TIME1);

            $fila++;
        }

        $objPhpexcel->getActiveSheet()->getColumnDimension('A')->setWidth(12);
        $objPhpexcel->getActiveSheet()->getColumnDimension('B')->setWidth(12);
        $objPhpexcel->getActiveSheet()->getColumnDimension('C')->setWidth(12);
        $objPhpexcel->getActiveSheet()->getColumnDimension('D')->setWidth(12);
        $objPhpexcel->getActiveSheet()->getColumnDimension('E')->setWidth(21);
        $objPhpexcel->getActiveSheet()->getColumnDimension('F')->setWidth(25);
        $objPhpexcel->getActiveSheet()->getColumnDimension('G')->setWidth(25);
        $objPhpexcel->getActiveSheet()->getColumnDimension('H')->setWidth(40);
        $objPhpexcel->getActiveSheet()->getColumnDimension('I')->setWidth(15);
        $objPhpexcel->getActiveSheet()->getColumnDimension('J')->setWidth(20);
        $objPhpexcel->getActiveSheet()->getColumnDimension('K')->setWidth(19);
        $objPhpexcel->getActiveSheet()->getColumnDimension('L')->setWidth(22);
        $objPhpexcel->getActiveSheet()->getColumnDimension('M')->setWidth(13);
        $objPhpexcel->getActiveSheet()->getColumnDimension('N')->setWidth(13);

        if (isset($_SESSION["adminlogi"])) {
            $writer = new Xlsx($objPhpexcel);
            $writer->save('../../../Files/Reporte_Stock_adm/' . $num_doc_client . '_' . $tipo_docum_cli . '/Reporte_Stock_' . $nom_cli . '_' . $numero_suc . '.xlsx');
            echo 'Reporte_Stock_adm/' . $num_doc_client . '_' . $tipo_docum_cli . '/Reporte_Stock_' . $nom_cli . '_' . $numero_suc;
        } elseif (isset($_SESSION["cliente_a"])) {
            $writer = new Xlsx($objPhpexcel);
            $writer->save('../../../Files/Reporte_Envios_Cl/' . $num_doc_client . '_' . $tipo_docum_cli . '/Reporte_Envios_' . $nom_cli . '_' . $numero_suc . '.xlsx');
            echo 'Reporte_Envios_Cl/' . $num_doc_client . '_' . $tipo_docum_cli . '/Reporte_Envios_' . $nom_cli . '_' . $numero_suc;
        } elseif (isset($_SESSION["sucursal"])) {
            $writer = new Xlsx($objPhpexcel);
            $writer->save('../../../Files/Reporte_Stock_suc/' . $num_doc_client . '_' . $tipo_docum_cli . '/Reporte_Stock_' . $nom_suc . '_' . $numero_suc . '.xlsx');
            echo 'Reporte_Stock_suc/' . $num_doc_client . '_' . $tipo_docum_cli . '/Reporte_Stock_' . $nom_suc . '_' . $numero_suc;
        }
    } else {
        echo 1;
    }
} else {
    header("location../");
}    