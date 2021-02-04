<div id="sectionConten">
    <div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
        <div class="toast-header">
            <strong class="mr-auto">CREAR OS por CLIENTE</strong>
        </div>
        <div class="toast-body row">        
            <div class="alert alert-dismissible alert-secondary col-lg-12" style="border-radius: 0.5rem;">
                <div class="row">
                    <div class="alert alert-dismissible alert-light col-lg-12  border-warning" style="border-radius: 0.5rem;">
                        <form id="form_guarda_os">
                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <label for="selCliente">Cliente</label>
                                    <select id="selCliente" name="selCliente" class="form-control form-control-sm">

                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="selSucur">Sucursal</label>
                                    <select id="selSucur" name="selSucur" class="form-control form-control-sm">

                                    </select>
                                </div>
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
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label for="inpDirec">Dirección</label>
                                    <input type="text" class="form-control form-control-sm" id="inpDirec" name="inpDirec" placeholder="Dirección">
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="selCiudad">Ciudad</label>
                                    <select id="selCiudad" name="selCiudad" class="form-control form-control-sm">

                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="inpTel">Teléfono</label>
                                    <input type="text" class="form-control form-control-sm" id="inpTel" name="inpTel" placeholder="Teléfono">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="inpPerCont">Persona Contacto</label>
                                    <input type="text" class="form-control form-control-sm" id="inpPerCont" name="inpPerCont" placeholder="Contacto">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-8">
                                    <label for="texaObserv">Observaciones</label>
                                    <textarea class="form-control" id="texaObserv" name="texaObserv" rows="1"></textarea>
                                </div> 
                                <div class="form-group col-md-4">
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
<div id="sectionDatOS">

</div>