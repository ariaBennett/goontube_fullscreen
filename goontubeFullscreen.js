// Function Section.
function getVideo() {
  // This returns the element of the current video player.
  var video;
  if (document.getElementById("gtubeVimeoPlayerID")) {
    video = document.getElementById("gtubeVimeoPlayerID");
  }
  else if (document.getElementById("mydmplayer")) {
    video = document.getElementById("mydmplayer");
  }
  else if (document.getElementById("myytplayer")) {
    video = document.getElementById("myytplayer");
  }
  return video;
}

function getChatClass() {
  // This returns the chat class element.
  // There are both a chat class and a chat id;
  // the chat class is the parent container of the chat id.
  var chat = document.getElementsByClassName("chat");
  return chat[0];
}

function getChatId() {
  // This returns the chat id element.
  // There are both a chat class and a chat id;
  // the chat id is the child of the chat class.
  var chat = document.getElementById("chat");
  return chat;
}

function getControls(getChildrenOption) {
  // this function returns the controls element if no
  // parameters are passed. 
  // if getchildrenoption is given it operates the following ways:
  // passing "buttons" returns an array containing all of the child buttons
  // on the controls element.
  // passing "text" returns an array containing all the text elements of
  // the children.
  var controls = document.getElementsByClassName("st-room-links")[0];
  if (getChildrenOption === "buttons") {
    return controls.children;
  }
  else if (getChildrenOption === "text") {
    var textElements = [];
    for (var i = 0; i < controls.children.length - 1; i++) { // we stop one short to skip the like/hate buttons
      textElements.push(controls.children[i].children[0]);
    }
    return textElements;
  }
  else {
    return controls;
  }
}

function getSlider() {
  // This returns the transparency slider element.
  var slider = document.getElementById("sliderTransparency");
  return slider;
}

function adjustStyles() {
  // This function makes property adjustments to elements that already
  // exist on goontu.be.
  var chat = getChatClass();
  window.scrollTo(0, 0);
  document.body.setAttribute("style",
    "overflow : hidden;"
  );
  chat.style.position = "fixed";
  chat.style.top = 0;
  chat.style.right = 0;
  chat.style.width = "14%";
  chat.style.height = "90%";

  var chatId = getChatId();
  chatId.style.width = "93%";
  chatId.style.height = "90%";

  var chatList = document.getElementById("chat_list");
  chatList.style.width = "100%";
  chatList.style.height = "100%";
  chatList.style.backgroundColor = "#E6E6E6";

  var chatInput = document.getElementById("cin");
  chatInput.style.width = "100%";

  var controls = getControls();
  controls.style.position = "relative";
  controls.style.textAlign = "center";
  controls.style.width = "100%";
  controls.style.height = "";
  controls.style.marginTop = "0";
  controls.style.backgroundColor = "#333333";

  var controlsLikeHate = document.getElementById("likehate");
  controlsLikeHate.style.position = "";
  controlsLikeHate.style.right = "";

  // This shortens some of the text on the controls.
  var controlText = getControls("text");
  var controlTextCams = controlText[0];
  var controlTextAdd = controlText[1];
  var controlTextSkip = controlText[2];
  var controlTextFix = controlText[3];
  controlTextCams.textContent = "cams";
  controlTextAdd.textContent = "add";
  controlTextFix.textContent = "fix";

  var cams = document.getElementsByClassName("cameras")[0];
  cams.style.position = "fixed";
}

function moveElements() {
  // This moves around pre-existing elements, right now
  // the method is to move relevant elements to the top of
  // document.body.
  var video = getVideo();
  var chatClass = getChatClass();
  var chatId = getChatId();
  var controls = getControls();
  var addVid = document.getElementById("add");
  var cams = document.getElementsByClassName("cameras")[0];
  document.body.insertBefore(video, document.body.firstChild);
  document.body.insertBefore(chatClass, document.body.firstChild);
  document.body.insertBefore(cams, document.body.firstChild);
  chatClass.insertBefore(controls, chatId);
  chatClass.insertBefore(addVid, chatClass.firstChild);
}

function resizeVideo() {
  // This resizes the video player to the size of 
  // window.inner*
  var video = getVideo();
  video.width = window.innerWidth;
  video.height = window.innerHeight;
}

function autoResize() {
  // This attaches an event listener which causes
  // resizeVideo() to be automatically called whenever
  // the size of the window is changed.
  window.onresize = function(){
    resizeVideo();
  };
}

function removeExtraElements() {
  // This removes non-critical elements for layout purposes.
  document.getElementById("headerbar").remove();
  document.getElementById("banner").remove();
  document.getElementById("chat_users").remove();
}

function updateTransparency(value){
  // This updates the opacity values of ui elements
  // It's intended to be attached as an event on the transparency slider.
  value = value * 0.01;
  var chatClass = getChatClass();
  chatClass.style.opacity = value;
  var cams = document.getElementsByClassName("cameras")[0];
  cams.style.opacity = value;
}

function createTransparencySlider(){
  // This creates a slider that controls the transparency of
  // UI elements.
  // Currently this is only supported on chrome.
  if (navigator.vendor === "Google Inc.") {
    var slider = document.createElement("input");
    slider.type = "range";
    slider.id = "sliderTransparency"
    slider.min = 0;
    slider.max = 100;
    slider.value = 100;

    slider.onchange = function(){ 
      updateTransparency(slider.value);
    };

    var controls = getControls();
    controls.appendChild(slider);
  }
}

function attachVideoTypeChangeDetection() {
  // This runs a function every second that
  // detects if the media type of the video
  // player has changed, and if it has,
  // it inserts the new video player.
  window.currentPlayer = getVideo().id;
  window.setInterval(function(){
    if (getVideo().id !== window.currentPlayer) {
      document.body.insertBefore(getVideo(), document.body.firstChild);
      resizeVideo();
      window.currentPlayer = getVideo().id;
    }
  },1000);
}


// Run Section.
removeExtraElements();
moveElements();
adjustStyles();
resizeVideo();
autoResize();
createTransparencySlider();
attachVideoTypeChangeDetection();
