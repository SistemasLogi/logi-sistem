<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use App\Models\Empleado;
use App\Models\Est_x_envio;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

$empleadoType = new ObjectType([
    'name' => 'empleado',
    'description' => 'tipo de dato empleado',
    'fields' => function ()use(&$est_x_envioType) {
        return [
            'emp_td_id' => Type::int(),
            'emp_num_doc' => Type::string(),
            'emp_nombre' => Type::string(),
            'emp_tel' => Type::string(),
            'emp_cel' => Type::string(),
            'emp_direccion' => Type::string(),
            'emp_email' => Type::string(),
            'esu_id' => Type::int(),
            'est_x_envios' => [
                "type" => Type::listOf($est_x_envioType),
                "resolve" => function ($root, $args) {
//                $empleadoId = [$root['emp_td_id'],$root['emp_num_doc']];
                    $emp_est_env = Est_x_envio::where('td_id_men', "=", $root['emp_td_id'])->where('num_doc_men', "=", $root['emp_num_doc'])->where('exe_ee_id', "=", '5')->get()->toArray();
                    return $emp_est_env;
                }
            ]
        ];
    }
        ]);

$est_x_envioType = new ObjectType([
    'name' => 'est_x_envio',
    'description' => 'tipo de dato estado por envio',
    'fields' => [
        'exe_en_id' => Type::string(),
        'exe_ee_id' => Type::int(),
        'exe_fec_hora' => Type::string(),
        'exe_novedad' => Type::string(),
        'td_id_men' => Type::int(),
        'num_doc_men' => Type::string()
    ]
        ]);
