sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("PWAApplication.PWAApplication.controller.View1", {
    onInit: function () {
      var _self = this;
      this.track = null;
      this.constraints = {
        video: {
          facingMode: "user",
        },
        audio: false,
      };
      setTimeout(function () {
        _self.cameraStart();

        const cameraView = document.getElementsByClassName("camera--view")[0],
          cameraOutput = document.getElementsByClassName("camera--output")[0],
          cameraSensor = document.getElementsByClassName("camera--sensor")[0],
          cameraTrigger = document.getElementsByClassName("camera--trigger")[0];

        cameraTrigger.onclick = function () {
          cameraSensor.width = cameraView.videoWidth;
          cameraSensor.height = cameraView.videoHeight;
          cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
          cameraOutput.src = cameraSensor.toDataURL("image/webp");
          cameraOutput.classList.add("taken");
          // track.stop();
        };
      }, 2000);
    },

    cameraStart: function () {
      var _self = this;
      this.videoView = document.getElementsByClassName("camera--view")[0];
      navigator.mediaDevices
        .getUserMedia(_self.constraints)
        .then(function (stream) {
          _self.track = stream.getTracks()[0];
          _self.videoView.srcObject = stream;
          _self.videoView.autoplay = true;
        })
        .catch(function (error) {
          console.error("Oops. Something is broken.", error);
        });
    },
  });
});
