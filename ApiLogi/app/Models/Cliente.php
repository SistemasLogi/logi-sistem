<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Description of Cliente
 *
 * @author LOGI
 */
class Cliente extends Model {

    //put your code here
    //put your code here
    protected $table = "clientes";
    public $timestamp = false;
    protected $fillable = [
        'cli_td_id',
        'cli_num_doc',
        'cli_nombre',
        'cli_tel',
        'cli_cel',
        'cli_direccion',
        'cli_per_cont'
    ];
    protected $primary_key = ['cli_td_id', 'cli_num_doc'];
    public $incrementing = false;

    public function cliente_titular() {
//        return $this->belongsTo(Est_x_envio::class, ['td_id_men', 'num_doc_men']);//el segundo parametro es la llave foranea en la tabla de la relacion
    }

}
