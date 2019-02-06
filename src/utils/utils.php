<?php
function getRooPath() {
	$rootPath = $_SERVER["DOCUMENT_ROOT"];
	if (isset($_SERVER["REQUEST_URI"])) {
		$projectPath = $_SERVER["REQUEST_URI"];
		$projectPath = substr($projectPath, 0, strpos($projectPath, '/', 1));
		$rootPath = $rootPath.$projectPath;
	}
	return $rootPath;
}

function getLogFileName() {
	$FileName = "server.log";
	if (isset($GLOBALS["LOG_FILENAME"]) && !empty($GLOBALS["LOG_FILENAME"])) {
		$FileName = $GLOBALS["LOG_FILENAME"];
	}
	return $FileName;
}

function log_info($pMessage) {
	error_log(date("Y-m-d H:i:s")." [".session_id()."] [INFO] ".$pMessage."\n", 3, getRooPath().'/logs/'.getLogFileName());
}

function log_debug($pMessage) {
	error_log(date("Y-m-d H:i:s")." [".session_id()."] [DEBUG] ".$pMessage."\n", 3, getRooPath().'/logs/'.getLogFileName());
}

function log_warning($pMessage) {
	error_log(date("Y-m-d H:i:s")." [".session_id()."] [WARNING] ".$pMessage."\n", 3, getRooPath().'/logs/'.getLogFileName());
}

function log_error($pMessage) {
	error_log(date("Y-m-d H:i:s")." [".session_id()."] [ERROR] ".$pMessage."\n", 3, getRooPath().'/logs/'.getLogFileName());
}

function serverResponse($id) {
  $request = array();
  $request["ID"] = $id;
  echo json_encode($request);
}

function diffDateToInt($StringDateDeb,$StringDateFin) {
	$DateDeb = new DateTime($StringDateDeb);
	$DateFin = new DateTime($StringDateFin);
	$interval=$DateDeb->diff($DateFin);
	$interval=$interval->format('%R%a days');
	return $interval;
}

function stringToDate($string) {
	$date = new DateTime($string);
	return $date;
}

function dateToString($strDate,$type) {
	$date = new DateTime($strDate);
	switch ($type) {
		case '1':
			$date = date("F", mktime(0,0, 0, $date->format('m'), $date->format('d'), $date->format('Y')));
			break;

		case '2':
			$date = date("j \ F", mktime(0,0, 0, $date->format('m'), $date->format('d'), $date->format('Y')));
			break;

		case '3':
			$date = date("D j \ F", mktime(0,0, 0, $date->format('m'), $date->format('d'), $date->format('Y')));
			break;

		case '4':
			$date = substr($strDate,11,16);
			break;
	}
	return $date;
}
?>
