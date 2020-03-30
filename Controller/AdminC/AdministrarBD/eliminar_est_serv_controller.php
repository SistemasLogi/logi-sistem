<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {
    require '../../../config.php';
    $estadServ_dao = new Estado_serv_DAO();

    echo $estadServ_dao->elimEstServ($_POST["inpCodEstServ"]);
} else {
    header("location../");
}

