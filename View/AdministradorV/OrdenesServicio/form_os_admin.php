<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">ORDEN DE SERVICIO</strong>

    </div>
    <div class="toast-body row">        
        <div class="alert alert-dismissible alert-secondary col-lg-12" style="border-radius: 0.5rem;">
            <form class="form-inline my-2 my-lg-0 form-group-sm" id="formBuscarOS" name="formBuscarOS">                                    
                <b>Buscar N° Orden :</b>
                <input class="form-control form-control-sm mr-sm-2" type="number" id="inpBuscaNumOS" name="inpBuscaNumOS" placeholder="Buscar N°">
                <button type="submit" class="btn btn-outline-primary btn-sm" id="btnBuscaOS" name="btnBuscaOS">BUSCAR</button>    
            </form>
            <form id="formOrdenServAdm">
                <fieldset>
                    <legend id="lbTitleSection">Orden N°</legend> 
                    <div class="row">
                        <div class="form-group form-group-sm col-lg-3" id="blqinputDir" style="display: none;">
                            <input type="text" class="form-control form-control-sm" id="inputNumOSAd" name="inputNumOSAd">
                            <input type="text" class="form-control form-control-sm" id="inputTdCli" name="inputTdCli">
                            <input type="text" class="form-control form-control-sm" id="inputNumDocCli" name="inputNumDocCli">
                        </div>
                        <div class="form-group form-group-sm col-lg-5" id="blqinputDir">
                            <label for="inputDir">Dirección</label>
                            <input type="text" class="form-control form-control-sm" id="inputDir" name="inputDir" placeholder="Dirección Recolección">
                        </div>
                        <div class="form-group form-group-sm col-lg-2" id="blqselectCiudad">
                            <label for="selectCiudad">Ciudad</label>
                            <select class="form-control form-control-sm" id="selectCiudad" name="selectCiudad">

                            </select>
                        </div>
                        <div class="form-group form-group-sm col-lg-2" id="blqinputTele">
                            <label for="inputTele">Teléfono</label>
                            <input type="text" class="form-control form-control-sm" id="inputTele" name="inputTele" placeholder="Teléfono">
                        </div>
                        <div class="form-group form-group-sm col-lg-3" id="blqinputPerContacto">
                            <label for="inputPerContacto">Persona Contacto</label>
                            <input type="text" class="form-control form-control-sm" id="inputPerContacto" name="inputPerContacto" placeholder="Persona Contacto">
                        </div>
                        <div class="form-group form-group-sm col-lg-3">
                            <label for="selectTipEnvio">Tipo Envio</label>
                            <select class="form-control form-control-sm" id="selectTipEnvio" name="selectTipEnvio">

                            </select>
                        </div>
                        <div class="form-group form-group-sm col-lg-3">
                            <label for="inputObservServ">Observaciones</label>
                            <textarea class="form-control form-control-sm" id="inputObservServ" name="inputObservServ" rows="1"></textarea>
                        </div>
                        <div class="form-group form-group-sm col-lg-4">
                            <label for="inputNovedServ">Novedad</label>
                            <textarea class="form-control form-control-sm" id="inputNovedServ" name="inputNovedServ" rows="1"></textarea>
                        </div>
                        <div class="form-group form-group-sm col-lg-2" id="blqselectTipoServ">
                            <label for="selectTipoServi">Tipo Servicio</label>
                            <select class="form-control form-control-sm" id="selectTipoServi" name="selectTipoServi">

                            </select>
                        </div>
<!--                        <div class="form-group form-group-sm col-lg-2">
                            <label for="inputObservServ">Logi YA</label>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="checkbox" class="form-check-input checkbox-1x" id="inpCheckLogiYa" name="inpCheckLogiYa" value="1">Express
                                </label>
                            </div>
                        </div>-->
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary" id="btnActuOS" name="btnActuOS" style="margin-top: 22px;">Actualizar  <span class="ion-android-refresh"></span></button>
                            <button type="button" class="btn btn-danger" id="btnEliOS" name="btnEliOS" style="margin-top: 22px;">Eliminar  <span class="ion-close-circled"></span></button>
                            <button type="button" class="btn btn-dark" id="btnCancOS" name="btnCancOS" style="margin-top: 22px;">Cancelar  <span class="ion-android-remove-circle"></span></button>
                        </div>                                                
                    </div>
                </fieldset>
            </form>

        </div>
    </div>
</div>