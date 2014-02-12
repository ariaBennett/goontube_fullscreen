// First we create a pseudo-namespace to store everything this
// mod does inside. This lets us avoid cluttering the global name
// space, and keeps everything in one place.
// gtfo stands for "goontube fullscreen option"
window.gtfo = {};

// Namespace globals
gtfo.enabled = false;

// Function Section.
gtfo.each = function each(obj, callback) {
  // A simple each implementation, works on arrays and objects
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      callback(obj[i]);
    }
  }
  else {
    for (var i = 0; i < Object.keys(obj).length; i++) {
      callback(obj[Object.keys(obj)[i]]);
    };
  }
};

gtfo.getVideo = function getVideo() {
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
};

gtfo.getChatClass = function getChatClass() {
  // This returns the chat class element.
  // There are both a chat class and a chat id;
  // the chat class is the parent container of the chat id.
  var chat = document.getElementsByClassName("chat");
  return chat[0];
};

gtfo.getChatId = function getChatId() {
  // This returns the chat id element.
  // There are both a chat class and a chat id;
  // the chat id is the child of the chat class.
  var chat = document.getElementById("chat");
  return chat;
};

gtfo.getControls = function getControls(getChildrenOption) {
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
};

gtfo.getSlider = function getSlider() {
  // This returns the transparency slider element.
  var slider = document.getElementById("sliderTransparency");
  return slider;
};

gtfo.getPolls = function getPolls() {
  // This returns the polls element which is
  // wrapped by the interactive id and class.
  return document.getElementsByClassName("interactive")[0];
};

gtfo.getPlaylist = function getPlaylist() {
  // This returns the playlist class element
  return document.getElementsByClassName("playlist")[0];
};

gtfo.getTubemap = function getTubemap() {
  // This returns the container of the elements where the
  // rules are displayed and forum buttons and such
  return document.getElementById("tubemap").parentElement;
};

gtfo.adjustStyles = function adjustStyles() {
  // This function makes property adjustments to elements that already
  // exist on goontu.be.
  window.scrollTo(0, 0);
  window.onscroll = function(){
    window.scrollTo(0, 0);
  };
  document.body.setAttribute("style",
    "overflow : hidden;"
  );

  var chat = gtfo.getChatClass();
  chat.style.position = "fixed";
  chat.style.top = 0;
  chat.style.right = 0;
  chat.style.width = "14%";
  chat.style.height = "90%";

  var chatId = gtfo.getChatId();
  chatId.style.width = "93%";
  chatId.style.height = "90%";

  var chatList = document.getElementById("chat_list");
  chatList.style.width = "100%";
  chatList.style.height = "100%";
  chatList.style.backgroundColor = "#E6E6E6";

  var chatInput = document.getElementById("cin");
  chatInput.style.width = "100%";

  var controls = gtfo.getControls();
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
  var controlText = gtfo.getControls("text");
  var controlTextCams = controlText[0];
  var controlTextAdd = controlText[1];
  var controlTextSkip = controlText[2];
  var controlTextFix = controlText[3];
  controlTextCams.textContent = "cams";
  controlTextAdd.textContent = "add";
  controlTextFix.textContent = "fix";

  var cams = document.getElementsByClassName("cameras")[0];
  cams.style.position = "fixed";

  var polls = gtfo.getPolls();
  polls.style.position = "fixed";
  polls.style.width = "13.5%";
  polls.style.marginLeft = "72%";
};

gtfo.moveElements = function moveElements() {
  // This moves around pre-existing elements, right now
  // the method is to move relevant elements to the top of
  // document.body.
  var video = gtfo.getVideo();
  var chatClass = gtfo.getChatClass();
  var chatId = gtfo.getChatId();
  var controls = gtfo.getControls();
  var addVid = document.getElementById("add");
  var cams = document.getElementsByClassName("cameras")[0];
  var polls = gtfo.getPolls();
  var tubemap = gtfo.getTubemap();
  document.body.insertBefore(video, document.body.firstChild);
  document.body.insertBefore(chatClass, document.body.firstChild);
  document.body.insertBefore(cams, document.body.firstChild);
  document.body.insertBefore(polls, document.body.firstChild);
  chatClass.insertBefore(controls, chatId);
  chatClass.insertBefore(addVid, chatClass.firstChild);
  gtfo.scrollChatToBottom();
  // We move the tubemap element out of the way so it wont suddenly
  // enable itself and get in the way.
  document.body.appendChild(tubemap);
};

gtfo.resizeVideo = function resizeVideo() {
  // This resizes the video player to the size of 
  // window.inner*
  var video = gtfo.getVideo();
  video.width = window.innerWidth;
  video.height = window.innerHeight;
};

gtfo.autoResize = function autoResize() {
  // This attaches an event listener which causes
  // resizeVideo() to be automatically called whenever
  // the size of the window is changed.
  window.onresize = function(){
    gtfo.resizeVideo();
  };
};
gtfo.scrollChatToBottom = function scrollChatToBottom() {
  // Scroll the chat area to the bottom
  var chatList = document.getElementById("chat_list");
  chatList.scrollTop = chatList.scrollHeight;
};

gtfo.hideExtraElements = function hideExtraElements() {
  // This hides non-critical elements for layout purposes.
  document.getElementById("chat_users").style.display = "none";
};

gtfo.updateTransparency = function updateTransparency(value){
  // This updates the opacity values of ui elements
  // It's intended to be attached as an event on the transparency slider.
  value = value * 0.01;
  var chatClass = gtfo.getChatClass();
  chatClass.style.opacity = value;
  var cams = document.getElementsByClassName("cameras")[0];
  cams.style.opacity = value;
  var polls = gtfo.getPolls();
  polls.style.opacity = value;
};

gtfo.createTransparencySlider = function createTransparencySlider(){
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
      gtfo.updateTransparency(slider.value);
    };

    var controls = gtfo.getControls();
    controls.appendChild(slider);
  }
};

gtfo.attachVideoTypeChangeDetection = function attachVideoTypeChangeDetection() {
  // This runs a function every secondish that
  // checks the ytwrapper element for children,
  // if it finds any it resets the UI.

  function checkVideoChange() {
    if (gtfo.enabled === true && document.getElementById("ytwrapper").childElementCount > 0) {
      gtfo.moveElements();
      gtfo.resizeVideo();
      gtfo.currentPlayer = gtfo.getVideo().id;
    }
    setTimeout(checkVideoChange, 1000);
  }
  checkVideoChange();
};

gtfo.fixFixButton = function fixFixButton() {
  var fixButton = document.getElementById("fixmedia");
  fixButton.onclick = function() {
    setTimeout(function(){
      gtfo.moveElements();
      gtfo.resizeVideo();
    }, 1000);
  };
};

gtfo.storeDefaultStyles = function storeDefaultStyles() {
  // This stores the styles of relevant elements so that we
  // can restore them later.
  gtfo.defaultStyles = {};
  function storeStyle(name, style) {
    gtfo.defaultStyles[name] = style.cssText;
  }

  storeStyle("body", document.body.style);
  storeStyle("chatClass", gtfo.getChatClass().style);
  storeStyle("chatId", gtfo.getChatId().style);
  storeStyle("chatList", document.getElementById("chat_list").style);
  storeStyle("video", gtfo.getVideo().style);
  storeStyle("controls", gtfo.getControls().style);
  storeStyle("chatInput", document.getElementById("cin").style);
  storeStyle("controlsLikeHate", document.getElementById("likehate").style);
  storeStyle("cams", document.getElementsByClassName("cameras")[0].style);
  storeStyle("polls", document.getElementsByClassName("interactive")[0].style);
};

gtfo.restoreStyles = function restoreStyles() {
 document.body.style.cssText = gtfo.defaultStyles.body;
 gtfo.getChatClass().style.cssText = gtfo.defaultStyles.chatClass;
 gtfo.getChatId().style.cssText = gtfo.defaultStyles.chatId;
 document.getElementById("chat_list").style.cssText = gtfo.defaultStyles.chatList;
 gtfo.getVideo().style.cssText = gtfo.defaultStyles.video;
 gtfo.getControls().style.cssText = gtfo.defaultStyles.controls;
 document.getElementById("cin").style.cssText = gtfo.defaultStyles.chatInput;
 document.getElementById("likehate").style.cssText = gtfo.defaultStyles.controlsLikeHate;
 document.getElementsByClassName("cameras")[0].style.cssText = gtfo.defaultStyles.cams;
 document.getElementsByClassName("interactive")[0].style.cssText = gtfo.defaultStyles.polls;
};

gtfo.restoreNormalLayout = function restoreNormalLayout() {
  // this undos fullscreen mode and returns everything back to
  // normal.

  // Turn off enabled flag
  gtfo.enabled = false;

  // Remove added events
  window.onresize = "";
  window.onscroll = "";
  document.getElementById("fixmedia").onclick = "";
  var fixButton = document.getElementById("fixmedia");
  fixButton.onClick = "";

  // Restore default element sizes
  var video = gtfo.getVideo();
  video.width = "550px";
  video.height = "320px";

  // Move elements back into place.
  // Video
  document.getElementById("ytwrapper").appendChild(gtfo.getVideo());
  // Controls
  document.getElementById("playlistcontrols").appendChild(gtfo.getControls());
  var actions = document.getElementById("actions");
  var add = document.getElementById("add");
  actions.insertBefore(add, actions.children[1]);
  // Chat
  var stageOuter = document.getElementsByClassName("st-vanilla-stage-ct")[0];
  var stageInner= document.getElementsByClassName("stage")[0];
  stageOuter.insertBefore(gtfo.getChatClass(), stageInner.nextSibling);
  // Cameras
  var stageOuter = document.getElementsByClassName("st-vanilla-stage-ct")[0];
  var cameras = document.getElementsByClassName("cameras")[0];
  stageOuter.insertBefore(cameras, stageOuter.firstChild);
  // Tubemap
  var tubemap = gtfo.getTubemap();
  gtfo.getPolls().appendChild(tubemap);
  // Polls
  var polls = gtfo.getPolls();
  var pollsContainer = document.getElementsByClassName("st-vanilla-lower")[0];
  pollsContainer.insertBefore(polls, gtfo.getPlaylist());

  // Restore the normal text to the controls.
  var controlText = gtfo.getControls("text");
  var controlTextCams = controlText[0];
  var controlTextAdd = controlText[1];
  var controlTextSkip = controlText[2];
  var controlTextFix = controlText[3];
  controlTextCams.textContent = "enable webcams";
  controlTextAdd.textContent = "add vid";
  controlTextFix.textContent = "fix media";
  
  // unhide hidden elements
  document.getElementById("chat_users").style.display = "inline";

  // remove added elements
  if (navigator.vendor === "Google Inc.") {
    gtfo.getSlider().remove();
  }

  // reset styles of elements to normal
  gtfo.restoreStyles();
};

gtfo.clickFixButton = function clickFixButton() {
  document.getElementById("fixmedia").click();
};

gtfo.run = function run() {
  gtfo.hideExtraElements();
  gtfo.moveElements();
  gtfo.adjustStyles();
  gtfo.resizeVideo();
  gtfo.autoResize();
  gtfo.createTransparencySlider();
  gtfo.attachVideoTypeChangeDetection();
  gtfo.fixFixButton();
};

gtfo.addFullscreenButton = function addFullscreenButton(){
  var buttonFullscreen = document.getElementById("webcamtog").cloneNode(true);
  var buttonFullscreenChild = buttonFullscreen.children[0];
  buttonFullscreen.id = "fullscreentog";
  buttonFullscreenChild.textContent = "fullscreen";
  buttonFullscreen.onclick = function() {
    if (gtfo.enabled === false) {
      gtfo.clickFixButton();
      gtfo.enabled = true;
      gtfo.run();
      gtfo.scrollChatToBottom();
    }
    else {
      gtfo.enabled = false;
      gtfo.restoreNormalLayout();
      gtfo.clickFixButton();
      gtfo.scrollChatToBottom();
    }
  };
  gtfo.getControls().appendChild(buttonFullscreen);
};

// Run Section.
gtfo.addFullscreenButton();
gtfo.storeDefaultStyles();
