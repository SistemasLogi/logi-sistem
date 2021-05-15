<?php

namespace App\ApiGraphQL;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use Illuminate\Database\Eloquent\Model;

/**
 * Description of Est_x_envio
 *
 * @author TECNOLOGIA-LOGI
 */
class Est_x_envio extends Model {

    //put your code here
    protected $table = "est_x_envio";
    public $timestamps = false;
    protected $filebase = ['exe_en_id', 'exe_ee_id', 'exe_fec_hora', 'exe_novedad', 'td_id_men', 'num_doc_men'];

    public function empleado() {
        return $this->belongsTo(Empleado::class);
    }

}
