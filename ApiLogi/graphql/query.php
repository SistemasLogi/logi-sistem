<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use App\Models\Empleado;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

$rootQuery = new ObjectType([
    'name' => 'Query',
    'fields' => [
        'empleado' => [
            'type' => Type::listOf($empleadoType),
            'args' => [
                'emp_td_id' => Type::int(),
                'emp_num_doc' => Type::string()
            ],
            'resolve' => function ($root, $args) {
//                $empleado = Empleado::find($args["emp_td_id"], $args["emp_num_doc"])->toArray();
                $empleado = Empleado::where('emp_td_id', "=", $args["emp_td_id"])->where('emp_num_doc', "=", $args["emp_num_doc"])->get()->toArray();
                return $empleado;
            }
        ],
        'empleados' => [
            'type' => Type::listOf($empleadoType),
            'resolve' => function ($root, $args) {
                $empleados = Empleado::get()->toArray();
                return $empleados;
            }
        ]
    ]
        ]);
