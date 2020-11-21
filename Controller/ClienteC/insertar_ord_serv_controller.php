<?php

if ($_POST) {
    session_start();
    require '../../config.php';

    date_default_timezone_set('America/Bogota');
    $fecha_hora = date("Y-m-d H:i:s");

    $or_servi_vo = new Orden_serv_VO();
    $or_servi_dao = new Orden_serv_DAO();

//    $numero_ord = $_POST["inputNumOrd"];
//
//    if (empty($numero_ord)) {
//        $or_servi_vo->setNumero("null");
//    } else {
//        $or_servi_vo->setNumero($_POST["inputNumOrd"]);
//    }

    $or_servi_vo->setCod_ciudad($_POST["selectCiudad"]);
    $or_servi_vo->setDireccion($_POST["inputDir"]);
    $or_servi_vo->setPer_contacto($_POST["inputPerContacto"]);
    $or_servi_vo->setTelefono($_POST["inputTele"]);
    $or_servi_vo->setTipo_env_id($_POST["selectTipEnvio"]);
    if (isset($_SESSION["adminlogi"])) {
        $or_servi_vo->setCli_docum($_POST["inputNumDocCl"]);
        $or_servi_vo->setCli_id($_POST["inputTDocCli"]);

        $_SESSION["td_cli_adm"] = $_POST["inputTDocCli"];
        $_SESSION["num_doc_cli_adm"] = $_POST["inputNumDocCl"];
    } else {
        $or_servi_vo->setCli_docum($_SESSION["numero_doc"]);
        $or_servi_vo->setCli_id($_SESSION["tipo_doc"]);
    }

    if (isset($_POST["inpCheckLogiYa"])) {
        $or_servi_vo->setTipo_serv_id($_POST["inpCheckLogiYa"]);
    } else {
        $or_servi_vo->setTipo_serv_id(2); //Predifinido Mensajeria, modificable por Administrador
    }
    $or_servi_vo->setObservacion($_POST["inputObservServ"]);

    $numero_suc = $_POST["inputNumSucu"];
//    $des_os_vo->setCantidad_env($_POST["inputCantidadEnv"]);
//    echo $or_servi_dao->insertarOrden_serv($or_servi_vo);

    if ($or_servi_dao->insertarOrden_serv($or_servi_vo) == 1) {

        $es_x_serv_dao = new Est_x_serv_DAO();
        $es_x_serv_vo = new Est_x_serv_VO();
//        $os_dao = new Orden_serv_DAO();

        $json_id_os = json_encode($or_servi_dao->consultaUltimaOS($or_servi_vo->getCli_id(), $or_servi_vo->getCli_docum()));

        if (!empty($json_id_os)) {
            $os_id = json_decode($json_id_os);

            $es_x_serv_vo->setOrden_id($os_id[0]->os_id);
            $es_x_serv_vo->setEstado_id(1); //predefinido 1 programada            
            $es_x_serv_vo->setFecha_hora($fecha_hora);
            $es_x_serv_vo->setNovedad("");
            $es_x_serv_vo->setTd_mensajero(1); //cc usuario global LOGI
            $es_x_serv_vo->setNum_doc_mensajero(9874123652); //num predefinido usuario global LOGI

            if (isset($_SESSION["adminlogi"])) {
                $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);
                $es_x_serv_vo->setEstado_id(2);
                $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);
                $es_x_serv_vo->setEstado_id(3);
                $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);
                if (!empty($numero_suc)) {
                    $_SESSION["num_suc_adm"] = $os_id[0]->os_id;
                    $or_servi_dao->insertarOS_x_SUC($os_id[0]->os_id, $numero_suc);
                }
                echo 1;
            } else {
                if ($es_x_serv_dao->insertar_est_x_os($es_x_serv_vo) == 1) {
                    if (!empty($numero_suc)) {
                        $or_servi_dao->insertarOS_x_SUC($os_id[0]->os_id, $numero_suc);
                    }
                    echo 1;
                } else {
                    echo 2;
                }
            }
        } else {
            echo 3;
        }
    }
} else {
    header("location../");
}