import React from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import "./App.css";
import { useEffect } from "react";

var isSharingEnabled = false;
var isMuteVideo = false;
var isMuteAudio = false;


let videoArray = []

let options = {
  // Pass your App ID here.
  appId: "0190e0516f5a47df8232522a5d9c4c6f",
  // Set the channel name.
  channel: "PR LIVE CHAT",
  // Pass your temp token here.
  token:
    "007eJxTYNh5NHC3wt8dhu15fNp5kz2+2V9vcuRn4e0KbVN+UdWhV6bAYGBoaZBqYGpolmaaaGKekmZhZGxkamSUaJpimWySbJa2JmZTckMgIwPfxd/MjAwQCOLzMAQEKfh4hrkqOHs4hjAwAADFgx+K",
  // Set the user ID.
  uid: 0,
};

let channelParameters = {
  // A variable to hold a local audio track.
  localAudioTrack: null,
  // A variable to hold a local video track.
  localVideoTrack: null,
  // A variable to hold a remote audio track.
  remoteAudioTrack: null,
  // A variable to hold a remote video track.
  remoteVideoTrack: null,
  // A variable to hold the remote user id.s
  audioController: null,
  remoteUid: null,
};




async function startBasicCall() {
  // Create an instance of the Agora Engine

  const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  // Start cloud proxy service in the forced UDP mode.
  agoraEngine.startProxyServer(3);

  // Dynamically create a container in the form of a DIV element to play the remote video track.

  // Dynamically create a container in the form of a DIV element to play the local video track.
  const buttonClass = document.createElement("div");

  const localPlayerContainer = document.createElement("div");

  buttonClass.style.width = "28.3%";
  buttonClass.style.zIndex = "1";
  buttonClass.style.position = "absolute";
  buttonClass.id = options.uid;

  localPlayerContainer.id = options.uid;
  localPlayerContainer.textContent = "Local user " + options.uid;
  localPlayerContainer.style.width = "500px";
  localPlayerContainer.style.height = "480px";
  localPlayerContainer.style.zIndex = "0";
  localPlayerContainer.style.position = "relative";

  // const challo = document.getElementById('lcvc')
  // challo.textContent="You are " + ' ' + options.uid

  // Listen for the "user-published" event to retrieve a AgoraRTCRemoteUser object.
  agoraEngine.on("connection-state-change", (curState, prevState, reason) => {
    // The sample code uses debug console to show the connection state. In a real-world application, you can add
    // a label or a icon to the user interface to show the connection state.

    // Display the current connection state.
    console.log("Connection state has changed to :" + curState);
    // Display the previous connection state.
    console.log("Connection state was : " + prevState);
    // Display the connection state change reason.
    console.log("Connection state change reason : " + reason);
  });

  agoraEngine.on("user-published", async (user, mediaType) => {
    // Set an event listener on the range slider.
    // Set an event listener on the range slider.
    // Subscribe to the remote user when the SDK triggers the "user-published" event.

    await agoraEngine.subscribe(user, mediaType);
    console.log("subscribe success");
    // Subscribe and play the remote video in the container If the remote user publishes a video track.
    if (mediaType == "video") {
      // Retrieve the remote video track.
      channelParameters.remoteVideoTrack = user.videoTrack;
      // Retrieve the remote audio track.
      channelParameters.remoteAudioTrack = user.audioTrack;

      console.log( channelParameters.remoteAudioTrack,"what's that?")
      // Save the remote user id for reuse.
      channelParameters.remoteUid = user.uid.toString();
      // Specify the ID of the DIV container. You can use the uid of the remote user.
      // remotePlayerContainer.id = user.uid.toString();

      channelParameters.remoteUid = user.uid.toString();
      const hey = document.getElementById("remotevideo");
      console.log(hey, "Heyyy");
      hey.style.display = "grid";
      hey.style.gridTemplateColumns = "200px 200px";
      hey.style.gridAutoRows = "200px";
      hey.style.gap = "10px";
      hey.style.width = "100%";
      hey.style.height = "100%";
      hey.style.overflow = "scroll";
      hey.style.boxShadow = "3px 3px 10px black";
      hey.style.borderRadius = "25px";
      hey.style.margin = "25px";

      channelParameters.remoteVideoTrack.play(hey);

      let VolumeController = document.createElement("INPUT");
      VolumeController.setAttribute("type", "range");


    VolumeController.id = channelParameters.remoteVideoTrack;
      let volumeId = VolumeController.id
      videoArray.push(volumeId)

  console.log(videoArray,"hhhhhhhhhjjjjjjjjjj")




      VolumeController.style.width = "50%";
      VolumeController.style.height = "12rem";
      console.log(VolumeController.id, "Volume Controller");
      let abc = VolumeController.id
      // hey.append(VolumeController)
      // let hjk = document.getElementById("VolumeController.id")

      if (abc) {
        console.log(hey, "Hellow Ece");

        
          videoArray.map((e)=>{
            hey.append(VolumeController);
            document.getElementById(e).addEventListener("change", function (evt) {
                console.log("Volume of local audio :" + evt.target.value);
                // Set the local audio volume.+
                channelParameters.remoteAudioTrack.setVolume(parseInt(evt.target.value));
              }); 
              console.log("New Controller Added");         
          })
        
 
      }

      // document.getElementById("VolumeController.id").addEventListener("change", function (evt) {
      //     console.log("Volume of remote audio :" + evt.target.value,"huurrrrrrrrrrrrrrrrrrrrrrrrrayyyyyyyyyyy");
      //     // channelParameters.remoteAudioTrack.setVolume(parseInt(evt.target.value));
      // });
      console.log(VolumeController.id, "jjjjjjjjjjjjjjjjjjj");

      // hey.textContent = "Remote user " + user.uid.toString();
      // Append the remote container to the page body.
      // Set a stream fallback option to automatically switch remote video quality when network conditions degrade.

      agoraEngine.setStreamFallbackOption(channelParameters.remoteUid, 1);

      document.getElementById(hey.id).addEventListener("click", function () {
        if (isHighRemoteVideoQuality == false) {
          agoraEngine.setRemoteVideoStreamType(channelParameters.remoteUid, 0);
          isHighRemoteVideoQuality = true;
        } else {
          agoraEngine.setRemoteVideoStreamType(channelParameters.remoteUid, 1);
          isHighRemoteVideoQuality = false;
        }
      });
      // Play the remote video track.
    }
    // Subscribe and play the remote audio track If the remote user publishes the audio track only.
    if (mediaType == "audio") {
      // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
      channelParameters.remoteAudioTrack = user.audioTrack;
      // Play the remote audio track. No need to pass any DOM element.
      channelParameters.remoteAudioTrack.play();
    }

    if (mediaType == "audio") {
      channelParameters.audioController = user.audioTrack;
    }

    // Listen for the "user-unpublished" event.
    agoraEngine.on("user-unpublished", (user) => {
      console.log(user.uid + "has left the channel");
      channelParameters.remoteAudioTrack.play();
    });
  });

  // Get the uplink network condition

  // Get the downlink network condition

  agoraEngine.on("is-using-cloud-proxy", (isUsingProxy) => {
    // Display the proxy server state based on the isUsingProxy Boolean variable.
    if (isUsingProxy == true) {
      console.log("Cloud proxy service activated");
    } else {
      console.log("Proxy service failed");
    }
  });

  window.onload = function () {
    document.getElementById("statistics").onclick = async function () {
      // The sample code uses debug console to show the call-quality statistics. In a real-world application, you can
      // add label or paragraph to the user interface to show the call-quality statistics.

      // Collect the call quality statistics.
      var localAudioStats = agoraEngine.getLocalAudioStats();
      console.log(
        "Local audio stats = { sendBytes :" +
          localAudioStats.sendBytes +
          ", sendBitrate :" +
          localAudioStats.sendBitrate +
          ", sendPacketsLost :" +
          localAudioStats.sendPacketsLost +
          " }"
      );
      var localVideoStats = agoraEngine.getLocalVideoStats();
      console.log(
        "Local video stats = { sendBytes :" +
          localVideoStats.sendBytes +
          ", sendBitrate :" +
          localVideoStats.sendBitrate +
          ", sendPacketsLost :" +
          localVideoStats.sendPacketsLost +
          " }"
      );
      var remoteAudioStats =
        agoraEngine.getRemoteAudioStats()[channelParameters.remoteUid];
      console.log(
        "Remote audio stats = { receiveBytes :" +
          remoteAudioStats.receivedBytes +
          ", receiveBitrate :" +
          remoteAudioStats.receiveBitrate +
          ", receivePacketsLost :" +
          remoteAudioStats.receivePacketsLost +
          "}"
      );
      var remoteVideoStats =
        agoraEngine.getRemoteVideoStats()[channelParameters.remoteUid];
      console.log(
        " Local video stats = { receiveBytes :" +
          remoteVideoStats.receiveBytes +
          ", receiveBitrate :" +
          remoteVideoStats.receiveBitrate +
          ", receivePacketsLost :" +
          remoteVideoStats.receivePacketsLost +
          " }"
      );
      var rtcStats = agoraEngine.getRTCStats();
      console.log(
        "Channel statistics = { UserCount :" +
          rtcStats.UserCount +
          ", OutgoingAvailableBandwidth :" +
          rtcStats.OutgoingAvailableBandwidth +
          ", RTT :" +
          rtcStats.RTT +
          " }"
      );
    };

    // Listen to the Join button click event.
    document.getElementById("join").onclick = async function () {
      // Enable dual-stream mode.
      agoraEngine.enableDualStream();

      // Join a channel.
      await agoraEngine.join(
        options.appId,
        options.channel,
        options.token,
        options.uid
      );
      // Create a local audio track from the audio sampled by a microphone.
      // Create a local audio track and set an audio profile for the local audio track.

      // Create a local video track from the video captured by a camera.
      // Set a video profile.

      // An object specifying the types of media to request.
      var constraints = (window.constraints = { audio: true, video: true });
      // A method to request media stream object.
      await navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          // Get all the available video tracks.
          // Retrieve the available audio tracks.
          var audioTracks = stream.getAudioTracks();
          console.log("Using video device: " + audioTracks[0].label);
          // Create custom audio track.
          channelParameters.localAudioTrack = AgoraRTC.createCustomAudioTrack({
            mediaStreamTrack: audioTracks[0],
          });

          var videoTracks = stream.getVideoTracks();
          console.log("Using video device: " + videoTracks[0].label);
          // Create a custom video track.
          channelParameters.localVideoTrack = AgoraRTC.createCustomVideoTrack({
            mediaStreamTrack: videoTracks[0],
          });
        })

        .catch(function (error) {
          console.log(error);
        });

      optimizationMode: "detail",
        // Append the local video container to the page body.
        document.getElementById("lcvc").append(localPlayerContainer);
      document.getElementById("lcvc").append(buttonClass);
      // Publish the local audio and video tracks in the channel.
      await agoraEngine.publish([
        channelParameters.localAudioTrack,
        channelParameters.localVideoTrack,
      ]);
      // Play the local video track.
      channelParameters.localVideoTrack.play(localPlayerContainer);
      console.log("publish success!");
    };
    document.getElementById("inItScreen").onclick = async function () {
      if (isSharingEnabled == false) {
        // Create a screen track for screen sharing.
        channelParameters.screenTrack = await AgoraRTC.createScreenVideoTrack();
        // Stop playing the local video track.
        channelParameters.localVideoTrack.stop();
        // Unpublish the local video track.
        await agoraEngine.unpublish(channelParameters.localVideoTrack);
        // Publish the screen track.
        await agoraEngine.publish(channelParameters.screenTrack);
        // Play the screen track on local container.
        channelParameters.screenTrack.play(localPlayerContainer);
        // Update the button text.
        document.getElementById(`inItScreen`).innerHTML = "Stop Sharing";
        // Update the screen sharing state.
        isSharingEnabled = true;
      } else {
        // Stop playing the screen track.
        channelParameters.screenTrack.stop();
        // Unpublish the screen track.
        await agoraEngine.unpublish(channelParameters.screenTrack);
        // Publish the local video track.
        await agoraEngine.publish(channelParameters.localVideoTrack);
        // Play the local video on the local container.
        channelParameters.localVideoTrack.play(localPlayerContainer);
        // Update the button text.
        document.getElementById(`inItScreen`).innerHTML = "Share Screen";
        // Update the screen sharing state.
        isSharingEnabled = false;
      }
    };
    document.getElementById("muteVideo").onclick = async function () {
      if (isMuteVideo == false) {
        // Mute the local video.
        channelParameters.localVideoTrack.setEnabled(false);
        // Update the button text.
        document.getElementById(`muteVideo`).innerHTML = "Unmute Video";
        isMuteVideo = true;
      } else {
        // Unmute the local video.
        channelParameters.localVideoTrack.setEnabled(true);
        // Update the button text.
        document.getElementById(`muteVideo`).innerHTML = "Mute Video";
        isMuteVideo = false;
      }
    };
    document.getElementById("muteAudio").onclick = async function () {
      if (isMuteAudio == false) {
        // Mute the local audio.
        channelParameters.localAudioTrack.setEnabled(false);
        // Update the button text.
        document.getElementById(`muteAudio`).innerHTML = "Unmute Audio";
        isMuteAudio = true;
      } else {
        // Unmute the local audio.
        channelParameters.localAudioTrack.setEnabled(true);
        // Update the button text.
        document.getElementById(`muteAudio`).innerHTML = "Mute Audio";
        isMuteAudio = false;
      }
    };

    // Listen to the Leave button click event.
    document.getElementById("leave").onclick = async function () {
      // Destroy the local audio and video tracks.
      channelParameters.localAudioTrack.close();
      channelParameters.localVideoTrack.close();
      // Remove the containers you created for the local video and remote video.
      removeVideoDiv(localPlayerContainer.id, buttonClass.id);
      // Leave the channel
      await agoraEngine.leave();
      // Stop the proxy service when you leave the channel.
      agoraEngine.stopProxyServer();

      console.log("You left the channel");
      // Refresh the page for reuse
      window.location.reload();
    };
  };
}
startBasicCall();
// A variable to track the state of remote video quality.
var isHighRemoteVideoQuality = false;

// Remove the video stream from the container.
function removeVideoDiv(elementId) {
  console.log("Removing " + elementId + "Div");
  let Div = document.getElementById(elementId);
  if (Div) {
    Div.remove();
  }
}

const App = () => {
  return (
    <div className="vc_sdk_container">
      <h2 className="left-align">Get started with video calling</h2>
      <div className="row">
        <div>
          <button type="button" id="join">
            Join
          </button>
          <div className="vc_Players">
            <div id="lcvc"></div>
            <div className="remote_vc_div">
              <div id="remotevideo" className="maped_users"></div>
            </div>
          </div>

          <div>
            <div className="vc_controllers">
              <button type="button" id="inItScreen">
                Share Screen
              </button>
              <button type="button" id="muteVideo">
                Mute Video
              </button>
              <button type="button" id="muteAudio">
                Mute Audio
              </button>
              <button type="button" id="leave">
                Leave
              </button>
              <button type="button" id="statistics">
                Show Statistics
              </button>
              <br />
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
