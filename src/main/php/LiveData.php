<?php
function LiveJson () {
$temperature=shell_exec('python /var/www/html/src/main/python/scriptSonde.py');

  $data= array();
  $data["Temperature"]=$temperature;
  $data["Pressure"]= 150;
  $data["EntranceLight"]= false;
  $data["OutdoorLight"]= true;
  $data["History"]= array(
    "2018" => array("Janvier"=>7,"Février"=>5,"Mars"=>7,"Avril"=>13,"Mai"=>15,"Juin"=>17,"Juillet"=>22,"Aout"=>22,"Septembre"=>18,"Otobre"=>13,"Novembre"=>8,"Décembre"=>6),
    "1961" => array("Janvier"=>3,"Février"=>4,"Mars"=>6,"Avril"=>9,"Mai"=>13,"Juin"=>16,"Juillet"=>19,"Aout"=>19,"Septembre"=>16,"Otobre"=>12,"Novembre"=>6,"Décembre"=>3)
  );
   return $data;
}

?>
