<?php

if ($_POST) {
    require '../../../config.php';
    $depto_dao = new Depto_DAO();
    echo json_encode($depto_dao->consultaDepto());
} else {
    header("location../");
}
