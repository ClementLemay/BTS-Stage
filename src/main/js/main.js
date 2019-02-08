var mainData = null;

$(document).ready(function () {
  loadData();
});

function loadData() {
  showSpinner();
  jQuery.ajax({
     async: true,
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
       console.log(jqXHR);
       console.log(textStatus);
       console.log(errorThrown);
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

  initCurve();
  initClickableGauge(mainData);
  displayBarometer(mainData.getPressure());
  displayThermometer(mainData.getTemperature());
  displayDateTimeInput();
  displayComboBoxDate();
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

function scriptCall(name,room,state) {
  showSpinner();
  jQuery.ajax(
  {
    type:"POST",
    url:"server.php?service=scriptCall&Room="+ room +"&device=" + name + "&state="+ state,
    timeout: 5000,
    xhrFields: {
      withCredentials: true
    },
    success: function(data, textStatus, jqXHR) {
      hideSpinner();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      hideSpinner();
    }
  });
}

function graphicChange(date1,date2) {
  showSpinner();
  jQuery.ajax(
  {
    type:"POST",
    url:"server.php?service=graphicChange&startDate="+ date1 +"&endDate=" + date2,
    timeout: 5000,
    xhrFields: {
      withCredentials: true
    },
    success: function(data, textStatus, jqXHR) {
      hideSpinner();
      onDynamicTabloaded(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      hideSpinner();
    }
  });
}

function onDynamicTabloaded(data) {
  var dataValues = JSON.parse(data);
  mainData.setDynamicHistory(dataValues);
  var tab = mainData.getDynamicHistory();
  initCurve(tab);
}
