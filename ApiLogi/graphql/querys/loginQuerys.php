<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use App\Models\Empleado_pass;
use App\Models\Sucursal;
use GraphQL\Type\Definition\Type;

$loginQuerys = [
    'emp_pass' => [
        'type' => Type::listOf($empleado_passType),
        'args' => [
            'usuario' => Type::string()
        ],
        'resolve' => function ($root, $args) {
            $empleados = Empleado_pass::where('ue_usuario', "=", $args['usuario'])->get()->toArray();
            return $empleados;
        }
    ],
    'cliente_suc_log' => [
        'type' => Type::listOf($sucursalType),
        'args' => [
            'suc_usuario' => Type::string(),
            'suc_password' => Type::string()
        ],
        'resolve' => function ($root, $args) {
            $usuario_suc = Sucursal::where('suc_usuario', "=", $args["suc_usuario"])->get();

            if (password_verify($args["suc_password"], $usuario_suc[0]->suc_password) == TRUE) {
//                require 'auth.php';
                $token = Auth::SignIn([
                            'id_doc' => $usuario_suc[0]->cli_td_id,
                            'num_doc' => $usuario_suc[0]->cli_num_doc,
                            'role' => 'sucursal',
                            'id_role' => $usuario_suc[0]->suc_num_id
                ]);
//
//                    $id_doc = $usuario_suc[0]->cli_td_id;
//                    $num_doc = $usuario_suc[0]->cli_num_doc;
//                    $role = 'sucursal';
//                    $id_role = $usuario_suc[0]->suc_num_id;
                $usuario_suc_tok = Sucursal::selectRaw("*, '" . $token . "' as token")->where('suc_usuario', "=", $args["suc_usuario"])->get();
                return $usuario_suc_tok->toArray();
            } else {
                
            }
        }
    ]
];
