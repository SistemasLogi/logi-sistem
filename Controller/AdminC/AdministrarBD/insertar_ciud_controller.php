<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if ($_POST) {
    require '../../../config.php';
    $ciudad_dao = new Ciudad_DAO();
    $ciudad_vo = new Ciudad_VO();
    
    $cod_ciud = $_POST["inpCodCiudad"];
    $depto_id = $_POST["selectDepto"];
    
    if(empty($cod_ciud)){
       $ciudad_vo->setId_ciudad("null"); 
    } else {
         $ciudad_vo->setId_ciudad($_POST["inpCodCiudad"]);
    }
   
    $ciudad_vo->setNombre_ciu($_POST["inpNomCiudad"]);
    echo $ciudad_dao->insertarCiudad($ciudad_vo, $depto_id);
} else {
    header("location../");
}
