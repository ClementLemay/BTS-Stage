class displayProperties {

 constructor(temperature, pressure, entranceLight, outdoorLight, history2018, history1961){
    this.temperature = temperature;
    this.pressure = pressure;
    this.entranceLight = entranceLight;
    this.outdoorLight = outdoorLight;
    this.history = [];
      this.history["2018"] = history2018;
      this.history["1961"] = history1961;
    }

 getTemperature() {
   return this.temperature;
 };

 getPressure() {
   return this.pressure;
 };

 getEntranceLight() {
   return (this.entranceLight);
 };

 getOutdoorLight() {
   return (this.outdoorLight);
 };

 getHistory2018() {
   return (this.history["2018"]);
 };

 getHistory1961() {
   return (this.history["1961"]);
 };

 setEntranceLight(aEntranceLight) {
   this.entranceLight = aEntranceLight;
 };

 setOutdoorLight(aOutdoorLight) {
   this.outdoorLight = aOutdoorLight;
 };

 setPressure(pressure){
   this.pressure = pressure;
 };
}
