<?php

require '../../../config.php';

$us_pass_vo = new Usuario_pass_VO();
$us_pass_dao = new Usuario_pass_DAO();

$dato = json_encode($us_pass_dao->consultaAdmin(80132305)); //numero de documento administrador
$dato_decode = json_decode($dato);

$us_pass_vo->setNum_doc($dato_decode[0]->ue_num_doc);
$us_pass_vo->setPassword(password_hash($dato_decode[0]->ue_password, PASSWORD_DEFAULT));

if ($dato_decode[0]->ue_password == (string) $dato_decode[0]->ue_num_doc) {
    $us_pass_dao->actualizarClaveAdmin($us_pass_vo);
    echo "Administrador ENCRIPTADO";
} else {
    echo "NO SE PUEDE REALIZAR LA ACCIÓN";
}
