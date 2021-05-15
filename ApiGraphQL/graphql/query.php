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
        'Empleado' => [
            'type' => $empleadoType,
            'args' => [
                'emp_td_id' => Type::int(),
                'emp_num_doc' => Type::int()
            ],
            'resolve' => function ($root, $args) {
                $empleado = Empleado::find($args["emp_td_id"], ["emp_num_doc"])->toArray();
                return $empleado;
            }
        ]
    ]
        ]);
