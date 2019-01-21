var mainData = null;

$(document).ready(function () {
  loadData();
});

function loadData() {
  showSpinner();
  jQuery.ajax({
     type: "GET",
     url: "server.php?service=loadData",
     timeout: 30000,
     xhrFields: {
       withCredentials: true
     },
     success: function(data, textStatus, jqXHR) {
       onDataLoaded(data);
       hideSpinner();
     },
     error: function(jqXHR, textStatus, errorThrown) {
       hideSpinner();
       handleError(data.status, "technical error");
     }
   });
 }

function onDataLoaded(data) {
  var dataValues = JSON.parse(data);
  mainData = new displayProperties(
    dataValues.Temperature,
    dataValues.Pressure,
    dataValues.EntranceLight,
    dataValues.OutdoorLight,
    dataValues.History[2018],
    dataValues.History[1961]
  );

  initCurve(mainData.getHistory2018(), mainData.getHistory1961());
  initClickableGauge(mainData);
  displayBarometer(mainData.getPressure());
  displayThermometer(mainData.getTemperature());
  displayToolBar();
  initLightArea(mainData.getEntranceLight(),mainData.getOutdoorLight());
  colorAreaLight();
}

function sendClientInfo() {
    showSpinner();
    data = Object.assign(
      dataInJson(),
      randomID()
    );
    console.log(data);
    jQuery.ajax(
    {
      type:"POST",
      url:"server.php?service=sendClientInfo",
      data: data,
      timeout: 5000,
      xhrFields: {
        withCredentials: true
      },
      success: function(data, textStatus, jqXHR) {
        onClientInfoLoaded(data);
        hideSpinner();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        handleError(500, "");
        hideSpinner();
      }
    });

    function handleError(code, message) {
      console.error("[index] server call failure : " + code + ", " + message);
      displayMessage("Une erreur est survenue",true);
      hideSpinner();
    }
}

function onClientInfoLoaded(request) {
  var resultJSON = JSON.parse(request);
  var message = "Request number : " + resultJSON["ID"] + " received";
  displayMessage(message, false);
}

function dataInJson() {
  var temperature = {temperature : mainData.getTemperature()};
  var pressure = {pressure : mainData.getPressure()};
  var entranceLight = {entranceLight : mainData.getEntranceLight()};
  var outdoorLight = {outdoorLight : mainData.getOutdoorLight()};
  var obj = Object.assign({}, temperature, pressure, entranceLight, outdoorLight);
  return (obj);
}
