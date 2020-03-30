<!DOCTYPE html>
<?php
session_start();
if (!isset($_SESSION["cliente_a"])) {
    header("location:index.php");
}
?>
<html lang="es">
    <head>
        <?php include './lib_css_js.php'; ?>
    </head>

    <body>

        <!--==========================
          Header
        ============================-->
        <?php include './navbar.php'; ?>
        <script src="js/Cliente/cliente.js" type="text/javascript"></script>

        <!--==========================
          Facts Section
        ============================-->
        <section id="facts"  class="wow fadeIn next">
            <div class="container margen_top">

                <header class="section-header">
                    <h2><?php echo $_SESSION["nombre_cli"]; ?></h2>
                    <!--<h4><p>Gracias a nuestros clientes por confiar en nosotros!</p></h4>-->
                </header>

                <div class="row">
                    <div class="col-md-3 wow fadeInUp">
                        <div class="list-group" id="list-tab" role="tablist">
                            <a class="list-group-item list-group-item-primary active" id="list-formRecolec-list" data-toggle="list" href="#list-formRecolec" role="tab" aria-controls="home">Solicitar Recolección</a>
                            <a class="list-group-item list-group-item-primary" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Informe</a>
                            <a class="list-group-item list-group-item-primary" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Pruebas Entrega</a>
                            <a class="list-group-item list-group-item-primary" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Tarifas</a>
                            <a class="list-group-item list-group-item-primary" id="list-tarifas-list" data-toggle="list" href="#list-tarifas" role="tab" aria-controls="settings">Indicadores</a>
                        </div>
                    </div>
                    <div class="col-md-9 wow fadeInUp">
                        <div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="list-formRecolec" role="tabpanel" aria-labelledby="list-formRecolec-list">

                            </div>
                            <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                                <div class="alert alert-dismissible alert-success">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong>Well done!</strong> You successfully read <a href="#" class="alert-link">this important alert message</a>.
                                </div>
                            </div>
                            <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                                <div class="alert alert-dismissible alert-warning">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <h4 class="alert-heading">Warning!</h4>
                                    <p class="mb-0">Best check yo self, you're not looking too good. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, <a href="#" class="alert-link">vel scelerisque nisl consectetur et</a>.</p>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
                                <div class="alert alert-dismissible alert-info">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong>Heads up!</strong> This <a href="#" class="alert-link">alert needs your attention</a>, but it's not super important.
                                </div>
                            </div>
                            <div class="tab-pane fade" id="list-tarifas" role="tabpanel" aria-labelledby="list-tarifas-list">
                                <div class="alert alert-dismissible alert-dark">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong>Heads up!</strong> This <a href="#" class="alert-link">alert needs your attention</a>, but it's not super important.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </section><!-- #facts -->

    </main>

    <?PHP // require './footer.php'; ?>

</body>
</html>
