<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {
    require '../../../config.php';
    $tipoDoc_dao = new Tipo_doc_DAO();  

    echo $tipoDoc_dao->elimTipoDoc($_POST["inpCodTipoDoc"]);
} else {
    header("location../");
}
