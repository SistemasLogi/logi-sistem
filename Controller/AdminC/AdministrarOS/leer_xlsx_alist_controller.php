<?php

session_start();
require '../../../Class/phpspreadsheet/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

require '../../../config.php';

date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");

if ($_POST) {

    $xls_name = '../../../Files/Temp_alist_adm/' . $_SESSION["num_doc_cli_adm_alst"] . '_' . $_SESSION["td_cli_adm_alst"] . '/' . $_SESSION["name_xlsx"] . '.xlsx';

    $spreadsheet = IOFactory::load($xls_name);
    $sheetData = $spreadsheet->getActiveSheet()->toArray(null, true, true, true);
    $valor = $_POST["valor"];
    if ($sheetData[1]['A'] == "Guia" && $sheetData[1]['B'] == "No venta" && $sheetData[1]['C'] == "SKU" && $sheetData[1]['D'] == "Cantidad" && $sheetData[1]['E'] == "Operador") {

        $or_servi_dao = new Orden_serv_DAO();
        $or_servi_vo = new Orden_serv_VO();

        $or_servi_vo->setCod_ciudad(1); //predeterminado Bogota
        $or_servi_vo->setDireccion($_SESSION["direccion_adm_alst"]);
        $or_servi_vo->setPer_contacto('');
        $or_servi_vo->setTelefono($_SESSION["tel_adm_alst"]);
        $or_servi_vo->setTipo_env_id(1); //predeterminado 1 mensajeria
        $or_servi_vo->setCli_docum($_SESSION["num_doc_cli_adm_alst"]);
        $or_servi_vo->setCli_id($_SESSION["td_cli_adm_alst"]);

        $or_servi_vo->setTipo_serv_id($valor); //parametro por post

        $or_servi_vo->setObservacion('');

        $numero_suc = $_SESSION["num_suc_adm_alst"];

        if ($or_servi_dao->insertarOrden_serv($or_servi_vo) == 1) {

            $es_x_serv_dao = new Est_x_serv_DAO();
            $es_x_serv_vo = new Est_x_serv_VO();

            $json_id_os = json_encode($or_servi_dao->consultaUltimaOS($or_servi_vo->getCli_id(), $or_servi_vo->getCli_docum()));

            if (!empty($json_id_os)) {
                $os_id = json_decode($json_id_os);

                $es_x_serv_vo->setOrden_id($os_id[0]->os_id);
                $es_x_serv_vo->setEstado_id(5); //predefinido 5 picking            
                $es_x_serv_vo->setFecha_hora($_SESSION["fecha_adm_alst"]);
                $es_x_serv_vo->setNovedad("");
                $es_x_serv_vo->setTd_mensajero(1); //cc usuario global LOGI
                $es_x_serv_vo->setNum_doc_mensajero(9874123652); //num predefinido usuario global LOGI

                if ($es_x_serv_dao->insertar_est_x_os($es_x_serv_vo) == 1) {
                    if (!empty($numero_suc)) {
                        $or_servi_dao->insertarOS_x_SUC($os_id[0]->os_id, $numero_suc);
                    }
                    $aenvio_vo = new AEnvio_VO();
                    $aenvio_dao = new AEnvio_DAO();

                    $aenvio_vo->setAenv_guia($sheetData[2]['A']);
                    $aenvio_vo->setAenv_venta($sheetData[2]['B']);
                    $aenvio_vo->setAenv_os_id($os_id[0]->os_id);
                    $aenvio_vo->setAenv_operador_id($sheetData[2]['Y']);
                    $aenvio_vo->setAenv_cantidad(1); //**predeterminado 1 por guia
                    $aenvio_vo->setAenv_nombre($sheetData[2]['I']);
                    $aenvio_vo->setAenv_direccion($sheetData[2]['J']);
                    $aenvio_vo->setAenv_telefono($sheetData[2]['K']);
                    $aenvio_vo->setAenv_ciudad($sheetData[2]['Q']);
                    $aenvio_vo->setAenv_depto($sheetData[2]['R']);
                    $aenvio_vo->setAenv_observacion($sheetData[2]['F']);
                    $aenvio_vo->setAenv_valor_flet(0);
                    $aenvio_dao->insertarAlistEnvio($aenvio_vo); //guarda la primera fila del xlsx

                    $guia_num = $sheetData[2]['A'];

                    $prod_dao = new Producto_DAO();

                    $sql_salidas_temp = "INSERT INTO salidas_prod_temp VALUES "; //cabecera del insert
                    $reg_tsalidas_temp = "";
                    $no_existe = 0;
                    for ($i = 2; $i <= count($sheetData); $i++) {

                        $dato_prod = json_encode($prod_dao->consultaProd_x_sku($sheetData[$i]['C']));

                        if (!empty($dato_prod)) {
                            $dato_prod_dec = json_decode($dato_prod);
                            $observ = "";
                            $reg_tsalidas_temp .= "(null, '" . $fecha_hora_now . "', " . $numero_suc . ", "
                                    . "'" . $dato_prod_dec[0]->pro_cod . "', '" . $sheetData[$i]['A'] . "', "
                                    . "" . $sheetData[$i]['B'] . ", " . $sheetData[$i]['D'] . ", '" . $observ . "', "
                                    . "'" . $sheetData[$i]['I'] . "', '" . $sheetData[$i]['J'] . "', '" . $sheetData[$i]['K'] . "', "
                                    . "" . $sheetData[$i]['G'] . ", " . $sheetData[$i]['Z'] . ", " . $sheetData[$i]['L'] . ", "
                                    . "" . $sheetData[$i]['M'] . ", " . $sheetData[$i]['N'] . ", " . $sheetData[$i]['O'] . ", "
                                    . "" . $sheetData[$i]['P'] . ", '" . $sheetData[$i]['Q'] . "', '" . $sheetData[$i]['R'] . "', "
                                    . "'" . $sheetData[$i]['S'] . "', " . $sheetData[$i]['T'] . ", '" . $sheetData[$i]['U'] . "', "
                                    . "" . $sheetData[$i]['V'] . ", " . $sheetData[$i]['W'] . ", " . $sheetData[$i]['X'] . "),";

                            if ($guia_num == $sheetData[$i]['A']) {
                                
                            } else {
                                $guia_num = $sheetData[$i]['A'];

                                $aenvio_vo->setAenv_guia($sheetData[$i]['A']);
                                $aenvio_vo->setAenv_venta($sheetData[$i]['B']);
                                $aenvio_vo->setAenv_os_id($os_id[0]->os_id);
                                $aenvio_vo->setAenv_operador_id($sheetData[$i]['Y']);
                                $aenvio_vo->setAenv_cantidad(1); //**predeterminado 1 por guia
                                $aenvio_vo->setAenv_nombre($sheetData[$i]['I']);
                                $aenvio_vo->setAenv_direccion($sheetData[$i]['J']);
                                $aenvio_vo->setAenv_telefono($sheetData[$i]['K']);
                                $aenvio_vo->setAenv_ciudad($sheetData[$i]['Q']);
                                $aenvio_vo->setAenv_depto($sheetData[$i]['R']);
                                $aenvio_vo->setAenv_observacion($sheetData[$i]['F']);
                                $aenvio_vo->setAenv_valor_flet(0);

                                $aenvio_dao->insertarAlistEnvio($aenvio_vo);
                            }
                        } else {
                            $no_venta[$no_existe] = $sheetData[$i]['B'];
                            $no_sku[$no_existe] = $sheetData[$i]['C'];
                            $no_existe++;
                        }
                    }
                    //***consultar e insertar estados en est_aenv****
                    $obj_est_x_aenvio_dao = new Est_x_aenv_DAO();
                    $novedad = "";

                    $obj_est_x_aenvio_dao->insertarEstados_x_AEnvio(1, $_SESSION["fecha_adm_alst"], $novedad, $os_id[0]->os_id); //El primer parametro es el codigo del estado
                    //***insertar datos en salidas temp****
                    $reg_tsal_temp = trim($reg_tsalidas_temp, ",");
                    $reg_tsal_temp .= ";";
                    $prod_dao->insertarBloqueEnTabla($sql_salidas_temp . $reg_tsal_temp);
                } else {
                    //*****Accion si no guarda estado por orden***
                    echo "<div class='alert alert-dismissible alert-danger'>"
                    . "<strong>Error 4, No se pudo guardar el estado de la orden!</strong>"
                    . "</div>";
                }
            } else {
                //*********Accion si no devuelve la consulta de ultima orden de servicio*******
                echo "<div class='alert alert-dismissible alert-danger'>"
                . "<strong>Error 3, La consulta devolvio un valor nulo!</strong>"
                . "</div>";
            }
        } else {
            //*******Accion si no guarda orden de servicio******
            echo "<div class='alert alert-dismissible alert-danger'>"
            . "<strong>Error 2, No se pudo guardar la orden de servicio!</strong>"
            . "</div>";
        }
        //***Accion exitosa de ejecucion***

        if (!empty($no_venta)) {
            echo'<div class="alert alert-dismissible alert-danger border-danger" style="border-radius: 0.5rem;">';
            echo'<div class="table-responsive">'
            . '<table class="table table-hover table-sm table-fixed">'
            . '<thead><tr class="table-warning">'
            . '<th scope="col">Nº VENTA</th>'
            . '<th scope="col">SKU</th>'
            . '<th scope="col">NOVEDAD</th>'
            . '</tr></thead><tbody>';

            for ($i = 0; $i < count($no_venta); $i++) {
                echo '<tr class="table-danger"><td>' . $no_venta[$i] . '</td>';
                echo '<td>' . $no_sku[$i] . '</td>';
                echo '<td class="enlace actuestos">SKU No Existe en la BD</td></tr>';
            }
            echo '</tbody></table></div>Las ventas registradas en esta tabla no fueron ingresadas a la BD, para realizar correcciones deben ser ingresadas en una orden nueva</div>';
        }

        echo "Carga exitosa!!<div class='alert alert-dismissible alert-primary'>"
        . "<strong>Descargue </strong> <a class='alert-link enlace'>Aqui documento en PDF</a>"
        . "</div>";
        echo'<script> $("#formMasAlistamiento").hide(); </script>';
        echo'<script> cargaProdAlistamiento(); </script>';
        //****************************************///***************///*************************///*************
    } else {
        //***Accion si plantilla no coincide**//
        echo "<div class='alert alert-dismissible alert-danger'>"
        . "<strong>Error 5, La plantilla xlsx no es la correcta!</strong>"
        . "</div>";
    }
//    
} else {
    header("location../");
}