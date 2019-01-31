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





?>
