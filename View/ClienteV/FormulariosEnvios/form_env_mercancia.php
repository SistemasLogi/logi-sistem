<form>
    <fieldset>
        <legend>Agregar Envio</legend>
        <div class="row">
            <div class="form-group form-group-sm col-lg-2">
                <label for="inputGuia">N° Guia</label>
                <input type="text" class="form-control form-control-sm" id="inputGuia" name="inputGuia" placeholder="N° Guia">
            </div>
            <div class="form-group form-group-sm col-lg-2">
                <label for="inputPeso">Peso Kg</label>
                <input type="text" class="form-control form-control-sm" id="inputPeso" name="inputPeso" placeholder="Peso Kg">
            </div>
            <div class="form-group form-group-sm col-lg-2">
                <label for="inputAlto">Alto cm</label>
                <input type="text" class="form-control form-control-sm" id="inputAlto" name="inputAlto" placeholder="Alto cm">
            </div>
            <div class="form-group form-group-sm col-lg-2">
                <label for="inputAncho">Ancho cm</label>
                <input type="text" class="form-control form-control-sm" id="inputAncho" name="inputAncho" placeholder="Ancho cm">
            </div>
            <div class="form-group form-group-sm col-lg-2">
                <label for="inputAlto">Largo cm</label>
                <input type="text" class="form-control form-control-sm" id="inputLargo" name="inputLargo" placeholder="Largo">
            </div>
            <div class="form-group form-group-sm col-lg-2">
                <label for="inputCant">Cantidad</label>
                <input type="text" class="form-control form-control-sm" id="inputCant" name="inputCant" placeholder="Cantidad">
            </div>
            <div class="form-group col-lg-2" style="padding-top: 30px;">
                <button type="button" class="btn btn-secondary" id="btnMas" name="btnMas">+</button>
            </div>
        </div>                                    

        <button type="submit" class="btn btn-primary" id="btnGuarEnvios" name="btnGuarEnvios">Guardar Envios</button>
    </fieldset>
</form>