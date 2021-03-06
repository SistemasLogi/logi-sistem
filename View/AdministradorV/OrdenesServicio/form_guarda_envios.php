<div class="toast show border-warning col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">DATOS DE ORDEN CREADA</strong>

    </div>
    <div class="toast-body row">
        <div class="alert alert-dismissible alert-primary col-lg-12">
            <div class="toast show border-warning col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">

                <div id="divMensaje">

                </div>
                <div class="alert alert-dismissible alert-primary col-lg-12 border-warning" style="border-radius: 0.5rem;" id="blqSelectModoCarga">
                    <h5>Seleccionar Forma de Radicación Envios</h5>
                    <div class="form-check-inline">
                        <label class="form-check-label">
                            <input type="radio" class="form-check-input op" name="rbtnCargaEnv" id="optionsRadios1" value="formulario" checked="">
                            Formulario
                        </label>
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label">
                            <input type="radio" class="form-check-input op" name="rbtnCargaEnv" id="optionsRadios2" value="excel">
                            Excel
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="formDescEnvios" style="display: none;">
    <div class="toast show border-primary" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
        <div class="toast-header">
            <strong class="mr-auto">DESCRIPCIÓN DE ENVIOS</strong>
        </div>
        <form id="formEnvios">
            <fieldset>
                <div id="parentControl">
                    <div id="f" class="alert alert-dismissible alert-primary col-lg-12 border-light" style="border-radius: 0.5rem;">
                        <strong class="mr-auto">Sección 1</strong>
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
                                <div class="form-group form-group-sm col-lg-2">
                                    <label for="inputCantidadEnv">Cantidad</label>
                                    <input type="number" class="form-control form-control-sm" id="inputCantidadEnv" name="inputCantidadEnv" placeholder="N° Envios" required>
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
                                <div class="form-group form-group-sm col-lg-6" id="blqContenido">
                                    <label for="inputContenido">Dice Contener</label>
                                    <textarea class="form-control form-control-sm" id="inputContenido" name="inputContenido" rows="1"></textarea>
                                </div>                               
                                <div class="form-group form-group-sm col-lg-6" id="blqObserv">
                                    <label for="inputObserv">Observaciones/Complemento</label>
                                    <textarea class="form-control form-control-sm" id="inputObserv" name="inputObserv" rows="1"></textarea>
                                </div>
                                <div class="form-group form-group-sm col-lg-3" id="blqRecaudo">
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
                                <div class="form-group form-group-sm col-lg-3">
                                    <label for="selectTipoPago">Tipo Pago</label>
                                    <select class="form-control form-control-sm" id="selectTipoPago" name="selectTipoPago">

                                    </select>
                                </div>
                                <div class="form-group form-group-sm col-lg-3" id="blqValorTipoPago">
                                    <label class="control-label" for="inputValorTipoPago">Valor Pago</label>
                                    <div class="form-group">
                                        <div class="input-group mb-3 input-group-sm">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">$</span>
                                            </div>
                                            <input type="number" class="form-control form-control-sm" id="inputValorTipoPago" name="inputValorTipoPago" aria-label="Amount (to the nearest dollar)">
                                            <div class="input-group-append">
                                                <span class="input-group-text">m/c</span>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                                <div class="form-group form-group-sm col-lg-3" id="blqValorDecl">
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
                    <div id="f1" class="alert alert-dismissible alert-primary col-lg-12 border-light" style="border-radius: 0.5rem;">

                    </div>
                </div>

                <div class="form-group col-lg-12 mr-auto">
                    <button type="button" class="btn btn-primary" id="btnMas" name="btnMas"><strong>MAS +</strong></button>
                    <button type="button" class="btn btn-warning" id="btnMenos" name="btnMenos"><strong>MENOS -</strong></button>
                    <button type="submit" class="btn btn-success" id="btnGuardarFin" name="btnGuardarFin"><strong>FINALIZAR</strong></button>
                    <div class="form-group form-group-sm col-lg-3" id="blqCantGuias"  style="display: none;">
                        <label for="inputContador">cantidad Guias</label>
                        <input type="number" class="form-control form-control-sm" id="inputContador" name="inputContador">
                    </div>
                    <div class="form-group form-group-sm col-lg-3" id="blqNumOS"  style="display: none;">
                        <label for="inputNumOrdServ">N° OS</label>
                        <input type="number" class="form-control form-control-sm" id="inputNumOrdServ" name="inputNumOrdServ">
                    </div>
                </div>
            </fieldset>
        </form>
        <div class="alert alert-dismissible alert-light col-lg-12 border-light" id="blqChangeEnviosMens" style="border-radius: 0.5rem;">
            <div id="changeEnviosMens">

            </div>
        </div>

        <div class="alert alert-dismissible alert-primary col-lg-12 border-light" id="blqCargaExcel" style="border-radius: 0.5rem;">
            <form method="post" enctype="multipart/form-data" id="formMasEnvDoc" name="formMasEnvDoc">
                <fieldset> 
                    <div class="row">
                        <div class="input-group col-lg-6 margen_top">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input is-valid" id="inpFileMasEnvDoc" name="inpFileMasEnvDoc">
                                <label class="custom-file-label" for="inpFileMasEnvDoc" id="textMasEnvDoc">Archivo Excel</label>
                            </div>                            
                        </div>
                        <div class="margen_top" id="errorTxt" style="color: #761c19;"></div> 
                        <div class="input-group col-lg-2 margen_top">
                            <div class="custom-file">
                                <button type="submit" class="btn btn-success" id="btnGMasEnvDoc" name="btnGMasEnvDoc">GUARDAR</button>
                            </div>
                        </div>               
                        <div class="input-group col-lg-4 margen_top">
                            <div class="custom-file">
                                <a id="enlPlantilla">Descargue <strong>Aqui </strong> la plantilla Excel</a>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
            <div id="changeEnvios">

            </div>
        </div>
    </div>
</div>