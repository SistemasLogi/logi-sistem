<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>INGRESO</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport">

        <!-- Bootstrap CSS File -->
        <link href="lib/bootstrap/css/bootstrap.css" rel="stylesheet">
        <link href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>

        <!-- JavaScript Libraries -->
        <script src="lib/jquery/jquery-3.3.1.js" type="text/javascript"></script>
        <script src="lib/jquery/jquery.min.js" type="text/javascript"></script>
        <script src="js/jquery.validate.js" type="text/javascript"></script>
        <script src="js/additional-methods.js" type="text/javascript"></script>
        <script src="js/localization/messages_es.js" type="text/javascript"></script>

        <script src="js/Inicio_Sesion/login.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="container">
            <div class="row text-center m-auto mt-lg-5"> 
                <div class="col-lg-4">

                </div>
                <div class="col-lg-4">
                    <header class="section-header">
                        <h3>ACCESO CLIENTES</h3>
                        <!--<h4><p>Gracias a nuestros clientes por confiar en nosotros!</p></h4>-->
                    </header>
                    <form id="formLog" name="formLog">
                        <fieldset>
                            <div class="form-group">
                                <input type="text" class="form-control" id="inputUsuario" name="inputUsuario" placeholder="Usuario">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" id="inputClave" name="inputClave" placeholder="Contraseña">
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn btn-success" id="btnIngresar" name="btnIngresar">INGRESAR</button>  
                            </div>

                        </fieldset>
                    </form>  
                </div>
                <div class="col-lg-4">

                </div>
            </div>
        </div>            
    </body>
</html>
