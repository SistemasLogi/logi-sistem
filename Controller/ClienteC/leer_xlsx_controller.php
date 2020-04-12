<?php

session_start();
require '../../Class/phpspreadsheet/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

require '../../config.php';

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
//        if ($objDet_rep_vo->getNum_doc() == NULL || $objDet_rep_vo->getNum_doc() == "") {
//            $objDet_rep_vo->setNum_doc(0);
//        }
//        if ($objDet_rep_vo->getFec_solicitud() == NULL || $objDet_rep_vo->getFec_solicitud() == "") {
//            $objDet_rep_vo->setFec_solicitud('01-01-1111');
//        }
//        if ($objDet_rep_vo->getHora_solic() == NULL || $objDet_rep_vo->getHora_solic() == "") {
//            $objDet_rep_vo->setHora_solic("00:01:01");
//        }

        $datos_insert[$i - 2] = "(null,'" . $obj_env_vo->getNum_guia() . "'," . $obj_env_vo->getNum_oeden_serv() . ","
                . "" . $obj_env_vo->getId_tipo_envio() . ",null,null,null,null,'" . $obj_env_vo->getContenido() . "',"
                . "null,'" . $obj_env_vo->getDireccion() . "','" . $obj_env_vo->getTelefono() . "',"
                . "'" . $obj_env_vo->getCiudad_dest() . "','" . $obj_env_vo->getDepto_dest() . "','" . $obj_env_vo->getDirec_remite() . "',"
                . "'" . $obj_env_vo->getCiud_remite() . "')";
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
            echo "OK" . " " . $contador;
            echo '<br>';
        } else {
            echo "<div class='text-center' style='color: #990000;'>Error entre las lineas " . ($contador - $num_registros) . " y " . $contador . "</div>";
            echo '<br>';
        }
    }
} else {
    header("location../");
}

