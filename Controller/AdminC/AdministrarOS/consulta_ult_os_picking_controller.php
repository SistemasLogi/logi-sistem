<?php

session_start();
if ($_POST) {
    require '../../../config.php';
    $est_os = new Est_x_serv_DAO();
    $estado_os = 5; //estado 5 picking
    echo json_encode($est_os->consultaUltimoEstadoOS(" AND ord.cli_td_id = " . $_SESSION["td_cli_adm_alst"] . " AND ord.cli_num_doc = " . $_SESSION["num_doc_cli_adm_alst"] . " AND es.es_id = " . $estado_os . " ORDER BY TM.os_id DESC;"));
} else {
    header("location../");
}
