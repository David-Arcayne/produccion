<?php
require_once "../../db/db.php";
class Configuracion extends DB{
    
    public function registrodivisas($nombre,$isocode,$empresa){
        $idempresa = $this->getidempresa($empresa);
        $registromoneda=$this->dbp->query("insert into moneda(iso_code,nom_moneda,empresa_idempresa)value('$isocode','$nombre','$idempresa')");
        $res="";
        if($registromoneda===true){
            $res=array("ok","Se registro correctamente","registrodivisa");
        }else{
            $res=array("Error","No se registro correctamente");

        }
        echo json_encode($res);
    }
    public function listardivisas($empresa){
        $lista=[];
        $idempresa = $this->getidempresa($empresa);
        $getdivisa = $this->dbp->query("select m.idmoneda,m.nom_moneda,m.iso_code from moneda as m where m.empresa_idempresa = '$idempresa'");
        while($qwe=$this->dbp->fetch($getdivisa)){
            $res=array("id"=>$qwe[0],"nombre"=>$qwe[1],"isocode"=>$qwe[2]);
            array_push($lista,$res);
        }
        echo json_encode($lista);
    }
    public function getidempresa($md5){
        $registro=$this->dbe->query("select * from organizacion where md5(idorganizacion)='$md5'");
        $qwe=$this->dbe->fetch($registro);
        return $qwe['idorganizacion'];
    }
    

    
    
}
?>