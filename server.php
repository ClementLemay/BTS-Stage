<?php
require ("src/main/php/mock.php");
require ("src/main/php/LiveData.php");
require ("src/utils/utils.php");

if (isset($_REQUEST['service'])) {
  $service = $_REQUEST['service'];
  switch ($service){
    case "loadData":
      if (empty($Test=shell_exec('python /var/www/html/src/main/python/scriptSonde.py'))) {
        echo json_encode(MockJson());
      } else
      {
      echo json_encode(LiveJson());
      }
      break;
    case "sendClientInfo":
      printLog();
      break;
    case "scriptCall":
    $url = $_REQUEST['url'];
      $log = shell_exec("python /var/www/html/src/main/python/toggle.py on 2>&1");
      echo $log;
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
