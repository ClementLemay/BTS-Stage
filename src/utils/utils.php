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
?>
