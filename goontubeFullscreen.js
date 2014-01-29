// Function Section.
function getVideo() {
  var video;
  if (document.getElementById("gtubeVimeoPlayerID")) {
    video = document.getElementById("gtubeVimeoPlayerID");
  }
  else if (document.getElementById("gtubeDailyMotionPlayerID")) {
    video = document.getElementById("gtubeVimeoPlayerID");
  }
  else if (document.getElementById("myytplayer")) {
    video = document.getElementById("myytplayer");
  }
  return video;
}

function getChatClass() {
  var chat = document.getElementsByClassName("chat");
  return chat[0];
}

function getChatId() {
  var chat = document.getElementById("chat");
  return chat;
}


function adjustStyles() {
  var chat = getChatClass();
  window.scrollTo(0);
  document.body.setAttribute("style",
    "overflow : hidden;"
  );
  chat.style.position = "fixed";
  chat.style.top = 0;
  chat.style.right = 0;
  chat.style.width = "14%";
  chat.style.height = "100%";

  var chatId = getChatId();
  chatId.style.width = "100%";
  chatId.style.height = "100%";

  var chatList = document.getElementById("chat_list");
  chatList.style.width = "93%";
  chatList.style.height = "90%";
  chatList.style.backgroundColor = "#E6E6E6";

  var chatInput = document.getElementById("cin");
  chatInput.style.width = "95%";
}

function moveElements() {
  var video = getVideo();
  var chat = getChatClass();
  document.body.insertBefore(video, document.body.firstChild);
  document.body.insertBefore(chat, document.body.firstChild);
}

function resizeVideo() {

  var video = getVideo();
  video.width = window.innerWidth;
  video.height = window.innerHeight;

}

function autoResize() {
  window.onresize = function(){
    resizeVideo();
  };
}

function removeExtraElements() {
  document.getElementById("headerbar").remove();
  document.getElementById("banner").remove();
  document.getElementById("chat_users").remove();
}


// Run Section.
removeExtraElements();
moveElements();
adjustStyles();
resizeVideo();
autoResize();
