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

  $('#BedRoom').click(function(e) {
    onClickBedRoomLightArea();
  });

  $('#LivingRoom').click(function(e) {
    onClickLivingRoomLightArea();
  });

  $('#Office').click(function(e) {
    onClickOfficeLightArea();
  });

  $('#BathRoom').click(function(e) {
    onClickBathRoomLightArea();
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
    data.alwaysOn = !data.alwaysOn;
    $('#LivingRoomLight').data('maphilight', data).trigger('alwaysOn.maphilight');
}

function onClickOfficeLightArea() {
    var data = $('#OfficeLight').mouseout().data('maphilight') || {};
    data.alwaysOn = !data.alwaysOn;
    $('#OfficeLight').data('maphilight', data).trigger('alwaysOn.maphilight');
}

function onClickBathRoomLightArea() {
    var data = $('#BathRoomLight').mouseout().data('maphilight') || {};
    data.alwaysOn = !data.alwaysOn;
    $('#BathRoomLight').data('maphilight', data).trigger('alwaysOn.maphilight');
}
