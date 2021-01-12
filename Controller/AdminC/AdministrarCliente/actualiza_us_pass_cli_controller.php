<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {
    require '../../../config.php';
    $upass_dao = new Usuario_pass_DAO();
    $upass_vo = new Usuario_pass_VO();

    $upass_vo->setTipo_doc($_POST["inpTipoDoc"]);
    $upass_vo->setNum_doc($_POST["inpNumero"]);
    $upass_vo->setUsuario($_POST["inpUsuario"]);
    $upass_vo->setPassword(password_hash($_POST["inpPass"], PASSWORD_DEFAULT));

    echo $upass_dao->actualizarUsuarioCliente($upass_vo);
} else {
    header("location../");
}
