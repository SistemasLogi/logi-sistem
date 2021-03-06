<?php

namespace App\Models;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use Illuminate\Database\Eloquent\Model;

/**
 * Description of Estado_env
 *
 * @author ANDRES
 */
class Estado_env extends Model {

    //put your code here
    protected $table = "estado_env";
    public $timestamp = false;
    protected $fillable = [
        'exe_ee_id',
        'exe_fec_hora',
        'exe_novedad',
        'td_id_men',
        'num_doc_men'
    ];

    public function est_x_envio() {
        return $this->hasMany(Est_x_envio::class);
    }

}
