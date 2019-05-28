import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  private timer;

  // filled automatically
  private log = [];

  // filled by pressing the button on the page
  private manualLog = [];

  ngOnInit() {
    this.startWatchingPosition();
    // this.watchPosition();
    // this.startWorkaroundWatch();
}

  getCurrentPosition() {
      console.log("getting current location");
      const readStartTimestamp = new Date();
      navigator.geolocation.getCurrentPosition((position) => {
        (<any>position).gpsStartTimestamp = this.formatDate(readStartTimestamp);
        (<any>position).gpsTimestamp = this.formatDate(new Date(position.timestamp));
        this.manualLog.push(position);
      }, (err) => {
        console.log("Error getting current location: " + err.message);
      }, {
          timeout: Infinity,
          maximumAge: 0,
          enableHighAccuracy: true
      });
  }

  // use geolocation.watchPosition
  watchPosition() {
    console.log("starting to watch position with watchPosition()");
    navigator.geolocation.watchPosition((position) => {
      (<any>position).gpsStartTimestamp = this.formatDate(new Date());
      (<any>position).gpsTimestamp = this.formatDate(new Date(position.timestamp));
      this.log.push(position);
    }, (err) => {
      console.log("Error getting current location: " + err.message);
    }, {
        timeout: Infinity,
        maximumAge: 0,
        enableHighAccuracy: true
    });
  }

  // use geolocation.getCurrentPosition in combination with setInterval
  startWatchingPosition() {
      clearInterval(this.timer);
      this.getCurrentPosition();
      this.timer = setInterval(() => {
        this.getCurrentPosition();
      }, 30000);
      console.log("Watching position started");
  };

  // use geolocation.watchPosition in combination with setInterval (always clear watchPosition after result is received)
  startWorkaroundWatch() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const watcher = navigator.geolocation.watchPosition((position) => {
        (<any>position).gpsStartTimestamp = this.formatDate(new Date());
        (<any>position).gpsTimestamp = this.formatDate(new Date(position.timestamp));
        this.log.push(position);
        navigator.geolocation.clearWatch(watcher);
      }, (err) => {
        console.log("Error getting current location: " + err.message);
      }, {
          timeout: Infinity,
          maximumAge: 0,
          enableHighAccuracy: true
      });
    }, 30000);
  }

  private formatDate(date: Date) {
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds();
  }
}
