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

    $cod_pro = $_POST["inputCodProd"];
    $existencia = $_POST["inputExistencia"];
    $ubicacion = $_POST["inputUbicacion"];
    $fech_ini = $_POST["inputFechInicial"];
    $fech_fin = $_POST["inputFechFinal"];

    $datosKardex = json_encode($product_dao->consultaTarjetaKardex($cod_pro, " WHERE TM.ent_fecha BETWEEN '" . $fech_ini . "' AND '" . $fech_fin . "';"));
    $datosDecode = json_decode($datosKardex);

    $fila = 5;

    if (!empty($datosKardex)) {

        $numero_suc = $datosDecode[0]->suc_num_id;
        $descripcion_prod = $datosDecode[0]->pro_desc;
        $sku_prod = $datosDecode[0]->pro_sku;

        if (isset($_SESSION["adminlogi"])) {
            //Crear carpeta por usuario
            $directorioReport = '../../../Files/Reporte_Kardex_adm/' . $numero_suc . '/';
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
            $directorioReport = '../../../Files/Reporte_Kardex/' . $numero_suc . '/';
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
        $drawing->setHeight(80);


        $objPhpexcel = new Spreadsheet();
        $objPhpexcel->getProperties()->setCreator("LOGI")->setDescription("Reporte Kardex ");
        $objPhpexcel->setActiveSheetIndex(0);
        $objPhpexcel->getActiveSheet()->setTitle("Kardex Cliente");
        $objPhpexcel->getActiveSheet()->mergeCells('B1:E1');
        $objPhpexcel->getActiveSheet()->mergeCells('B2:C2');
        $objPhpexcel->getActiveSheet()->mergeCells('B3:C3');
        $objPhpexcel->getActiveSheet()->getRowDimension('1')->setRowHeight(60);
        $drawing->setWorksheet($objPhpexcel->getActiveSheet());
        $objPhpexcel->getActiveSheet()->getStyle('B1')
                ->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
        $objPhpexcel->getActiveSheet()->getStyle('B1')
                ->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
        $objPhpexcel->getActiveSheet()->getStyle('A2:E2')
                ->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
        $objPhpexcel->getActiveSheet()->getStyle('A2:E2')
                ->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
        $objPhpexcel->getActiveSheet()->getStyle('A3:E3')
                ->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
        $objPhpexcel->getActiveSheet()->getStyle('A3:E3')
                ->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

//        $styleArray = [
//            'borders' => [
//                'outline' => [
//                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
////                    'color' => ['argb' => '00000000'],
//                ],
//            ],
//        ];
//
//        $objPhpexcel->getStyle('A1:E4')->applyFromArray($styleArray);

        $objPhpexcel->getActiveSheet()->getCell('B1')->setValue($descripcion_prod);
        $objPhpexcel->getActiveSheet()->getStyle('B1')->getAlignment()->setWrapText(true);

        $objPhpexcel->getActiveSheet()->setCellValue('A2', 'CODIGO');
        $objPhpexcel->getActiveSheet()->setCellValue('B2', $cod_pro);
        $objPhpexcel->getActiveSheet()->setCellValue('D2', 'UBICACIÓN');
        $objPhpexcel->getActiveSheet()->setCellValue('E2', $ubicacion);
        $objPhpexcel->getActiveSheet()->setCellValue('A3', 'SKU');
        $objPhpexcel->getActiveSheet()->setCellValue('B3', $sku_prod);
        $objPhpexcel->getActiveSheet()->setCellValue('D3', 'EXISTENCIA');
        $objPhpexcel->getActiveSheet()->setCellValue('E3', $existencia);

        $objPhpexcel->getActiveSheet()->setCellValue('A4', 'FECHA');
        $objPhpexcel->getActiveSheet()->setCellValue('B4', 'HORA');
        $objPhpexcel->getActiveSheet()->setCellValue('C4', 'DESCRIPCIÓN');
        $objPhpexcel->getActiveSheet()->setCellValue('D4', 'ENTRADAS');
        $objPhpexcel->getActiveSheet()->setCellValue('E4', 'SALIDAS');
        $objPhpexcel->getActiveSheet()->getRowDimension('4')->setRowHeight(25);
        $objPhpexcel->getActiveSheet()->getStyle('A2:E4')->getFont()->setBold(TRUE);
        $objPhpexcel->getActiveSheet()->getStyle('B1')->getFont()->setBold(TRUE)
                ->setName('Arial')->setSize(12)->getColor()->setRGB('660066');
        $objPhpexcel->getActiveSheet()->getStyle('A4:E4')
                ->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID);
        $objPhpexcel->getActiveSheet()->getStyle('A4:E4')
                ->getFill()->getStartColor()->setRGB('D1C5E2');
        $objPhpexcel->getActiveSheet()->getStyle('B2')->getNumberFormat()
                ->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_NUMBER);
        $objPhpexcel->getActiveSheet()->getStyle('A' . $fila)
                ->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT);

        for ($i = 0; $i < count($datosDecode); $i++) {
            $porciones = explode(" ", $datosDecode[$i]->ent_fecha);

            $fecha_mov = $porciones[0];
            $hora_mov = $porciones[1];
            $det_venta = $datosDecode[$i]->venta;
            $movimiento = $datosDecode[$i]->movimiento;

            if ($movimiento == 1) {
                $entrada = $datosDecode[$i]->ent_cantidad;
                $salida = "";
            } elseif ($movimiento == 2) {
                $salida = $datosDecode[$i]->ent_cantidad;
                $entrada = "";
            }

            $objPhpexcel->getActiveSheet()->setCellValue('A' . $fila, $fecha_mov);
            $objPhpexcel->getActiveSheet()->setCellValue('B' . $fila, $hora_mov);
            $objPhpexcel->getActiveSheet()->setCellValue('C' . $fila, $det_venta);
            $objPhpexcel->getActiveSheet()->setCellValue('D' . $fila, $entrada);
            $objPhpexcel->getActiveSheet()->setCellValue('E' . $fila, $salida);
            $objPhpexcel->getActiveSheet()->getStyle('D' . $fila)
                    ->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID);
            $objPhpexcel->getActiveSheet()->getStyle('D' . $fila)
                    ->getFill()->getStartColor()->setRGB('BDEBCF');
            $objPhpexcel->getActiveSheet()->getStyle('E' . $fila)
                    ->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID);
            $objPhpexcel->getActiveSheet()->getStyle('E' . $fila)
                    ->getFill()->getStartColor()->setRGB('FEC8C8');
            $objPhpexcel->getActiveSheet()->getStyle('A' . $fila)->getNumberFormat()
                    ->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_DATE_XLSX15);
            $objPhpexcel->getActiveSheet()->getStyle('B' . $fila)->getNumberFormat()
                    ->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_DATE_TIME1);

            $fila++;
        }

        $objPhpexcel->getActiveSheet()->getColumnDimension('A')->setWidth(32);
        $objPhpexcel->getActiveSheet()->getColumnDimension('B')->setWidth(14);
        $objPhpexcel->getActiveSheet()->getColumnDimension('C')->setWidth(50);
        $objPhpexcel->getActiveSheet()->getColumnDimension('D')->setWidth(16);
        $objPhpexcel->getActiveSheet()->getColumnDimension('E')->setWidth(16);

        if (isset($_SESSION["adminlogi"])) {
            $writer = new Xlsx($objPhpexcel);
            $writer->save('../../../Files/Reporte_Kardex_adm/' . $numero_suc . '/Kardex_suc_' . $numero_suc . '.xlsx');
            echo 'Reporte_Kardex_adm/' . $numero_suc . '/Kardex_suc_' . $numero_suc;
        } else {
            $writer = new Xlsx($objPhpexcel);
            $writer->save('../../../Files/Reporte_Kardex/' . $numero_suc . '/Kardex_suc_' . $numero_suc . '.xlsx');
            echo 'Reporte_Kardex/' . $numero_suc . '/Kardex_suc_' . $numero_suc;
        }
    } else {
        echo 1;
    }
} else {
    header("location../");
}