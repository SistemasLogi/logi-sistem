<?php

session_start();
if ($_POST) {
    require '../../../config.php';
    $est_x_alist_env_dao = new Est_x_aenv_DAO();
    if (isset($_SESSION["adminlogi"])) {
        echo json_encode($est_x_alist_env_dao->consulta_seg_env_alist("AND ae.aen_guia_op = " . $_POST["inpBuscaAlistGuiaOp"]));
    } elseif (isset($_SESSION["cliente_a"])) {
        echo json_encode($est_x_alist_env_dao->consulta_seg_env_alist("AND ae.aen_guia_op = " . $_POST["inpBuscaAlistGuiaOp"] . " AND c.cli_td_id = " . $_SESSION["tipo_doc"] . " AND c.cli_num_doc = " . $_SESSION["numero_doc"] . ""));
    } elseif (isset($_SESSION["sucursal"])) {
        echo json_encode($est_x_alist_env_dao->consulta_seg_env_alist("AND ae.aen_guia_op = " . $_POST["inpBuscaAlistGuiaOp"] . " AND c.cli_td_id = " . $_SESSION["tipo_doc"] . " AND c.cli_num_doc = " . $_SESSION["numero_doc"] . " "
                        . "AND o.os_id IN (SELECT osu.os_id FROM os_x_suc AS osu WHERE osu.suc_num_id = " . $_SESSION["numero_suc"] . ")"));
    }
} else {
    header("location../");
}