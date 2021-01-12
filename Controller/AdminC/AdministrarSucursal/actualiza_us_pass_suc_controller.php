<?php

if ($_POST) {
    require '../../../config.php';
    $sucursal_dao = new Sucursales_DAO();
    $sucursal_vo = new Sucursales_VO();

    $sucursal_vo->setNum_suc($_POST["inpNumeroSuc"]);
    $sucursal_vo->setUsuario_suc($_POST["inpUsuarioSuc"]);
    $sucursal_vo->setPass_suc(password_hash($_POST["inpPassSuc"], PASSWORD_DEFAULT));

    echo $sucursal_dao->actualizarUsuarioSucursal($sucursal_vo);
} else {
    header("location../");
}