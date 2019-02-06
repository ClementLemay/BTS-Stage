<?php
function connect() {
  $mysqli = new mysqli('127.0.0.1', 'root', 'stage', 'Enocean');

  return $mysqli;
}

function lastValueOf($idSensor) {
connect();
$sql = "SELECT DATA.Value
        FROM DATA
        INNER JOIN (
            SELECT IdSensors,Value, MAX(Datetime) AS maxDate
            FROM DATA GROUP BY IdSensors ) groupel ON DATA.IdSensors = groupel.IdSensors
            AND DATA.Datetime = groupel.maxDate
            AND DATA.IdSensors LIKE '$idSensor';";
$req = mysqli_query(connect(),$sql);
while($data = mysqli_fetch_assoc($req))
    {
    $vreturn = $data['Value'];
    }
if ($vreturn == 0 || $vreturn == 1) {
    $vreturn=boolval($vreturn);
  }
return $vreturn;
}


Function tempController($stringStartDate,$stringEndDate) {
connect();
$nbDays = diffDateToInt($stringStartDate,$stringEndDate);
$vreturn=array();
$i=0;
$sql="SELECT Value, Datetime FROM DATA WHERE IdSensors='2' AND Datetime >'$stringStartDate' AND Datetime <'$stringEndDate' ORDER BY Datetime";
$req = mysqli_query(connect(),$sql);

while($row=mysqli_fetch_array($req)) {
  $arrayDate=array($row['Datetime']);
  $arrayValue=array($row['Value']);
  $Array_map[$i] = array_map(null,$arrayDate,$arrayValue);
  $i++;
  }
  if ($nbDays>30) {
    $vreturn = AvgOfArrayMap($Array_map,0,7,1);
    return $vreturn;
  }
  if ($nbDays<30 && $nbDays>7) {
    $vreturn = AvgOfArrayMap($Array_map,0,10,2);
    return $vreturn;
  }
  if ($nbDays<=7 && $nbDays>1) {
    $vreturn = AvgOfArrayMap($Array_map,0,10,3);
    return $vreturn;
  }
  if ($nbDays<=1) {
    $vreturn = AvgOfArrayMap($Array_map,11,17,4);
    return $vreturn;
  }
}


function AvgOfArrayMap($AreaMap,$strBegin,$strEnd,$typeStrDate) {
$mainTab = array();
$nbValue=1;
  foreach($AreaMap as $tab) {
  $subTab = $tab[0];
  $currentTemp = $subTab[1];
  $stringDate = substr($subTab[0],$strBegin,$strEnd);
    if (isset($mainTab[$stringDate])) {
    $nbValue++;
    $lastTemp = $mainTab[$stringDate];
    $currentTemp += $lastTemp[1];
    $mainTab[$stringDate] = [$stringDate,$currentTemp,$nbValue];
    } else {
    $nbValue=1;
    $mainTab[$stringDate] = [$stringDate,$currentTemp,$nbValue];
    }
  }
  foreach ($mainTab as $tab) {
    $averageTemp = $tab[1]/$tab[2];
    $tabReturn[dateToString($tab[0],$typeStrDate)]= $averageTemp;
  }
  return $tabReturn;
}
?>
