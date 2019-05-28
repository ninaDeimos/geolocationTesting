In app.compontent.ts initialization you can choose between three methods

* this.startWatchingPosition();

This one uses setInterval and geolocation.getCurrentPosition to retrieve points periodically.

* this.watchPosition();

This one just uses geolocation.watchPosition

* this.startWorkaroundWatch();

This one tries to be smart and uses setInterval and watchPosition and after receiving a position from watchPosition it clears the watch