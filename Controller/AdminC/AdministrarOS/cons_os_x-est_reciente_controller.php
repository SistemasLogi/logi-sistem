<?php

if ($_POST) {
    require '../../../config.php';
    $est_os = new Est_x_serv_DAO();
    echo json_encode($est_os->consultaUltimaOS_x_estado());
} else {
    header("location../");
}