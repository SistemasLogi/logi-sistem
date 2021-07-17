<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Description of Cliente_pass
 *
 * @author LOGI
 */
class Cliente_pass extends Model {

    //put your code here
    //put your code here
    protected $table = "usuario_pass";
    public $timestamp = false;
    protected $fillable = [
        'us_td_id',
        'us_num_doc',
        'tu_id',
        'us_usuario',
        'us_password'
    ];
    protected $primary_key = ['us_td_id', 'us_num_doc'];
    public $incrementing = false;

    public function cliente_titular() {
//        return $this->belongsTo(Est_x_envio::class, ['td_id_men', 'num_doc_men']);//el segundo parametro es la llave foranea en la tabla de la relacion
    }

}
