<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use GraphQL\GraphQL;
use GraphQL\Type\Schema;

require ('types.php');
require ('query.php');
require_once 'auth.php';

$schema = new Schema([
    'query' => $rootQuery,
    'mutations' => null
        ]);

try {
    $headers = Apache_request_headers();
    $headers_enc = json_encode($headers);
    $headers_dec = json_decode($headers_enc, TRUE);

    if (array_key_exists('Authorization', $headers_dec)) {
        if (isset($headers_dec["Authorization"])) {
            // do something
            $header_token = $headers_dec["Authorization"];

            if ($header_token !== 'undefined') {

//                $rawInput = file_get_contents('php://input');
//                $input = json_decode($rawInput, TRUE);
//                $query = $input['query'];
//                $result = GraphQL::executeQuery($schema, $query);
//
//                $output = $result->toArray();



                $datos = Auth::GetData(
                                $header_token
                );

                if (isset($datos)) {
                    $rawInput = file_get_contents('php://input');
                    $input = json_decode($rawInput, TRUE);
                    $query = $input['query'];
                    $result = GraphQL::executeQuery($schema, $query);

//                    $output = $result->toArray();

                    $output = [
                        'data' => [
                            $datos
                        ]
                    ];
                } else {
                    $output = [
                        'data' => [
                            'vacio'
                        ]
                    ];
                }


//                $output = [
//                    'data' => [
//                        'id_role' => $datos->id_role,
//                        'role' => $datos->role,
//                        'num_doc' => $datos->num_doc,
//                        'id_doc' => $datos->id_doc
//                    ]
//                ];
            } else {
                $output = [
                    'error_1' => [
                        'message' => 'token no definido'
                    ]
                ];
            }
        } else {
            $output = [
                'error_2' => [
                    'message' => 'token no es valido'
                ]
            ];
        }
    } else {
        $output = [
            'error_4' => [
                'message' => 'usuario no autorizado'
            ]
        ];
    }

//    require 'controllers/data.php';
} catch (Exception $exc) {
    $output = [
        'error_6' => [
            'message' => $exc->getMessage()
        ]
    ];
}

header('Content-Type: application/json');
echo json_encode($output);
