<?php

session_start();
require '../../../Class/phpspreadsheet/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

require '../../../config.php';

date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
$fech_solo = date('Y-m-d');

if ($_POST) {

    $xls_name = '../../../Files/Temp_alist_adm/' . $_SESSION["num_doc_cli_adm_alst"] . '_' . $_SESSION["td_cli_adm_alst"] . '/' . $_SESSION["name_xlsx"] . '.xlsx';

    $spreadsheet = IOFactory::load($xls_name);
    $sheetData = $spreadsheet->getActiveSheet()->toArray(null, true, true, true);

    if ($sheetData[1]['A'] == "Guia" && $sheetData[1]['B'] == "No venta" && $sheetData[1]['C'] == "SKU" && $sheetData[1]['D'] == "Cantidad" && $sheetData[1]['E'] == "Operador") {

        $or_servi_dao = new Orden_serv_DAO();
        $or_servi_vo = new Orden_serv_VO();

        $or_servi_vo->setCod_ciudad(1); //predeterminado Bogota
        $or_servi_vo->setDireccion($_SESSION["direccion_adm_alst"]);
        $or_servi_vo->setPer_contacto('');
        $or_servi_vo->setTelefono($_SESSION["tel_adm_alst"]);
        $or_servi_vo->setTipo_env_id(1);
        $or_servi_vo->setCli_docum($_SESSION["num_doc_cli_adm_alst"]);
        $or_servi_vo->setCli_id($_SESSION["td_cli_adm_alst"]);

        $or_servi_vo->setTipo_serv_id(4); //Predifinido Alistamiento

        $or_servi_vo->setObservacion('');

        $numero_suc = $_SESSION["num_suc_adm_alst"];

        if ($or_servi_dao->insertarOrden_serv($or_servi_vo) == 1) {

            $es_x_serv_dao = new Est_x_serv_DAO();
            $es_x_serv_vo = new Est_x_serv_VO();

            $json_id_os = json_encode($or_servi_dao->consultaUltimaOS($or_servi_vo->getCli_id(), $or_servi_vo->getCli_docum()));

            if (!empty($json_id_os)) {
                $os_id = json_decode($json_id_os);

                $es_x_serv_vo->setOrden_id($os_id[0]->os_id);
                $es_x_serv_vo->setEstado_id(5); //predefinido 5 piking            
                $es_x_serv_vo->setFecha_hora($_SESSION["fecha_adm_alst"]);
                $es_x_serv_vo->setNovedad("");
                $es_x_serv_vo->setTd_mensajero(1); //cc usuario global LOGI
                $es_x_serv_vo->setNum_doc_mensajero(162534495867); //num predefinido usuario global LOGI

                if ($es_x_serv_dao->insertar_est_x_os($es_x_serv_vo) == 1) {
                    if (!empty($numero_suc)) {
                        $or_servi_dao->insertarOS_x_SUC($os_id[0]->os_id, $numero_suc);
                    }
                    $aenvio_vo = new AEnvio_VO();
                    $aenvio_dao = new AEnvio_DAO();

                    $aenvio_vo->setAenv_guia($sheetData[2]['A']);
                    $aenvio_vo->setAenv_os_id($os_id[0]->os_id);
                    $aenvio_vo->setAenv_operador_id($sheetData[2]['H']);
                    $aenvio_vo->setAenv_cantidad(1); //**predeterminado 1 por guia

                    $aenvio_dao->insertarAlistEnvio($aenvio_vo);

                    $guia_num = $sheetData[2]['A'];

                    $prod_dao = new Producto_DAO();

                    $sql_salidas_temp = "INSERT INTO salidas_prod_temp VALUES "; //cabecera del insert
                    $reg_tsalidas_temp = "";
                    $no_existe = 0;
                    for ($i = 2; $i <= count($sheetData); $i++) {

                        $dato_prod = json_encode($prod_dao->consultaProd_x_sku($sheetData[$i]['C']));

                        if (!empty($dato_prod)) {
                            
                        } else {
                            $no_venta[$no_existe] = $sheetData[$i]['B'];
                            $no_sku[$no_existe] = $sheetData[$i]['C'];
                            $no_existe++;
                        }

                        $dato_prod_dec = json_decode($dato_prod);
                        $observ = "";
                        $reg_tsalidas_temp .= "('" . $fecha_hora_now . "', " . $numero_suc . ", "
                                . "'" . $dato_prod_dec[0]->pro_cod . "', " . $sheetData[$i]['D'] . ", "
                                . "" . $sheetData[$i]['A'] . ", " . $sheetData[$i]['B'] . ", '" . $observ . "'),";

                        if ($guia_num == $sheetData[$i]['A']) {
                            
                        } else {
                            $guia_num = $sheetData[$i]['A'];

                            $aenvio_vo->setAenv_guia($sheetData[$i]['A']);
                            $aenvio_vo->setAenv_os_id($os_id[0]->os_id);
                            $aenvio_vo->setAenv_operador_id($sheetData[$i]['H']);
                            $aenvio_vo->setAenv_cantidad(1); //**predeterminado 1 por guia

                            $aenvio_dao->insertarAlistEnvio($aenvio_vo);
                        }
                    }
                    //***consultar e insertar estados en est_aenv****
                    $obj_est_x_aenvio_dao = new Est_x_aenv_DAO();
                    $novedad = "";

                    $obj_est_x_aenvio_dao->insertarEstados_x_AEnvio(1, $_SESSION["fecha_adm_alst"], $novedad, $os_id[0]->os_id);

                    //***insertar datos en salidas temp****
                    $reg_tsal_temp = trim($reg_tsalidas_temp, ",");
                    $reg_tsal_temp .= ";";
                    $prod_dao->insertarBloqueEnTabla($sql_salidas_temp . $reg_tsal_temp);
                } else {
                    //*****Accion si no guarda estado por orden***
                }
            } else {
                //*********Accion si no devuelve la consulta de ultima orden de servicio*******
            }
        } else {
            //*******Accion si no guarda orden de servicio******
        }
        echo 1;
        //****************************************///***************///*************************///*************
    }
//    
} else {
    header("location../");
}