import { Core } from './beacon/core';

declare global {
  interface Window {
    beacon: any; // to support Beacon reference
  }
}

((window) => {
  if (!window.beacon) {
    window.beacon = new Core(window);

    // Get the beaconScript if we need it
    const beaconScript = document.getElementById('beaconScript');

    // If we've set the id of the script, meaning we'll likely also pass the api and the beacon
    if (beaconScript) {
      // Configures where to send data
      const apiRoot = beaconScript.getAttribute('data-api-root');
      // Enables logging to the console
      const log: any =
        beaconScript.getAttribute('data-log') === 'true' ? true : false;
      const identity: any = beaconScript.getAttribute('data-identity')
        ? beaconScript.getAttribute('data-identity')
        : 'noPii';
      let trackers: any = beaconScript.getAttribute('data-trackers')
        ? beaconScript.getAttribute('data-trackers')
        : ['page'];

      if (trackers && trackers!.indexOf(',') > -1) {
        trackers = trackers.split(',');
      }

      if (apiRoot) {
        window.beacon.init({ log, apiRoot, identity, trackers });
      }
    }
  }
})(window);
