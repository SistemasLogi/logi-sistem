<?php

session_start();
if ($_POST) {
    require '../../../config.php';
    $os_serv = new Est_x_serv_DAO();
    if (isset($_SESSION["adminlogi"])) {
        echo json_encode($os_serv->consultaSeguimientoEstadoOS($_POST["inpBuscaNumOS"]));
    } elseif (isset($_SESSION["cliente_a"])) {
        echo json_encode($os_serv->consultaSeguimientoEstadoOS($_POST["inpBuscaNumOS"] . " AND o.cli_td_id = " . $_SESSION["tipo_doc"] . " AND o.cli_num_doc = " . $_SESSION["numero_doc"] . ""));
    }
} else {
    header("location../");
}