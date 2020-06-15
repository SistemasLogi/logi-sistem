<?php

if ($_POST) {
    require '../../../config.php';
    $est_os = new Est_x_serv_DAO();
    $fil = $_POST["fil"];
    echo json_encode($est_os->consultaUltimoEstadoOS(" AND TM.exs_fecha_hora >= CURDATE() AND TM.es_id = " . $fil . ";"));
} else {
    header("location../");
}