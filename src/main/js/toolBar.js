function displayToolBar() {
  displayLightSwitches();
  displayLightButtons();
  onClickDateTimeInput();
  onChangeComboBoxDate();
  onChangeDateTimeInput();
}

function displayLightButtons() {
  displayEntranceLightButtons();
  displayOutDoorLightButtons();
}

function displayEntranceLightButtons() {
  $("#ToggleBtnEntrance").jqxToggleButton({
    width: '200',
    toggled: mainData.getEntranceLight()
  });

  $("#ToggleBtnEntrance").on('click', onClickEntranceLightButton);
}

function displayOutDoorLightButtons() {

  $("#ToggleBtnOutDoor").jqxToggleButton({
    width: '200',
    toggled: mainData.getOutdoorLight()
  });

  $("#ToggleBtnOutDoor").on('click',onClickOutDoorLightButton);
}

function onClickEntranceLightButton() {
  var toggled = $("#ToggleBtnEntrance").jqxToggleButton('toggled');
  $("#ToggleBtnEntrance")[0].value = 'Lumière Entrée';
  if (toggled) {
    mainData.setEntranceLight(false);
    $('#SwitchBtnEntrance').jqxSwitchButton('check');
  }
  else {
    mainData.setEntranceLight(true);
    $('#SwitchBtnEntrance').jqxSwitchButton('unCheck');
  }
}

function onClickOutDoorLightButton() {
  var toggled = $("#ToggleBtnOutDoor").jqxToggleButton('toggled');
  $("#ToggleBtnOutDoor")[0].value = 'Lumière Extérieur';
  if (toggled) {
    mainData.setOutdoorLight(false);
    $('#SwitchBtnOutDoor').jqxSwitchButton('check');
  }
  else {
    mainData.setOutdoorLight(true);
    $('#SwitchBtnOutDoor').jqxSwitchButton('unCheck');
  }
}

function displayLightSwitches() {
  displayInsideLightSwitch();
  displayOutsideLightSwitch();
}

function onCheckedEntranceLightSwitch() {
  mainData.setEntranceLight(true);
  $('#ToggleBtnEntrance').jqxToggleButton('unCheck');

  sendClientInfo();

  var data = $('#AreaEntranceLight').mouseout().data('maphilight') || {};
  data.alwaysOn = !data.alwaysOn;
  $('#AreaEntranceLight').data('maphilight', data).trigger('alwaysOn.maphilight');
}

function onUncheckedEntranceLightSwitch() {
  mainData.setEntranceLight(false);
  $('#ToggleBtnEntrance').jqxToggleButton('check');

  sendClientInfo();

  var data = $('#AreaEntranceLight').mouseout().data('maphilight') || {};
  data.alwaysOn = !data.alwaysOn;
  $('#AreaEntranceLight').data('maphilight', data).trigger('alwaysOn.maphilight');
}

function onCheckedOutDoorLightSwitch() {
  mainData.setOutdoorLight(false);

  $('#ToggleBtnOutDoor').jqxToggleButton('unCheck');
  sendClientInfo();

  var data = $('#OutDoorLight').mouseout().data('maphilight') || {};
  data.alwaysOn = !data.alwaysOn;
  $('#OutDoorLight').data('maphilight', data).trigger('alwaysOn.maphilight');
}

function onUncheckedOutDoorLightSwitch() {
  mainData.setOutdoorLight(true);

  $('#ToggleBtnOutDoor').jqxToggleButton('check');
  sendClientInfo();

  var data = $('#OutDoorLight').mouseout().data('maphilight') || {};
  data.alwaysOn = !data.alwaysOn;
  $('#OutDoorLight').data('maphilight', data).trigger('alwaysOn.maphilight');
}

function onClickDateTimeInput() {
  $("#DateTimeInput").on('change', function (event) {
    var range = $("#DateTimeInput").jqxDateTimeInput('getRange');
    console.log(range);
    $("#jqxWidget").jqxDateTimeInput('setRange', range.from, range.to);
    if (range.from != null) {
      var strStartDate = range.from.toLocaleDateString();
      var strEndDate = range.to.toLocaleDateString();
      var startDate = strStartDate.substr(6,9)+"-"+strStartDate.substr(3,2)+"-"+strStartDate.substr(0,2)+" 00:00";
      var endDate = strEndDate.substr(6,9)+"-"+strEndDate.substr(3,2)+"-"+strEndDate.substr(0,2)+" 23:59";

      graphicChange(startDate,endDate);
    }
  });
}

function onChangeDateTimeInput() {
  $('#DateTimeInput').on('change', function (event)
{
$("#ComboBoxDate").jqxComboBox('selectItem', 'Choisissez une période' );
});
}

function onChangeComboBoxDate() {
  $('#ComboBoxDate').on('change', function (event)
  {
    var strDateNow=getToday();
    var args = event.args;
    var item = args.item;
    if (args) {
      var label = item.label;
      switch (label) {
        case "Année en cours":
        var strYear=strDateNow.substring(0,4);
        dateReturn1 = strYear+'/1/1';
        dateReturn2 = strYear+'/12/31';
        console.log(dateReturn1+'_'+ dateReturn2);
          break;
        case "Mois en cours":
        var strMonth=strDateNow.substring(0,6);
        dateReturn1 = strMonth+'/1';
        dateReturn2 = strMonth+'/31';
        console.log(dateReturn1+'_'+ dateReturn2);
          break;
        case "Jour en cours":
        dateReturn1 = strDateNow+ ' 00:00';
        dateReturn2 = strDateNow+' 23:59';
        console.log(dateReturn1+'_'+ dateReturn2);
          break;
      }

      //$("#DateTimeInput").jqxDateTimeInput('setRange', dateReturn1, dateReturn2 );
      graphicChange(dateReturn1,dateReturn2);
    }
  });
}
