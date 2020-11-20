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
    $product_dao = new Producto_DAO();

    $suc_num_id = $_POST["suc"];

    $datosStock = json_encode($product_dao->consultaInventarioStock($suc_num_id, $fecha_hora_now));
    $datosDecode = json_decode($datosStock);

    $fila = 3;

    if (!empty($datosStock)) {

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
        } else {
            //Crear carpeta por usuario
            $directorioReport = '../../../Files/Reporte_Stock/' . $num_doc_client . '_' . $tipo_docum_cli . '/';
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
        $objPhpexcel->getProperties()->setCreator("LOGI")->setDescription("Reporte Stock ");
        $objPhpexcel->setActiveSheetIndex(0);
        $objPhpexcel->getActiveSheet()->setTitle("Stock Cliente");
        $objPhpexcel->getActiveSheet()->mergeCells('A1:B1');
        $objPhpexcel->getActiveSheet()->getRowDimension('1')->setRowHeight(60);
        $drawing->setWorksheet($objPhpexcel->getActiveSheet());
        $objPhpexcel->getActiveSheet()->getStyle('A1:E1')
                ->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
        $objPhpexcel->getActiveSheet()->getStyle('A1:E1')
                ->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

        $objPhpexcel->getActiveSheet()->getCell('C1')->setValue("REPORTE STOCK CLIENTE " . $datosDecode[0]->cli_nombre . "\nSUC. " . $datosDecode[0]->suc_nombre);
        $objPhpexcel->getActiveSheet()->getStyle('C1')->getAlignment()->setWrapText(true);

        $objPhpexcel->getActiveSheet()->setCellValue('A2', 'CODIGO');
        $objPhpexcel->getActiveSheet()->setCellValue('B2', 'SKU');
        $objPhpexcel->getActiveSheet()->setCellValue('C2', 'DESCRIPCIÓN');
        $objPhpexcel->getActiveSheet()->setCellValue('D2', 'UBICACIÓN');
        $objPhpexcel->getActiveSheet()->setCellValue('E2', 'TOTAL');
        $objPhpexcel->getActiveSheet()->getRowDimension('2')->setRowHeight(25);
        $objPhpexcel->getActiveSheet()->getStyle('A2:E2')->getFont()->setBold(TRUE);
        $objPhpexcel->getActiveSheet()->getStyle('C1')->getFont()->setBold(TRUE)
                ->setName('Calibri')->setSize(16)->getColor()->setRGB('660066');
        $objPhpexcel->getActiveSheet()->getStyle('A2:E2')
                ->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID);
        $objPhpexcel->getActiveSheet()->getStyle('A2:E2')
                ->getFill()->getStartColor()->setRGB('D1C5E2');
        $objPhpexcel->getActiveSheet()->getStyle('A')->getNumberFormat()
                ->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_NUMBER);

        for ($i = 0; $i < count($datosDecode); $i++) {
            $codigo_pro = $datosDecode[$i]->pro_cod;
            $sku_pro = $datosDecode[$i]->pro_sku;
            $desc_pro = $datosDecode[$i]->pro_desc;
            $ub_pro = $datosDecode[$i]->pro_ubicacion;
            $total_pro = $datosDecode[$i]->total;

            $objPhpexcel->getActiveSheet()->setCellValue('A' . $fila, $codigo_pro);
            $objPhpexcel->getActiveSheet()->setCellValue('B' . $fila, $sku_pro);
            $objPhpexcel->getActiveSheet()->setCellValue('C' . $fila, $desc_pro);
            $objPhpexcel->getActiveSheet()->setCellValue('D' . $fila, $ub_pro);
            $objPhpexcel->getActiveSheet()->setCellValue('E' . $fila, $total_pro);

            $fila++;
        }

        $objPhpexcel->getActiveSheet()->getColumnDimension('A')->setWidth(17);
        $objPhpexcel->getActiveSheet()->getColumnDimension('B')->setWidth(23);
        $objPhpexcel->getActiveSheet()->getColumnDimension('C')->setWidth(83);
        $objPhpexcel->getActiveSheet()->getColumnDimension('D')->setWidth(12);
        $objPhpexcel->getActiveSheet()->getColumnDimension('E')->setWidth(9);

        if (isset($_SESSION["adminlogi"])) {
            $writer = new Xlsx($objPhpexcel);
            $writer->save('../../../Files/Reporte_Stock_adm/' . $num_doc_client . '_' . $tipo_docum_cli . '/Reporte_Stock_' . $nom_cli . '_' . $numero_suc . '.xlsx');
            echo $num_doc_client . '_' . $tipo_docum_cli . '/Reporte_Stock_' . $nom_cli . '_' . $numero_suc;
        } else {
            $writer = new Xlsx($objPhpexcel);
            $writer->save('../../../Files/Reporte_Stock/' . $num_doc_client . '_' . $tipo_docum_cli . '/Reporte_Stock_' . $nom_cli . '_' . $numero_suc . '.xlsx');
            echo $num_doc_client . '_' . $tipo_docum_cli . '/Reporte_Stock_' . $nom_cli . '_' . $numero_suc;
        }
    } else {
        echo 1;
    }
} else {
    header("location../");
}    