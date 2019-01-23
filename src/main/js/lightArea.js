function colorAreaLight() {
  displayClikableArea();
}

function displayClikableArea() {
  $('.map').maphilight();

  $('#AreaEntranceLight').click(function(e) {
    onClickEntranceLightArea();
  });

  $('#OutDoorLight').click(function(e) {
    onClickOutDoorLightArea();
  });

  $('#BedRoomLight').click(function(e) {
    onClickBedRoomLightArea();
    console.log("test");
  });

  $('#LivingRoomLight').click(function(e) {
    onClickLivingRoomLightArea();
  });

  $('#OfficeLight').click(function(e) {
    onClickOfficeLightArea();
  });

  $('#BathRoomLight').click(function(e) {
    onClickBathRoomLightArea();
  });

  $('#AllTheLight').click(function(e) {
    onClickAllTheLightArea();

  });
}

function onClickEntranceLightArea() {
    var toggled = $("#ToggleBtnEntrance").jqxToggleButton('toggled');
    if (toggled) {
      $('#SwitchBtnEntrance').jqxSwitchButton('unCheck');
    }else {
      $('#SwitchBtnEntrance').jqxSwitchButton('check');
    }
}

function onClickOutDoorLightArea() {
    var toggled = $("#ToggleBtnOutDoor").jqxToggleButton('toggled');
    if (toggled) {
      $('#SwitchBtnOutDoor').jqxSwitchButton('unCheck');
    }else {
      $('#SwitchBtnOutDoor').jqxSwitchButton('check');
    }
}

function onClickBedRoomLightArea() {
    var data = $('#BedRoomLight').mouseout().data('maphilight') || {};
    data.alwaysOn = !data.alwaysOn;
    $('#BedRoomLight').data('maphilight', data).trigger('alwaysOn.maphilight');
}

function onClickLivingRoomLightArea() {
    var data = $('#LivingRoomLight').mouseout().data('maphilight') || {};
    data.alwaysOn = !data.alwaysOn
    $('#LivingRoomLight').data('maphilight', data).trigger('alwaysOn.maphilight');
}

function onClickOfficeLightArea() {
    var data = $('#OfficeLight').mouseout().data('maphilight') || {};
    data.alwaysOn = !data.alwaysOn;
    $('#OfficeLight').data('maphilight', data).trigger('alwaysOn.maphilight');
    if(data.alwayOn){
      scriptCall("/var/www/html/src/main/python/toggle.py off 2>&1");
      console.log(data.alwaysOn);
    }
    else  {
      scriptCall("/var/www/html/src/main/python/toggle.py on 2>&1");
      console.log(data.alwaysOn);
    }
}

function onClickBathRoomLightArea() {
    var data = $('#BathRoomLight').mouseout().data('maphilight') || {};
    data.alwaysOn = !data.alwaysOn;
    $('#BathRoomLight').data('maphilight', data).trigger('alwaysOn.maphilight');
}

function onClickAllTheLightArea() {
  var data = $('#AllTheLight').mouseout().data('maphilight') || {};
  data.alwaysOn = !data.alwaysOn
  $('#AllTheLight').data('maphilight', data).trigger('alwaysOn.maphilight');

  if (areaOff("#BedRoomLight")==data.alwaysOn) {
    onClickBedRoomLightArea();
  }
  if (areaOff("#AreaEntranceLight")==data.alwaysOn) {
    onClickEntranceLightArea();
  }
  if (areaOff("#OutDoorLight")==data.alwaysOn) {
    onClickOutDoorLightArea();
  }
  if (areaOff("#LivingRoomLight")==data.alwaysOn) {
    onClickLivingRoomLightArea();
  }
  if (areaOff("#BathRoomLight")==data.alwaysOn) {
    onClickBathRoomLightArea();
  }
  if (areaOff("#OfficeLight")==data.alwaysOn) {
    onClickOfficeLightArea();
  }
}
