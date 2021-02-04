<?php

session_start();
if ($_POST) {
    require '../../../config.php';
    $os_serv = new Est_x_serv_DAO();
    if (isset($_SESSION["adminlogi"])) {
        echo json_encode($os_serv->consultaSeguimientoEstadoOS($_POST["inpBuscaNumOS"]));
    } elseif (isset($_SESSION["cliente_a"])) {
        echo json_encode($os_serv->consultaSeguimientoEstadoOS($_POST["inpBuscaNumOS"] . " AND o.cli_td_id = " . $_SESSION["tipo_doc"] . " AND o.cli_num_doc = " . $_SESSION["numero_doc"] . ""));
    } elseif (isset($_SESSION["sucursal"])) {
        echo json_encode($os_serv->consultaSeguimientoEstadoOS($_POST["inpBuscaNumOS"] . " AND o.cli_td_id = " . $_SESSION["tipo_doc"] . " AND o.cli_num_doc = " . $_SESSION["numero_doc"] . " AND exs.os_id IN (SELECT osu.os_id FROM os_x_suc AS osu WHERE osu.suc_num_id = " . $_SESSION["numero_suc"] . ")"));
    }
} else {
    header("location../");
}