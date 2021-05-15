<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

$empleadoType = new ObjectType([
    'name' => 'Empleado',
    'description' => 'Tipo de dato Empleado',
    'fields' => [
        'emp_td_id' => Type::int(),
        'emp_num_doc' => Type::int(),
        'emp_nombre' => Type::string(),
        'emp_tel' => Type::string(),
        'emp_cel' => Type::string(),
        'emp_direccion' => Type::string(),
        'emp_email' => Type::string(),
        'esu_id' => Type::int()
    ]
        ]);
