<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if ($_POST) {
    require '../../../config.php';
    $tipo_doc_dao = new Tipo_doc_DAO();
    $tipo_doc_vo = new Tipo_doc_VO();

    $cod_td = $_POST["inpCodTipoDoc"];

    if (empty($cod_td)) {
        $tipo_doc_vo->setCod_td("null");
    } else {
        $tipo_doc_vo->setCod_td($_POST["inpCodTipoDoc"]);
    }

    $tipo_doc_vo->setSigla($_POST["inpSiglaTipoDoc"]);
    $tipo_doc_vo->setDesc_td($_POST["inpDescTipoDoc"]);
    echo $tipo_doc_dao->insertarTipoDoc($tipo_doc_vo);
} else {
    header("location../");
}
