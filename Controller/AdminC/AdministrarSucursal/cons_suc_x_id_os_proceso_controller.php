<?php

session_start();
if ($_POST) {
    require '../../../config.php';
    $sucursal_dao = new Sucursales_DAO();

    $id_suc = $_POST["selectSuc_x_Cli"];

    $json_dat_suc = json_encode($sucursal_dao->consultaSuc_x_num($id_suc));
    $dec_dat_suc = json_decode($json_dat_suc);

    $_SESSION["num_suc_adm_alst"] = $dec_dat_suc[0]->suc_num_id;
    $_SESSION["num_doc_cli_adm_alst"] = $dec_dat_suc[0]->cli_num_doc;
    $_SESSION["td_cli_adm_alst"] = $dec_dat_suc[0]->cli_td_id;
//    $_SESSION["fecha_adm_alst"] = $_POST["inputDateAlist"];
//    $_SESSION["direccion_adm_alst"] = $_POST["inputDir"];
//    $_SESSION["tel_adm_alst"] = $_POST["inputTele"];
    echo $json_dat_suc;
} else {
    header("location../");
}