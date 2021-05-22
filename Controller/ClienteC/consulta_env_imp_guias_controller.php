<?php

session_start();
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {
    require '../../config.php';
    $env_dao = new Envio_DAO();
    echo json_encode($env_dao->consulta_env_reimp_guias($_SESSION["tipo_doc"], $_SESSION["numero_doc"], $_SESSION["numero_suc"]));
} else {
    header("location../");
}
