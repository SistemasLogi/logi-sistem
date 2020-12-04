<div class="toast show border-warning col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">REGISTRAR</strong>

    </div>
    <div class="toast-body">
        <div class="alert alert-dismissible alert-warning">
            <form id="formEmpleado">
                <fieldset>
                    <legend>Empleado</legend>        
                    <div class="row">
                        <div class="form-group form-group-sm col-lg-5">
                            <label for="inputNomEmp">Nombre Empleado</label>
                            <input type="text" class="form-control form-control-sm" id="inputNomEmp" name="inputNomEmp" placeholder="Nombre Empleado">
                        </div>
                        <div class="form-group form-group-sm col-lg-2">
                            <label for="selectTipDoc">Tipo Doc.</label>
                            <select class="form-control form-control-sm" id="selectTipDoc" name="selectTipDoc">

                            </select>
                        </div>
                        <div class="form-group form-group-sm col-lg-3">
                            <label for="inputNumEmp">N° Doc.</label>
                            <input type="text" class="form-control form-control-sm" id="inputNumEmp" name="inputNumEmp" placeholder="N° Documento"> 
                        </div>
                        <div class="form-group form-group-sm col-lg-2">
                            <label for="inputTelEmp">Teléfono</label>
                            <input type="text" class="form-control form-control-sm" id="inputTelEmp" name="inputTelEmp" placeholder="N° Tel. Fijo">
                        </div>
                    </div>                                           
                    <div class="row">
                        <div class="form-group form-group-sm col-lg-2">
                            <label for="inputCelEmp">Celular</label>
                            <input type="text" class="form-control form-control-sm" id="inputCelEmp" name="inputCelEmp" placeholder="N° Celular">
                        </div>
                        <div class="form-group form-group-sm col-lg-4">
                            <label for="inputDirEmp">Dirección</label>
                            <input type="text" class="form-control form-control-sm" id="inputDirEmp" name="inputDirEmp" placeholder="Dirección">
                        </div>
                        <div class="form-group form-group-sm col-lg-4">
                            <label for="inputEmailEmp">Email</label>
                            <input type="email" class="form-control form-control-sm" id="inputEmailEmp" name="inputEmailEmp" placeholder="Email">
                        </div>
                        <div class="form-group form-group-sm col-lg-2">
                            <label for="selectTipCargo">Cargo</label>
                            <select class="form-control form-control-sm" id="selectTipCargo" name="selectTipCargo">

                            </select>
                        </div>
                    </div> 
                    <div class="row">
                        <div class="form-group mb-2 col-lg-2">
                            <button type="submit" class="btn btn-primary" id="btnGuardaEmp" name="btnGuardaEmp">GUARDAR</button> 
                        </div>
                        <div class="form-group mb-2 col-lg-2">
                            <button type="button" class="btn btn-dark" id="btnCancelarEmp" name="btnCancelarEmp">CANCELAR</button>                   
                        </div>
                    </div>

                </fieldset>
            </form>
        </div>
    </div>
</div>
<div id="tabEmpActivos">

</div>
