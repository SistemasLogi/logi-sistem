<?php

if ($_POST) {
    require '../../../config.php';
    $os_dao = new Orden_serv_DAO();
    $num_os = $_POST["os_id"];

    echo json_encode($os_dao->consulta_total_envios($num_os));
} else {
    header("location../");
}
