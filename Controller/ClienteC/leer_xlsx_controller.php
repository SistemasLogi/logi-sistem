<?php

session_start();
require '../../Class/phpspreadsheet/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

require '../../config.php';

date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");

$xls_name = '../../Files/Temp/' . $_SESSION["numero_doc"] . '_' . $_SESSION["tipo_doc"] . '.xlsx';

$spreadsheet = IOFactory::load($xls_name);
$sheetData = $spreadsheet->getActiveSheet()->toArray(null, true, true, true);

if ($_POST) {

    $obj_env_vo = new Envio_VO();
    $orden_servi_dao = new Orden_serv_DAO();
    $json_ultima_os = json_encode($orden_servi_dao->consultaUltimaOS($_SESSION["tipo_doc"], $_SESSION["numero_doc"]));
    $array = json_decode($json_ultima_os);

    $sql = "INSERT INTO envio VALUES "; //cabecera del insert
    $id_os_cliente = $array[0]->os_id; //numero de orden de servicio

    $reg_buenos = 0;
    $reg_error = 0;

    for ($i = 2; $i <= count($sheetData); $i++) {

        $obj_env_vo->setNum_guia($sheetData[$i]['A']);
        $obj_env_vo->setNum_oeden_serv($id_os_cliente);
        $obj_env_vo->setId_tipo_envio(1);
        $obj_env_vo->setDireccion($sheetData[$i]['C']);
        $obj_env_vo->setCiudad_dest($sheetData[$i]['D']);
        $obj_env_vo->setDepto_dest($sheetData[$i]['E']);
        $obj_env_vo->setTelefono($sheetData[$i]['F']);
        $obj_env_vo->setContenido($sheetData[$i]['H']);
        $obj_env_vo->setDirec_remite($sheetData[$i]['I']);
        $obj_env_vo->setCiud_remite($sheetData[$i]['J']);
        $obj_env_vo->setFec_programado($fecha_hora_now);

//        $objDet_rep_vo->setId($id_rep);
//        $objDet_rep_vo->setNum_doc($sheetData[$i]['A']);
//        $objDet_rep_vo->setFec_solicitud($sheetData[$i]['B']);
//        $objDet_rep_vo->setHora_solic($sheetData[$i]['C']);
//        if ($sheetData[$i]['K'] == 'SI' || $sheetData[$i]['K'] == 'NO' || $sheetData[$i]['K'] == 'P') {
//            $objDet_rep_vo->setAprobado($sheetData[$i]['K']);
//            $aprob = $sheetData[$i]['K'];
//        } else {
//            $objDet_rep_vo->setAprobado("PDE");
//            $aprob = "PDE";
//        }
//        $objDet_rep_vo->setObservacion($sheetData[$i]['L']);
//        $fecha = $sheetData[$i]['B'];
//        $nombre = $sheetData[$i]['D'];
//        $codigo = $sheetData[$i]['E'];
//        $hr = $sheetData[$i]['F'];
//        $fec_ini = $sheetData[$i]['G'];
//        $fec_fin = $sheetData[$i]['H'];
//        $descrip = $sheetData[$i]['J'];
//        $observ = $sheetData[$i]['L'];

        if (empty($obj_env_vo->getNum_guia()) || empty($obj_env_vo->getDireccion()) || empty($obj_env_vo->getCiudad_dest()) || empty($obj_env_vo->getDepto_dest())) {
            if (empty($obj_env_vo->getNum_guia())) {
                $datos_errados[$reg_error] = "Error en la linea " . $i . " en número de guía";
            }
            if (empty($obj_env_vo->getDireccion())) {
                $datos_errados[$reg_error] = "Error en la linea " . $i . " en dirección destino";
            }
            if (empty($obj_env_vo->getCiudad_dest())) {
                $datos_errados[$reg_error] = "Error en la linea " . $i . " en ciudad destino";
            }
            if (empty($obj_env_vo->getDepto_dest())) {
                $datos_errados[$reg_error] = "Error en la linea " . $i . " en departamento destino";
            }

            $reg_error++;
        } else {
            $datos_insert[$reg_buenos] = "(null,'" . $obj_env_vo->getNum_guia() . "'," . $obj_env_vo->getNum_oeden_serv() . ","
                    . "" . $obj_env_vo->getId_tipo_envio() . ",null,null,null,null,'" . $obj_env_vo->getContenido() . "',"
                    . "null,'" . $obj_env_vo->getDireccion() . "','" . $obj_env_vo->getTelefono() . "',"
                    . "'" . $obj_env_vo->getCiudad_dest() . "','" . $obj_env_vo->getDepto_dest() . "','" . $obj_env_vo->getDirec_remite() . "',"
                    . "'" . $obj_env_vo->getCiud_remite() . "','" . $obj_env_vo->getFec_programado() . "',null,null,null,"
                    . "null,null,null,null,null,null)";

            $reg_buenos++;
        }
    }
    $sentencia = "";
    $miniarray = array_chunk($datos_insert, 500);
    $num_fracciones = count($miniarray);
//            $num_registros = count($miniarray[3]);
//            echo $num_registros - 1;
//            $array_num = count($datos_insert);
    $contador = 0;

    for ($i = 0; $i < $num_fracciones; $i++) {
        $sentencia = $sql;
        $num_registros = count($miniarray[$i]);
        for ($j = 0; $j < $num_registros; $j++) {
            $contador++;
            if ($j == ($num_registros - 1)) {
                $sentencia .= $miniarray[$i][$j] . ";";
//                        echo $miniarray[$i][$j] . ";";
//                        echo '<br>';
            } else {
                $sentencia .= $miniarray[$i][$j] . ",";
            }
        }
        $BDP = new MySQL();
        $in = $BDP->execute_query($sentencia);
        if ($in == 1) {
//            echo "OK" . " " . $contador;
//            echo '<br>';
        } else {
            echo "<div class='text-center' style='color: #990000;'>Error entre las lineas " . ($contador - $num_registros) . " y " . $contador . "</div>";
            echo '<br>';
        }
    }

    if (empty($datos_errados)) {
        echo '<strong>Sin errores de integridad.</strong>';
    } else {

        echo'<ul class="list-group">';

        foreach ($datos_errados as &$valor) {
            echo '<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: rgba(220, 53, 69, 0.3);">'
            . '<span>' . $valor . '</span></li>';
        }
        echo '</ul>';
    }
    echo "<strong>&nbsp;&nbsp;Total lineas " . $contador . "</strong>";
    require './consulta_env_ingresados_controller.php';
} else {
    header("location../");
}

