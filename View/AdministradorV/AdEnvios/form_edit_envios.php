<div id="formDescEnvios">
    <div class="toast show border-primary" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
        <div class="toast-header">
            <strong class="mr-auto">EDITAR ENVIO</strong>
        </div>
        <form id="formBuscarEnv">
            <fieldset>
                <div class="alert alert-dismissible alert-primary col-lg-12 border-light" style="border-radius: 0.5rem;">
                    <div class="toast show border-primary" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
                        <div class="toast-body row">                                
                            <div class="form-group form-group-sm col-lg-2">
                                <label for="inputNumGuia">N° ENVIO LOGI</label>
                                <input type="number" class="form-control form-control-sm" id="inputNumGuia" name="inputNumGuia" placeholder="N° LOGI">
                            </div>
                            <div class="form-group col-md-3">
                                <button type="submit" class="btn btn-primary mt-4" id="btnBuscaGuia" name="btnBuscaGuia">Buscar</button>                             
                            </div>
                        </div>                    
                    </div>
                </div>
            </fieldset>
        </form>

        <form id="formEditEnvio">
            <fieldset>
                <div class="alert alert-dismissible alert-primary col-lg-12 border-light" style="border-radius: 0.5rem;">
                    <div class="toast show border-primary" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
                        <div class="toast-body row"> 

                            <div class="form-group form-group-sm col-lg-2">
                                <label for="inputNumGuiaLogi">N° GUIA</label>
                                <input type="number" class="form-control form-control-sm" id="inputNumGuiaLogi" name="inputNumGuiaLogi" placeholder="N° Guia" readonly="true">
                            </div>
                            <div class="form-group form-group-sm col-lg-2">
                                <label for="inputNumOs">N° OS</label>
                                <input type="number" class="form-control form-control-sm" id="inputNumOs" name="inputNumOs" placeholder="N° OS" readonly="true">
                            </div>
                            <div class="form-group form-group-sm col-lg-3">
                                <label for="selectTipoServi">Tipo Servicio</label>
                                <select class="form-control form-control-sm" id="selectTipoServi" name="selectTipoServi">

                                </select>
                            </div>
                            <div class="form-group form-group-sm col-lg-3">
                                <label for="selectTipoEnvi">Tipo Envio</label>
                                <select class="form-control form-control-sm" id="selectTipoEnvi" name="selectTipoEnvi">

                                </select>
                            </div>
                            <div class="form-group form-group-sm col-lg-2">
                                <label for="inputGuiaOp">Guia OP</label>
                                <input type="number" class="form-control form-control-sm" id="inputGuiaOp" name="inputGuiaOp" placeholder="Guia OP">
                            </div>
                            <div class="form-group form-group-sm col-lg-6">
                                <label for="inputObservServi">Observaciones Servicio</label>
                                <textarea class="form-control form-control-sm" id="inputObservServi" name="inputObservServi" rows="1"></textarea>
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
                            <div class="form-group form-group-sm col-lg-2">
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
                            <div class="form-group form-group-sm col-lg-2">
                                <label class="control-label" for="inputValPago">V. Servicio</label>
                                <div class="form-group">
                                    <div class="input-group mb-3 input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">$</span>
                                        </div>
                                        <input type="number" class="form-control form-control-sm" id="inputValPago" name="inputValPago" aria-label="Amount (to the nearest dollar)">
                                        <div class="input-group-append">
                                            <span class="input-group-text">m/c</span>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                            <div class="form-group form-group-sm col-lg-6" id="blqContenido">
                                <label for="inputContenido">Dice Contener</label>
                                <textarea class="form-control form-control-sm" id="inputContenido" name="inputContenido" rows="1"></textarea>
                            </div>
                            <div class="form-group form-group-sm col-lg-6">
                                <label for="inputObservEnvio">Observaciones Envio</label>
                                <textarea class="form-control form-control-sm" id="inputObservEnvio" name="inputObservEnvio" rows="1"></textarea>
                            </div>

                            <div class="alert alert-dismissible alert-warning col-lg-12">
                                <h4 class="alert-heading">REMITE</h4>
                                <div class="row">
                                    <div class="form-group form-group-sm col-lg-4">
                                        <label for="inputNombreRemite">Nombre Remite</label>
                                        <input type="text" class="form-control form-control-sm" id="inputNombreRemite" name="inputNombreRemite" placeholder="Nombre Remitente" readonly="true">
                                    </div>
                                    <div class="form-group form-group-sm col-lg-4">
                                        <label for="inputDirRemite">Dirección Remite</label>
                                        <input type="text" class="form-control form-control-sm" id="inputDirRemite" name="inputDirRemite" placeholder="Dirección Remitente">
                                    </div>
                                    <div class="form-group form-group-sm col-lg-2">
                                        <label for="inputTeleRemite">Teléfono Remite</label>
                                        <input type="number" class="form-control form-control-sm" id="inputTeleRemite" name="inputTeleRemite" placeholder="Telefono Remitente">
                                    </div>
                                    <div class="form-group form-group-sm col-lg-2">
                                        <label for="selectCiuRemite">Ciudad Remite</label>
                                        <select class="form-control form-control-sm" id="selectCiuRemite" name="selectCiuRemite">

                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="alert alert-dismissible alert-primary col-lg-12">
                                <h4 class="alert-heading">DESTINO</h4>
                                <div class="row">
                                    <div class="form-group form-group-sm col-lg-6">
                                        <label for="inputNombreDestino">Nombre destinatario</label>
                                        <input type="text" class="form-control form-control-sm" id="inputNombreDestino" name="inputNombreDestino" placeholder="Nombre Destinatario">
                                    </div>
                                    <div class="form-group form-group-sm col-lg-6">
                                        <label for="inputDirDestino">Dirección destino</label>
                                        <input type="text" class="form-control form-control-sm" id="inputDirDestino" name="inputDirDestino" placeholder="Dirección Destinatario">
                                    </div>
                                    <div class="form-group form-group-sm col-lg-4">
                                        <label for="inputTeleDestino">Teléfono Destino</label>
                                        <input type="number" class="form-control form-control-sm" id="inputTeleDestino" name="inputTeleDestino" placeholder="Telefono Destinatario">
                                    </div>
                                    <div class="form-group form-group-sm col-lg-4">
                                        <label for="inputCiudDestino">Ciudad Destino</label>
                                        <input type="text" class="form-control form-control-sm" id="inputCiudDestino" name="inputCiudDestino" placeholder="Ciudad">
                                    </div>
                                    <div class="form-group form-group-sm col-lg-4">
                                        <label for="inputDptoDestino">Dpto Destino</label>
                                        <input type="text" class="form-control form-control-sm" id="inputDptoDestino" name="inputDptoDestino" placeholder="Dpto">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-lg-12 mr-auto">
                                <button type="submit" class="btn btn-success" id="btnGuardarCambio" name="btnGuardarCambio"><strong>GUARDAR CAMBIOS</strong></button>
                            </div>
                        </div>                    
                    </div>
                </div>
                <div class="form-group col-lg-12 mr-auto">
                    <button type="button" class="btn btn-primary float-right" id="btnDetalle" name="btnDetalle"><strong>DETALLE</strong></button>                                        
                </div>
            </fieldset>
        </form>
        <div id="contDetalle">
            
        </div>
    </div>
</div>