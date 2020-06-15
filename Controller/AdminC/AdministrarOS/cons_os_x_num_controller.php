<?php

if ($_POST) {
    require '../../../config.php';
    $os_serv = new Est_x_serv_DAO();
    echo json_encode($os_serv->consultaUltimoEstadoOS(" AND TM.os_id =".$_POST["inpBuscaNumOS"].";"));
} else {
    header("location../");
}