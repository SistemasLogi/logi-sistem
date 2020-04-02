<?php

if ($_POST) {
    session_start();
    require '../../config.php';

    date_default_timezone_set('America/Bogota');
    $fecha_hora = date("Y-m-d H:i:s");

    $or_servi_vo = new Orden_serv_VO();
    $or_servi_dao = new Orden_serv_DAO();

    $des_os_vo = new Descrip_serv_VO();
    $des_os_dao = new Descrip_serv_DAO();

    $numero_ord = $_POST["inputNumOrd"];

    if (empty($numero_ord)) {
        $or_servi_vo->setNumero("null");
    } else {
        $or_servi_vo->setNumero($_POST["inputNumOrd"]);
    }

    $or_servi_vo->setCod_ciudad($_POST["selectCiudad"]);
    $or_servi_vo->setDireccion($_POST["inputDir"]);
    $or_servi_vo->setPer_contacto($_POST["inputPerContacto"]);
    $or_servi_vo->setTelefono($_POST["inputTele"]);
    $or_servi_vo->setEnvio($_POST["selectTipEnvio"]);
    $or_servi_vo->setCli_docum($_SESSION["numero_doc"]);
    $or_servi_vo->setCli_id($_SESSION["tipo_doc"]);
    $des_os_vo->setCantidad_env($_POST["inputCantidadEnv"]);

    if ($or_servi_dao->insertarOrden_serv($or_servi_vo) == 1) {
        $consulta = json_encode($or_servi_dao->consultaUltimaOS($_SESSION["tipo_doc"], $_SESSION["numero_doc"]));
        if (!empty($consulta)) {
            $num_ord_serv = json_decode($consulta);
            $numero_os = $num_ord_serv[0]->os_id;
            $csc = 1;
            $des_os_vo->setOs_id($numero_os);
            $des_os_vo->setCsc($csc);
            $des_os_vo->setTs_id(2);
            $des_os_vo->setContenido("");
            if ($des_os_dao->insertarDescrip_serv($des_os_vo) == 1) {
                $estXserv_vo = new Est_x_serv_VO();
                $estXserv_dao = new Est_x_serv_DAO();

                $estXserv_vo->setOrden_id($numero_os);
                $estXserv_vo->setOrd_csc_id($csc);
                $estXserv_vo->setEstado_id(1);
                $estXserv_vo->setFecha_hora($fecha_hora);
                $estXserv_vo->setNovedad("");
                if ($estXserv_dao->insertarOrden_serv($estXserv_vo) == 1) {
                    echo 1;
                } else {
                    echo "Error al guardar estado de orden";
                }
            } else {
                echo "error al guardar detalles de orden de servicio";
            }
        } else {
            echo "error al guardar orden de servicio";
        }
    }
} else {
    header("location../");
}