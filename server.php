<?php
require ("src/main/php/mock.php");
require ("src/utils/utils.php");

if (isset($_REQUEST['service'])) {
  $service = $_REQUEST['service'];
  switch ($service){
    case "loadData":
      echo json_encode(DataJson());
      break;
    case "sendClientInfo":
      sleep(2);
      printLog();
      break;
  }
} else
{

}

function printLog() {
  if (IsNotNull()) {
    try {
      $id = $_REQUEST['ID'];
      $temperature =$_REQUEST['temperature'];
      $pressure = $_REQUEST['pressure'];
      $EntranceLight = $_REQUEST['entranceLight'];
      $OutdoorLight = $_REQUEST['outdoorLight'];

      $Message = "[$id] Temperature : $temperature /Pressure : $pressure /Entrance light : $EntranceLight /Outdoor Light : $OutdoorLight";

      log_info($Message);
      serverResponse($id);
    }
    catch(Exeption $e) {
      log_error("Error " + $e);
    }
  }
  else {
    $Message = "one or more variables are null" + $e;
      log_warning($Message);
  }
}

function IsNotNull() {
  $vreturn = false;
  if (isset($_REQUEST['ID'])
    || isset($_REQUEST['temperature'])
    || isset($_REQUEST['pressure'])
    || isset($_REQUEST['entranceLight'])
    || isset($_REQUEST['outdoorLight'])) {
      $vreturn = true;
   return $vreturn;
 } else
 {
   return $vreturn;
 }
}
?>
