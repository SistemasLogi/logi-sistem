<?php session_start(); ?>
<div id="sectionContenClSuc">
    <div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
        <div class="toast-header">
            <strong class="mr-auto">RECOLECCIÓN / ORDEN DE SERVOCIO</strong>

        </div>
        <div class="toast-body row">
            <div class="alert alert-dismissible alert-primary col-lg-12">
                <div class="toast show border-warning col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
                    <div class="row">
                        <div class="alert alert-dismissible alert-light col-lg-12" style="border-radius: 0.5rem;">
                            <form id="formOrdenServ">
                                <div class="form-row">
                                    <input type="text" class="form-control form-control-sm" id="inpTdCli" name="inpTdCli" value="<?php echo $_SESSION["tipo_doc"]; ?>" style="display: none;">
                                    <input type="text" class="form-control form-control-sm" id="inpNumCli" name="inpNumCli" value="<?php echo $_SESSION["numero_doc"]; ?>"  style="display: none;">
                                    <?php if (isset($_SESSION["cliente_a"])) {
                                        ?>
                                        <div class="form-group col-md-3">
                                            <label for="selSucur">Sucursal</label>
                                            <select id="selSucur" name="selSucur" class="form-control form-control-sm">

                                            </select>
                                        </div>
                                        <?php
                                    } elseif (isset($_SESSION["sucursal"])) {
                                        ?>
                                        <div class="form-group col-md-3">
                                            <label for="inputNumSucu">Suc N°</label>
                                            <input type="text" class="form-control form-control-sm" id="selSucur" name="selSucur" value="<?php echo $_SESSION["numero_suc"]; ?>" readonly="">
                                        </div>
                                        <?php
                                    }
                                    ?>
                                    <div class="form-group col-md-3">
                                        <label for="selServi">Tipo Servicio</label>
                                        <select id="selServi" name="selServi" class="form-control form-control-sm">

                                        </select>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="selEnvio">Tipo Envio</label>
                                        <select id="selEnvio" name="selEnvio" class="form-control form-control-sm">

                                        </select>
                                    </div> 
                                    <div class="form-group col-md-3">
                                        <label for="inpDirec">Dirección</label>
                                        <input type="text" class="form-control form-control-sm" id="inpDirec" name="inpDirec" value="<?php echo $_SESSION["direccion_suc"]; ?>" placeholder="Dirección">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-2">
                                        <label for="selCiudad">Ciudad</label>
                                        <select id="selCiudad" name="selCiudad" class="form-control form-control-sm">

                                        </select>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="inpTel">Teléfono</label>
                                        <input type="text" class="form-control form-control-sm" id="inpTel" name="inpTel" placeholder="Teléfono">
                                    </div>
                                    <div class="form-group col-md-5">
                                        <label for="texaObserv">Observaciones</label>
                                        <textarea class="form-control" id="texaObserv" name="texaObserv" rows="1"></textarea>
                                    </div> 
                                    <div class="form-group col-md-3">
                                        <button type="submit" class="btn btn-primary mt-4" id="btnGuardaOS" name="btnGuardaOS">Guardar</button>
                                        <button type="button" class="btn btn-dark mt-4" id="btnCancelOS" name="btnCancelOS">Cancelar</button>                               
                                    </div> 
                                </div>                                                      
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="divMensaje">

</div>
