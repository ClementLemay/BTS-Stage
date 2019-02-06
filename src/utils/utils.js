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

function createSampleData(tab) {
  for(var i= 0; i < tab.length; i++) {
    if(isset(vreturn)){
      var vreturn = vreturn + ',{Test: '+tab[i]+' ; Moyenne : '+tab[i]+'}';
    }else {
      var vreturn = '{Test: '+tab[i]+' ; Moyenne : '+tab[i]+'}';
    }
  }
  vreturn += "];";
  return vreturn;
}

function getToday() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()); // even 32 is acceptable
    console.log(`${tomorrow.getFullYear()}/${tomorrow.getMonth() + 1}/${tomorrow.getDate()}`);
    return `${tomorrow.getFullYear()}/${tomorrow.getMonth() + 1}/${tomorrow.getDate()}`;
}

function sampleData (tab) {
  if(tab != 'undefined'){
    var température ='';
    var date = null;
    var data = [];
    var i =0;
    for(var key in tab) {
      data[i]={Date: key,Température: tab[key]}
      i=i+1;
    }
  }
  console.log(data);
  return data;
}
