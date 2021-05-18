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

$schema = new Schema([
    'query' => $rootQuery,
    'mutations' => null
        ]);

try {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, TRUE);
    $query = $input['query'];
    $result = GraphQL::executeQuery($schema, $query);

    $output = $result->toArray();
} catch (Exception $exc) {
    $output = [
        'error' => [
            'message' => $exc->getMessage()
        ]
    ];
}

header('Content-Type: application/json');
echo json_encode($output);
