<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {
    require '../../../config.php';
    $estadEnv_dao = new Estado_env_DAO();

    echo $estadEnv_dao->elimEstEnv($_POST["inpCodEstEnv"]);
} else {
    header("location../");
}

