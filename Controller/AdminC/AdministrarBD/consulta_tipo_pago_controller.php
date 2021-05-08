<?php


if ($_POST) {
    require '../../../config.php';
    $tipoPago_dao = new Tipo_pago_DAO();
    echo json_encode($tipoPago_dao->consultaTipoPago());
} else {
    header("location../");
}
