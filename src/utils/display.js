function initCurve(tab) {
  var data = sampleData(tab);
 var settings = {
     title: "Historique des température",
     description: "",
     enableAnimations: true,
     animationDuration: 1000,
     enableAxisTextAnimation: true,
     showLegend: true,
     padding: {
         left: 5,
         top: 5,
         right: 25,
         bottom: 5
     },
     titlePadding: {
         left: 0,
         top: 0,
         right: 0,
         bottom: 10
     },
     source: data,
     categoryAxis: {
         unitInterval: 1,
         gridLinesInterval: 2,
         valuesOnTicks: false
     },
     colorScheme: 'scheme05',
     seriesGroups: [{
         type: 'spline',
         columnsGapPercent: 50,
         alignEndPointsWithIntervals: true,
         xAxis: {
            dataField: 'Date',
            unitInterval: countNbValues(),
            tickMarks: {
              visible: true,
              interval: 1
            },
            gridLinesInterval: {
              visible: true,
              interval: 1
            },
            valuesOnTicks: true,
            padding: {
              bottom: 10
            },
            labels: {
                angle: -45,
                rotationPoint: 'topright',
                offset: { x: 0, y: 0 }
              },
            },
           valueAxis: {
               minValue: 15,
               maxValue: 25,
               description: 'Température en °C'
         },
         series: [{
             dataField: 'Température',
             displayText: 'Température'
         }]
     }]
 };
 displayCurve(settings);
 refresh(tab);

 function refresh(tab) {
   var i=0;
   for (var key in tab) {
     data[i].Température = tab[key];
     data[i].Date = key;
     var i=i+1;
   }
   displayCurve(settings);
   $('#chartContainer').jqxChart('update');
  }

  function countNbValues() {
    if (data.length>30) {
      return 2;
    } else {
      return 1;
    }
  }
}

function initClickableGauge(data) {
  $('#container').jqxKnob({
      value: data.getPressure(),
      min: 0,
      max: 220,
      startAngle: 120,
      endAngle: 420,
      snapToStep: true,
      rotation: 'clockwise',
      style: { stroke: '#dfe3e9', strokeWidth: 3, fill: { color: '#fefefe', gradientType: "linear", gradientStops: [[0, 1], [50, 0.9], [100, 1]] } },
      marks: {
          colorRemaining: { color: 'grey', border: 'grey' },
          colorProgress: { color: '#00a4e1', border: '#00a4e1' },
          type: 'line',
          offset: '71%',
          thickness: 2,
          size: '6%',
          majorSize: '9%',
          majorInterval: 10,
          minorInterval: 2
      },
      labels: {
          offset: '88%',
          step: 40,
          visible: true
      },
      progressBar: {
          style: { fill: '#00a4e1', stroke: 'grey' },
          size: '9%',
          offset: '60%',
          background: { fill: 'grey', stroke: 'grey' }
      },
      pointer: { type: 'arrow', style: { fill: '#00a4e1', stroke: 'grey' }, size: '59%', offset: '49%', thickness: 20 },
      width: 200
    });

    var inputOptions = {
        width: 180,
        height: '40px',
        decimal: data.getPressure(),
        min: 0,
        max: 100,
        textAlign: 'center',
        decimalDigits: 1,
        inputMode: 'simple',
      };
        displayClickableGauge(data, inputOptions);
  }

function initLightArea(entranceLight,outdoorLight) {
  if(outdoorLight)
  {
    var data = $('#OutDoorLight').mouseout().data('maphilight') || {};
    data.alwaysOn = !data.alwaysOn;
    $('#OutDoorLight').data('maphilight', data).trigger('alwaysOn.maphilight');
  }

  if(entranceLight) {
    var data = $('#AreaEntranceLight').mouseout().data('maphilight') || {};
    data.alwaysOn = !data.alwaysOn;
    $('#AreaEntranceLight').data('maphilight', data).trigger('alwaysOn.maphilight');
  }
}

function displayMessage(msg,error) {
  if (error==false) {
    $("#messageNotification").html(msg);
    $("#messageNotification").jqxNotification(
      {
        width: 250, position: "bottom-left", opacity: 0.9,
        autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "success"
      });
    } else {
      $("#messageNotification").html(msg);
      $("#messageNotification").jqxNotification(
        {
          width: 250, position: "bottom-left", opacity: 1,
          autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 5000, template: "error"
        });
      }
      $("#messageNotification").jqxNotification("open");
    }

function displayCurve(settings) {
    $('#chartContainer').jqxChart(settings);
}

function displayClickableGauge(data, inputOptions) {
  var input = $('<div class="inputField">');
  $('#container').append(input);

  $(input).jqxNumberInput(inputOptions);
  $(input).on('mousedown', function(event){
      event.stopPropagation();
  });
  $(input).on('keyup', function () {
      var val = $(this).val();
      $('#container').val(val);
  });
  $(input).on('change', function () {
      var val = $(this).val();
      $('#container').val(val);

  });
  $('#container').on('change', function (event) {
      if (event.args.changeSource == 'propertyChange' || event.args.changeSource == 'val') { return; }
      $(input).val(event.args.value);
      displayBarometer(event.args.value);
      data.setPressure(event.args.value);
      sendClientInfo();
  });
}

function displayThermometer(Temperature) {
    var majorTicks = { size: '10%', interval: 5 };
    var minorTicks = { size: '5%', interval: 1, style: { 'stroke-width': 1, stroke: '#aaaaaa'} };
    var labels = { interval: 5 };
    $('#gaugeTherm').jqxLinearGauge(
      {
        orientation: 'vertical',
        labels: labels,
        ticksMajor: majorTicks,
        ticksMinor: minorTicks,
        max: 30,
        min: 10,
        value: -20,
        pointer: { size: '6%' },
        colorScheme: 'scheme05',
        ranges: [
        { startValue: 10, endValue: 15, style: { fill: '#FFF157', stroke: '#FFF157'} },
        { startValue: 15, endValue: 25, style: { fill: '#FFA200', stroke: '#FFA200'} },
        { startValue: 25, endValue: 30, style: { fill: '#FF4800', stroke: '#FF4800'}}]
    });
    $('#gaugeTherm').jqxLinearGauge('value', Temperature);

    $('#isVerticalCheckbox').on('change', function(e) {
        if (e.args.checked) {
            $('#gaugeTherm').jqxLinearGauge('width', '100px');
            $('#gaugeTherm').jqxLinearGauge('height', '300px');
            $('#gaugeTherm').jqxLinearGauge('orientation', 'vertical');
        } else {
            $('#gaugeTherm').jqxLinearGauge('height', '100px');
            $('#gaugeTherm').jqxLinearGauge('width', '300px');
            $('#gaugeTherm').jqxLinearGauge('orientation', 'horizontal');
        }
    });
    $('#showTicksCheckbox').on('change', function(e) {
        if (e.args.checked) {
            majorTicks.visible = true;
            minorTicks.visible = true;
        } else {
            majorTicks.visible = false;
            minorTicks.visible = false;
        }
        $('#gaugeTherm').jqxLinearGauge('ticksMajor', majorTicks);
        $('#gaugeTherm').jqxLinearGauge('ticksMinor', minorTicks);
    });

}

function displayBarometer(pressure) {
  $('#gauge').jqxGauge(
    {
        ranges: [{ startValue: 0, endValue: 130, style: { fill: '#4cb848', stroke: '#4cb848' }, startDistance: 0, endDistance: 0 },
                 { startValue: 130, endValue: 180, style: { fill: '#fad00b', stroke: '#fad00b' }, startDistance: 0, endDistance: 0 },
                 { startValue: 180, endValue: 220, style: { fill: '#e53d37', stroke: '#e53d37' }, startDistance: 0, endDistance: 0}],
        cap: { size: '5%', style: { fill: '#2e79bb', stroke: '#2e79bb'} },
        border: { style: { fill: '#8e9495', stroke: '#7b8384', 'stroke-width': 1 } },
        ticksMinor: { interval: 5, size: '5%' },
        ticksMajor: { interval: 20, size: '10%' },
        labels: { position: 'outside', interval: 20 },
        pointer: { style: { fill: '#2e79bb' }, width: 5 },
        animationDuration: 2000
    });
    $('#gauge').jqxGauge('value', pressure);
}

function displayLoader() {
$("#jqxLoader").jqxLoader({
   width: 100,
   height: 60,
   imagePosition: 'top'
  });
}

function displayInsideLightSwitch() {
  $('#SwitchBtnEntrance').jqxSwitchButton({
    height: 27,
    width: 81,
    checked: mainData.getEntranceLight()
  });

  $('#SwitchBtnEntrance').on('checked', onCheckedEntranceLightSwitch);
  $('#SwitchBtnEntrance').on('unchecked', onUncheckedEntranceLightSwitch);
}

function displayOutsideLightSwitch() {
  $('#SwitchBtnOutDoor').jqxSwitchButton({
    height: 27,
    width: 81,
    checked: mainData.getOutdoorLight()
  });

  $('#SwitchBtnOutDoor').on('checked', function (event) {
    onCheckedOutDoorLightSwitch();
  });

  $('#SwitchBtnOutDoor').on('unchecked', function (event) {
    onUncheckedOutDoorLightSwitch();
  });
}

function displayDateTimeInput() {
  $("#DateTimeInput").jqxDateTimeInput({ width: 250, height: 25,  selectionMode: 'range', formatString: 'd', max:getToday()});
}

function displayComboBoxDate() {
  var source = [
                    "Choisissez une période",
                    "Année en cours",
                    "Mois en cours",
                    "Jour en cours"
		        ];
  $("#ComboBoxDate").jqxComboBox({selectedIndex: 0, source: source, width: '200px', height: '30px'});
}
