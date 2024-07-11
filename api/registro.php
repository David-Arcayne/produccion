<?php
require_once "configuraciones.php";
$ver=$_POST['ver'];
if($ver=="registrodivisas"){
    $obj = new Configuracion();
    $obj->registrodivisas($_POST['nombre'], $_POST['isocode'],$_POST['empresa']);
}

?>