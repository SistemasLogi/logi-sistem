<?php

if ($_POST) {
    require '../../../config.php';
    $es_x_serv_dao = new Est_x_serv_DAO();

    $porciones = explode("|", $_POST["selectEmpl"]);

    $td_men = $porciones[0];
    $num_doc_men = $porciones[1];
    $num_os = $_POST["inpEstOrdServ"];
    $id_est = $_POST["inpEstId"];
    $valor = $_POST["inpValorFlet"];

    echo $es_x_serv_dao->actualiza_est_x_os($td_men, $num_doc_men, $num_os, $id_est, $valor);
} else {
    header("location../");
}