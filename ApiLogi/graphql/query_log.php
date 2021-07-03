<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use GraphQL\Type\Definition\ObjectType;

require ('querys/loginQuerys.php');

$queryes = array();
$queryes += $loginQuerys;

$rootQueryLog = new ObjectType([
    'name' => 'Query',
    'fields' => $queryes
        ]);
