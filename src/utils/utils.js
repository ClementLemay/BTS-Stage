function showSpinner() {
  $("#jqxLoader").jqxLoader({
    width: 100,
     height: 60,
      imagePosition: 'top'
  });
   $('#jqxLoader').jqxLoader('open');
   $("#spinner_mask").show();
}

function hideSpinner() {
	$('#jqxLoader').jqxLoader('close');
  $("#spinner_mask").hide();
}

function randomID() {
  var tabID = new Array();
  var ID = Math.floor((Math.random() * 8999) + 1000);
  tabID["ID"] = ID;
  return(tabID);
}

function areaOff(areaName){
  var data = $(areaName).mouseout().data('maphilight') || {};
  return !data.alwaysOn;
}
