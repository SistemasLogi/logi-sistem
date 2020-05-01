<?php session_start(); ?>
<div class="alert alert-dismissible alert-warning">
    <legend id="legTitulo">Solicitar Recolección</legend>
    <div id="divMensaje" class="col-lg-12">

    </div>
    <div class="card border-primary mb-5">       
        <div class="card-body">
            <div class="col-lg-10">
                <form id="formOrdenServ">
                    <fieldset>
                        <div id="controlesInput">
                            <div class="row">
                                <div class="form-group form-group-sm col-lg-3" style="display: none">
                                    <label for="inputNumOrd">N° Ord</label>
                                    <input type="text" class="form-control form-control-sm" id="inputNumOrd" name="inputNumOrd" placeholder="N° Orden">
                                </div>
                                <div class="form-group form-group-sm col-lg-4">
                                    <label for="inputDir">Dirección</label>
                                    <input type="text" class="form-control form-control-sm" id="inputDir" name="inputDir" placeholder="Dirección Recolección" value="<?php echo $_SESSION["direccion_cli"]; ?>">
                                </div>
                                <div class="form-group form-group-sm col-lg-3">
                                    <label for="selectCiudad">Ciudad</label>
                                    <select class="form-control form-control-sm" id="selectCiudad" name="selectCiudad">

                                    </select>
                                </div>
                                <div class="form-group form-group-sm col-lg-2">
                                    <label for="inputTele">Teléfono</label>
                                    <input type="text" class="form-control form-control-sm" id="inputTele" name="inputTele" placeholder="Teléfono" value="<?php echo $_SESSION["telefono_cli"]; ?>">
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group form-group-sm col-lg-4">
                                    <label for="inputPerContacto">Persona Contacto</label>
                                    <input type="text" class="form-control form-control-sm" id="inputPerContacto" name="inputPerContacto" placeholder="Persona Contacto" value="<?php echo $_SESSION["per_contac"]; ?>">
                                </div>
                                <div class="form-group form-group-sm col-lg-2">
                                    <label for="inputCantidadEnv">Cantidad</label>
                                    <input type="text" class="form-control form-control-sm" id="inputCantidadEnv" name="inputCantidadEnv" placeholder="N° Envios">
                                </div>
                                <div class="form-group form-group-sm col-lg-3">
                                    <label for="selectTipEnvio">Tipo Envio</label>
                                    <select class="form-control form-control-sm" id="selectTipEnvio" name="selectTipEnvio">

                                    </select>
                                </div>                
                            </div> 
                        </div>

                        <div class="row mx-auto">
                            <div class="form-group col-lg-3" id="divBtnGenOS">
                                <button type="submit" class="btn btn-primary" id="btnGenOrdServ" name="btnGenOrdServ">Generar Orden Servicio</button>
                            </div>
                            <!--                <div class="form-group col-lg-2">
                                                <button type="button" class="btn btn-dark" id="btnCancelarOrd" name="btnCancelarOrd">Cancelar</button>
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <button type="button" class="btn btn-secondary" id="btnAgreEnv" name="btnAgreEnv" disabled="">Agregar Envios</button>
                                            </div>               -->
                            <div class="form-group col-lg-9">
                                <ul class="nav nav-pills">
                                    <li class="nav-item">
                                        <button type="button" class="btn btn-dark" id="btnCancelarOrd" name="btnCancelarOrd">Cancelar</button>
                                    </li>
                                    <li class="nav-item ocultar">
                                        <button type="button" class="btn btn-secondary" id="btnAgreEnv" name="btnAgreEnv" disabled="">Agregar Envios</button>
                                    </li>
                                    <li class="nav-item ocultar">
                                        <a href="Files/Plantillas/Plantilla_xlsx.xlsx" type="button" class="btn btn-secondary" id="btnBajarPlant" name="btnBajarPlant">Descargar plantilla xlsx</a>
                                    </li>
                                </ul>
                            </div>               
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>

    <div id="formEnvios">

    </div>    
</div>