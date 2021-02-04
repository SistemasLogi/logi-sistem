<?php

if ($_POST) {
    session_start();
    require '../../../config.php';

    date_default_timezone_set('America/Bogota');
    $fecha_hora = date("Y-m-d H:i:s");

    $or_servi_vo = new Orden_serv_VO();
    $or_servi_dao = new Orden_serv_DAO();

    $ident = explode("|", $_POST["selCliente"]);

    $or_servi_vo->setCli_id($ident[0]);
    $or_servi_vo->setCli_docum($ident[1]);
    $or_servi_vo->setCod_ciudad($_POST["selCiudad"]);
    $or_servi_vo->setDireccion($_POST["inpDirec"]);
    $or_servi_vo->setPer_contacto($_POST["inpPerCont"]);
    $or_servi_vo->setTelefono($_POST["inpTel"]);
    $or_servi_vo->setTipo_serv_id($_POST["selServi"]);
    $or_servi_vo->setTipo_env_id($_POST["selEnvio"]);
    $or_servi_vo->setObservacion($_POST["texaObserv"]);

    $numero_suc = $_POST["selSucur"];

    if ($or_servi_dao->insertarOrden_serv($or_servi_vo) == 1) {

        $_SESSION["td_cli_adm"] = $ident[0];
        $_SESSION["num_doc_cli_adm"] = $ident[1];

        $es_x_serv_dao = new Est_x_serv_DAO();
        $es_x_serv_vo = new Est_x_serv_VO();

        $json_id_os = json_encode($or_servi_dao->consultaUltimaOS($or_servi_vo->getCli_id(), $or_servi_vo->getCli_docum()));
             
        if (!empty($json_id_os)) {
            $os_id = json_decode($json_id_os);
            $_SESSION["os_creada"] = $os_id[0]->os_id;
            $es_x_serv_vo->setOrden_id($os_id[0]->os_id);
            $es_x_serv_vo->setFecha_hora($fecha_hora);
            $es_x_serv_vo->setNovedad("");
            $es_x_serv_vo->setTd_mensajero(1); //cc usuario global LOGI
            $es_x_serv_vo->setNum_doc_mensajero(9874123652); //num predefinido usuario global LOGI

            if ($os_id[0]->ts_id == 4 || $os_id[0]->ts_id == 5) {
                $es_x_serv_vo->setEstado_id(5); //predefinido  5 piking
                $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);
            } else {
                $es_x_serv_vo->setEstado_id(1); //predefinido 1 programada
                $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);
                $es_x_serv_vo->setEstado_id(2);
                $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);
                $es_x_serv_vo->setEstado_id(3);
                $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);
            }
            if (!empty($numero_suc)) {
                $_SESSION["num_suc_adm"] = $numero_suc;
                $or_servi_dao->insertarOS_x_SUC($os_id[0]->os_id, $numero_suc);
            }
            echo 1; //guardado correcto de os estados y os_x_suc si existe
        } else {
            echo 2; //error al realizar consulta de os ya creada
        }
    } else {
        echo 3; //error al crear os
    }
} else {
    header("location../");
}