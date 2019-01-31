<?php
function connect() {
  $mysqli = new mysqli('localhost', 'root', '', 'Enocean');
  return $mysqli;
}

function lastValueOf($idSensor) {
connect();
$sql = "SELECT data.Value
        FROM data
        INNER JOIN ( SELECT IdSensors,Value, MAX(Datetime) AS maxDate
                  FROM data GROUP BY IdSensors ) groupel ON data.IdSensors = groupel.IdSensors
                  AND Data.Datetime = groupel.maxDate
                  AND data.IdSensors
                  LIKE '$idSensor'";
$req = mysqli_query(connect(),$sql);
while($data = mysqli_fetch_assoc($req))
    {
    return $data['Value'];
    }

}





?>
