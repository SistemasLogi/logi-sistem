<?php

session_start();
require '../../Class/phpspreadsheet/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

require '../../config.php';

date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");

if (isset($_SESSION["adminlogi"])) {

    $xls_name = '../../Files/Temp_os_adm/' . $_SESSION["num_doc_cli_adm"] . "_" . $_SESSION["td_cli_adm"] . '.xlsx';

    $spreadsheet = IOFactory::load($xls_name);
    $sheetData = $spreadsheet->getActiveSheet()->toArray(null, true, true, true);

    if ($_POST) {

        if ($sheetData[1]['B'] == "Nombre Destinatario" && $sheetData[1]['C'] == "Direccion Destinatario" && $sheetData[1]['D'] == "Ciudad Destino" && $sheetData[1]['E'] == "Departamento Destino") {

            $obj_env_vo = new Envio_VO();
            $orden_servi_dao = new Orden_serv_DAO();
            $json_ultima_os = json_encode($orden_servi_dao->consultaUltimaOS($_SESSION["td_cli_adm"], $_SESSION["num_doc_cli_adm"]));
            $array = json_decode($json_ultima_os);

            $sql = "INSERT INTO envio VALUES "; //cabecera del insert
            $id_os_cliente = $array[0]->os_id; //numero de orden de servicio

            $reg_buenos = 0;
            $reg_error = 0;

            for ($i = 2; $i <= count($sheetData); $i++) {

                $obj_env_vo->setNum_guia($sheetData[$i]['A']);
                $obj_env_vo->setNum_orden_serv($id_os_cliente);
                $obj_env_vo->setCantidad(1); //para mensajeria y radicacion de documentos la cantidad de envios por guia siempre sera de 1
                $obj_env_vo->setPeso_kg(0);
                $obj_env_vo->setAlto_cm(0);
                $obj_env_vo->setAncho_cm(0);
                $obj_env_vo->setLargo_cm(0);
                $obj_env_vo->setTrayecto("");
                $obj_env_vo->setNombre(str_replace("'", '\\\'', $sheetData[$i]['B']));
                $obj_env_vo->setDireccion($sheetData[$i]['C']);
                $obj_env_vo->setCiudad_dest($sheetData[$i]['D']);
                $obj_env_vo->setDepto_dest($sheetData[$i]['E']);
                $obj_env_vo->setTelefono($sheetData[$i]['F']);
                $obj_env_vo->setContenido($sheetData[$i]['G']);
                $obj_env_vo->setNovedad($sheetData[$i]['H']);
                $obj_env_vo->setValor_declarado(0);

                if (empty($obj_env_vo->getNombre()) || empty($obj_env_vo->getDireccion()) || empty($obj_env_vo->getCiudad_dest()) || empty($obj_env_vo->getDepto_dest())) {
                    if (empty($obj_env_vo->getNombre())) {
                        $datos_errados[$reg_error] = "Error en la linea " . $i . " en nombre destinatario";
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
                    $datos_insert[$reg_buenos] = "(null,'" . $obj_env_vo->getNum_guia() . "'," . $obj_env_vo->getNum_orden_serv() . ","
                            . "" . $obj_env_vo->getCantidad() . "," . $obj_env_vo->getPeso_kg() . "," . $obj_env_vo->getAlto_cm() . ","
                            . "" . $obj_env_vo->getAncho_cm() . "," . $obj_env_vo->getLargo_cm() . ",'" . $obj_env_vo->getTrayecto() . "',"
                            . "'" . $obj_env_vo->getNombre() . "','" . $obj_env_vo->getDireccion() . "','" . $obj_env_vo->getTelefono() . "',"
                            . "'" . $obj_env_vo->getCiudad_dest() . "','" . $obj_env_vo->getDepto_dest() . "',"
                            . "'" . $obj_env_vo->getNovedad() . "','" . $obj_env_vo->getContenido() . "'," . $obj_env_vo->getValor_declarado() . ")";

                    $reg_buenos++;
                }
            }

            if (empty($datos_errados)) {

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
//            echo $sentencia;
                    if ($in == 1) {
//            echo "OK" . " " . $contador;
//            echo '<br>';
                    } else {
                        echo "<div class='text-center' style='color: #990000;'>Error entre las lineas " . ($contador - $num_registros) . " y " . $contador . "</div>";
                        echo '<br>';
                    }
                }

                echo '<strong>Envios ingresados correctamente.</strong>';
                echo "<strong>&nbsp;&nbsp;Total " . $contador . " numeros de Guia creados</strong>";
                $est_x_env = new Estado_x_env_DAO();
                $est_x_env->insertarEstado_x_envio($id_os_cliente);

                $envio_dao = new Envio_DAO();
                $env_ing = json_encode($envio_dao->consultaEnvIng_x_os($id_os_cliente, $_SESSION["td_cli_adm"], $_SESSION["num_doc_cli_adm"], 1));
                $array = json_decode($env_ing);
                require './consulta_env_ingresados_controller.php';
            } else {

                echo "<div class='col-lg-12' id='tablaEnv'><table class='table table-responsive-sm table-sm table-hover table-bordered table-fixed' id='tableErrores'><thead>"
                . "<tr class='table-light'>"
                . "<th scope='col'>ERROR ARCHIVO</th>"
                . "</tr></thead><tbody>";

                foreach ($datos_errados as &$valor) {
                    echo '<tr class="table-danger table-sm">';
                    echo '<td>' . $valor . '</td></tr>';
                }
                echo "</tbody></table></div>";
                echo "<strong>&nbsp;&nbsp;NO SE GUARDARON LOS DATOS, por favor corrija las lineas erradas y suba nuevamente el archivo.</strong>";
            }
        } else {
            echo "<div class='alert alert-dismissible alert-danger'>"
            . "<button type='button' class='close' data-dismiss='alert'>&times;</button>"
            . "<strong>El archivo no coincide con la base de datos, </strong>por favor diligencie la información solicitada en el archivo plantilla."
            . "</div>";
        }
//    
    } else {
        header("location../");
    }
} else {

    $xls_name = '../../Files/Temp/' . $_SESSION["numero_doc"] . '_' . $_SESSION["tipo_doc"] . '.xlsx';

    $spreadsheet = IOFactory::load($xls_name);
    $sheetData = $spreadsheet->getActiveSheet()->toArray(null, true, true, true);

    if ($_POST) {

        if ($sheetData[1]['B'] == "Nombre Destinatario" && $sheetData[1]['C'] == "Direccion Destinatario" && $sheetData[1]['D'] == "Ciudad Destino" && $sheetData[1]['E'] == "Departamento Destino") {

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
                $obj_env_vo->setNum_orden_serv($id_os_cliente);
                $obj_env_vo->setCantidad(1); //para mensajeria y radicacion de documentos la cantidad de envios por guia siempre sera de 1
                $obj_env_vo->setPeso_kg(0);
                $obj_env_vo->setAlto_cm(0);
                $obj_env_vo->setAncho_cm(0);
                $obj_env_vo->setLargo_cm(0);
                $obj_env_vo->setTrayecto("");
                $obj_env_vo->setNombre(str_replace("'", '\\\'', $sheetData[$i]['B']));
                $obj_env_vo->setDireccion($sheetData[$i]['C']);
                $obj_env_vo->setCiudad_dest($sheetData[$i]['D']);
                $obj_env_vo->setDepto_dest($sheetData[$i]['E']);
                $obj_env_vo->setTelefono($sheetData[$i]['F']);
                $obj_env_vo->setContenido($sheetData[$i]['G']);
                $obj_env_vo->setNovedad($sheetData[$i]['H']);
                $obj_env_vo->setValor_declarado(0);

                if (empty($obj_env_vo->getNombre()) || empty($obj_env_vo->getDireccion()) || empty($obj_env_vo->getCiudad_dest()) || empty($obj_env_vo->getDepto_dest())) {
                    if (empty($obj_env_vo->getNombre())) {
                        $datos_errados[$reg_error] = "Error en la linea " . $i . " en nombre destinatario";
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
                    $datos_insert[$reg_buenos] = "(null,'" . $obj_env_vo->getNum_guia() . "'," . $obj_env_vo->getNum_orden_serv() . ","
                            . "" . $obj_env_vo->getCantidad() . "," . $obj_env_vo->getPeso_kg() . "," . $obj_env_vo->getAlto_cm() . ","
                            . "" . $obj_env_vo->getAncho_cm() . "," . $obj_env_vo->getLargo_cm() . ",'" . $obj_env_vo->getTrayecto() . "',"
                            . "'" . $obj_env_vo->getNombre() . "','" . $obj_env_vo->getDireccion() . "','" . $obj_env_vo->getTelefono() . "',"
                            . "'" . $obj_env_vo->getCiudad_dest() . "','" . $obj_env_vo->getDepto_dest() . "',"
                            . "'" . $obj_env_vo->getNovedad() . "','" . $obj_env_vo->getContenido() . "'," . $obj_env_vo->getValor_declarado() . ")";

                    $reg_buenos++;
                }
            }

            if (empty($datos_errados)) {

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
//            echo $sentencia;
                    if ($in == 1) {
//            echo "OK" . " " . $contador;
//            echo '<br>';
                    } else {
                        echo "<div class='text-center' style='color: #990000;'>Error entre las lineas " . ($contador - $num_registros) . " y " . $contador . "</div>";
                        echo '<br>';
                    }
                }

                echo '<strong>Envios ingresados correctamente.</strong>';
                echo "<strong>&nbsp;&nbsp;Total " . $contador . " numeros de Guia creados</strong>";
                $est_x_env = new Estado_x_env_DAO();
                $est_x_env->insertarEstado_x_envio($id_os_cliente);

                $envio_dao = new Envio_DAO();
                $env_ing = json_encode($envio_dao->consultaEnvIng_x_os($id_os_cliente, $_SESSION["tipo_doc"], $_SESSION["numero_doc"], 9));
                $array = json_decode($env_ing);
                require './consulta_env_ingresados_controller.php';
            } else {

                echo "<div class='col-lg-12' id='tablaEnv'><table class='table table-responsive-sm table-sm table-hover table-bordered table-fixed' id='tableErrores'><thead>"
                . "<tr class='table-light'>"
                . "<th scope='col'>ERROR ARCHIVO</th>"
                . "</tr></thead><tbody>";

                foreach ($datos_errados as &$valor) {
                    echo '<tr class="table-danger table-sm">';
                    echo '<td>' . $valor . '</td></tr>';
                }
                echo "</tbody></table></div>";
                echo "<strong>&nbsp;&nbsp;NO SE GUARDARON LOS DATOS, por favor corrija las lineas erradas y suba nuevamente el archivo.</strong>";
            }
        } else {
            echo "<div class='alert alert-dismissible alert-danger'>"
            . "<button type='button' class='close' data-dismiss='alert'>&times;</button>"
            . "<strong>El archivo no coincide con la base de datos, </strong>por favor diligencie la información solicitada en el archivo plantilla."
            . "</div>";
        }
//    
    } else {
        header("location../");
    }
}
