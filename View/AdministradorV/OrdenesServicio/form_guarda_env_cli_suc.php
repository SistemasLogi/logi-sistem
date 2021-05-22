<?php session_start(); ?>
<div class="toast show border-warning col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">DATOS DE ORDEN CREADA</strong>
    </div>
    <div class="toast-body row">
        <div class="alert alert-dismissible alert-primary col-lg-12">
            <div class="toast show border-warning col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">

                <div id="divDatosOS_cl_suc">
                    <legend id="legTitulo">Orden N° <?php echo $_SESSION["num_os_cli_suc"]; ?></legend>
                    <strong>Lugar de Recolección: </strong><?php echo $_SESSION["dir_os_cli_suc"] . " " . $_SESSION["ciu_os_cli_suc"]; ?><br>
                    <strong>Tipo de Envio: </strong><?php echo $_SESSION["tipe_os_cli_suc"]; ?><br>
                    <strong>Tipo Servicio: </strong><?php echo $_SESSION["tips_os_cli_suc"]; ?>
                    <div class="alert alert-dismissible alert-warning border-warning" id="mensajeCompletar" style="border-radius: 0.5rem;">
                        <strong>Orden de Recolección creada,</strong> por favor diligencie los datos de envio.
                    </div>
                </div>                
            </div>
        </div>
    </div>
</div>
<div id="formDescEnvios">
    <div class="toast show border-primary" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
        <div class="toast-header">
            <strong class="mr-auto">DESCRIPCIÓN DE ENVIOS</strong>
        </div>
        <form id="formEnvios">
            <fieldset>
                <div id="parentControl">
                    <div id="f" class="alert alert-dismissible alert-primary col-lg-12 border-light" style="border-radius: 0.5rem;">
                        <strong class="mr-auto">Envio 1</strong>
                        <div class="toast show border-primary" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
                            <div class="toast-body row">
                                <div class="form-group form-group-sm col-lg-4">
                                    <label for="inputNombreDestino">Nombre destinatario</label>
                                    <input type="text" class="form-control form-control-sm" id="inputNombreDestino" name="inputNombreDestino" placeholder="Nombre Destinatario" required>
                                </div>
                                <div class="form-group form-group-sm col-lg-4">
                                    <label for="inputDirDestino">Dirección destino</label>
                                    <input type="text" class="form-control form-control-sm" id="inputDirDestino" name="inputDirDestino" placeholder="Dirección Destinatario" required>
                                </div>
                                <div class="form-group form-group-sm col-lg-2">
                                    <label for="inputTeleDestino">Teléfono Destino</label>
                                    <input type="number" class="form-control form-control-sm" id="inputTeleDestino" name="inputTeleDestino" placeholder="Telefono Destinatario">
                                </div>
                                <div class="form-group form-group-sm col-lg-2">
                                    <label for="selectCiudDestino">Ciudad Destino</label>
                                    <select class="form-control form-control-sm" id="selectCiudDestino" name="selectCiudDestino">

                                    </select>
                                </div>


                                <div id="parentSec">
                                    <div id="sec" class="row px-3">
                                        <div class="form-group form-group-sm col-lg-2">
                                            <label for="inputCantidadEnv">Cantidad</label>
                                            <?php
                                            if ($_SESSION["tiped_os_cli_suc"] == 1) {
                                                $btn_mas = '';
                                                $btn_menos = '';
                                                ?>                                        
                                                <input type="number" class="form-control form-control-sm" id="inputCantidadEnv" name="inputCantidadEnv" value="1" required  readonly="">
                                                <?php
                                            } elseif ($_SESSION["tiped_os_cli_suc"] == 2) {
                                                $btn_mas = '<button type="button" class="btn btn-primary" id="btnMas" name="btnMas"><strong>MAS +</strong></button>';
                                                $btn_menos = '<button type="button" class="btn btn-warning" id="btnMenos" name="btnMenos"><strong>MENOS -</strong></button>';
                                                ?>
                                                <input type="number" class="form-control form-control-sm" id="inputCantidadEnv" name="inputCantidadEnv" placeholder="N° Unidades" required>
                                                <?php
                                            }
                                            ?>
                                        </div>
                                        <div class="form-group form-group-sm col-lg-2">
                                            <label for="inputRefGuia">Referencia</label>
                                            <input type="text" class="form-control form-control-sm" id="inputRefGuia" name="inputRefGuia" placeholder="Referencia">
                                        </div>
                                        <div class="form-group form-group-sm col-lg-2" id="blqPeso">
                                            <label for="inputPeso">Peso Kg</label>
                                            <input type="number" class="form-control form-control-sm" id="inputPeso" name="inputPeso" placeholder="Peso Kg">
                                        </div>
                                        <div class="form-group form-group-sm col-lg-2" id="blqAlto">
                                            <label for="inputAlto">Alto cm</label>
                                            <input type="number" class="form-control form-control-sm" id="inputAlto" name="inputAlto" placeholder="Alto cm">
                                        </div>
                                        <div class="form-group form-group-sm col-lg-2" id="blqAncho">
                                            <label for="inputAncho">Ancho cm</label>
                                            <input type="number" class="form-control form-control-sm" id="inputAncho" name="inputAncho" placeholder="Ancho cm">
                                        </div>
                                        <div class="form-group form-group-sm col-lg-2" id="blqLargo">
                                            <label for="inputLargo">Largo cm</label>
                                            <input type="number" class="form-control form-control-sm" id="inputLargo" name="inputLargo" placeholder="Largo cm">
                                        </div>
                                        <div id="sec1" class="row px-3">

                                        </div>
                                    </div>
                                </div>


                                <div class="form-group form-group-sm col-lg-4" id="blqContenido">
                                    <label for="inputContenido">Dice Contener</label>
                                    <textarea class="form-control form-control-sm" id="inputContenido" name="inputContenido" rows="1"></textarea>
                                </div>                               
                                <div class="form-group form-group-sm col-lg-4" id="blqObserv">
                                    <label for="inputObserv">Observaciones/Complemento</label>
                                    <textarea class="form-control form-control-sm" id="inputObserv" name="inputObserv" rows="1"></textarea>
                                </div>
                                <div class="form-group form-group-sm col-lg-2" id="blqRecaudo">
                                    <label class="control-label" for="inputRecaudo">Recaudo</label>
                                    <div class="form-group">
                                        <div class="input-group mb-3 input-group-sm">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">$</span>
                                            </div>
                                            <input type="number" class="form-control form-control-sm" id="inputRecaudo" name="inputRecaudo" aria-label="Amount (to the nearest dollar)">
                                            <div class="input-group-append">
                                                <span class="input-group-text">m/c</span>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                                <div class="form-group form-group-sm col-lg-2" id="blqValorDecl">
                                    <label class="control-label" for="inputValorDecl">Valor Declarado</label>
                                    <div class="form-group">
                                        <div class="input-group mb-3 input-group-sm">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">$</span>
                                            </div>
                                            <input type="number" class="form-control form-control-sm" id="inputValorDecl" name="inputValorDecl" aria-label="Amount (to the nearest dollar)">
                                            <div class="input-group-append">
                                                <span class="input-group-text">m/c</span>
                                            </div>
                                        </div>
                                    </div>  
                                </div>                                
                            </div>                    
                        </div>
                    </div>
                    <div id="f1" class="alert alert-dismissible alert-primary col-lg-12 border-light" style="border-radius: 0.5rem; display: none;">

                    </div>
                </div>

                <div class="form-group col-lg-12 mr-auto">
                    <?php echo $btn_mas ?>
                    <?php echo $btn_menos ?>
                    <button type="submit" class="btn btn-success" id="btnGuardarFin" name="btnGuardarFin"><strong>GENERAR GUIA</strong></button>
                    <button type="button" class="btn btn-primary float-right" id="btnNuevoServ" name="btnNuevoServ" disabled><strong>NUEVO SERVICIO</strong></button>
                    <div class="form-group form-group-sm col-lg-3" id="blqCantGuias" style="display: none;">
                        <label for="inputContador">cantidad Envios</label>
                        <input type="number" class="form-control form-control-sm" id="inputContador" name="inputContador">
                    </div>
                    <div class="form-group form-group-sm col-lg-3" id="blqNumOS" style="display: none;">
                        <label for="inputNumOrdServ">N° OS</label>
                        <input type="number" class="form-control form-control-sm" id="inputNumOrdServ" name="inputNumOrdServ" value="<?php echo $_SESSION["num_os_cli_suc"]; ?>">
                    </div>
                </div>
            </fieldset>
        </form>
        <div class="alert alert-dismissible alert-light col-lg-12 border-light" id="blqChangeEnviosMens" style="border-radius: 0.5rem;">
            <div id="changeEnviosMens">

            </div>
        </div>
    </div>
</div>