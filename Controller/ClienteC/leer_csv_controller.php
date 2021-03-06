<?php

session_start();
require '../../config.php';

date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");

if ($_POST) {

    header("Content-Type: text/html;charset=utf-8");

//        $usu_vo = new Usuarios_VO();
//        $usu_dao = new Usuarios_DAO();

    $csv_name = '../../Files/Temp/' . $_SESSION["numero_doc"] . '_' . $_SESSION["tipo_doc"] . '.csv';

//    $ruta_fichero = "../../Archivos/Program/" . $_FILES["txtnameformProgMasiva"]["name"];
    if (!file_exists($csv_name)) {
        echo "No existe un archivo para leer";
    } else {

        $obj_env_vo = new Envio_VO();
        $orden_servi_dao = new Orden_serv_DAO();
        $json_ultima_os = json_encode($orden_servi_dao->consultaUltimaOS($_SESSION["tipo_doc"], $_SESSION["numero_doc"]));
        $array = json_decode($json_ultima_os);

        $sql = "INSERT INTO envio VALUES "; //cabecera del insert
        $id_os_cliente = $array[0]->os_id; //numero de orden de servicio

        $recurso = fopen($csv_name, "rb");

        $contenidoLeido = fgets($recurso); //lectura de la linea de cabecera

        $i = 0;
        $reg_buenos = 0;
        $reg_error = 0;

        while ($contenidoLeido = fgets($recurso)) {

            $datosArray = utf8_encode($contenidoLeido);

            $variables = explode(";", $datosArray);

//            $fecha = $variables[0];
//            $cd = $variables[1];
//            $usuario_cod = $variables[2];
//            $hora_ini = $variables[4];
//            $hora_final = $variables[5];
//            $lugar_ini = $variables[6];
//            $lugar_fin = $variables[7];
//            $tabla = $variables[8];
//            $servicio = $variables[9];
//            $bus = $variables[10];
//            $observacion = $variables[11];

            $obj_env_vo->setNum_guia($variables[0]);
            $obj_env_vo->setNum_oeden_serv($id_os_cliente);
            $obj_env_vo->setId_tipo_envio(1);
            $obj_env_vo->setDireccion($variables[2]);
            $obj_env_vo->setCiudad_dest($variables[3]);
            $obj_env_vo->setDepto_dest($variables[4]);
            $obj_env_vo->setTelefono($variables[5]);
            $obj_env_vo->setContenido($variables[7]);
            $obj_env_vo->setDirec_remite($variables[8]);
            $obj_env_vo->setCiud_remite($variables[9]);
            $obj_env_vo->setFec_programado($fecha_hora_now);

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
//
//            $datos_insert[$i] = "(null,'" . $fecha . "','" . $cd . "'," . $usuario_cod . ",'" . $hora_ini . "',"
//                    . "'" . $hora_final . "','" . $lugar_ini . "','" . $lugar_fin . "','" . $tabla . "',"
//                    . "'" . $servicio . "','" . $bus . "','" . $observacion . "')";
//
            $i++;
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
        echo $datos_insert[147];
        echo $datos_insert[148];
        echo $datos_insert[150];
        echo $datos_insert[151];
        echo $datos_insert[152];
        fclose($recurso);
    }
} else {
    header("location ../");
}