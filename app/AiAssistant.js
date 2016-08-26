function HumleyAiAssistant(username, password, HumleyId){
  var vm = this;
  this.credential =  {
    username: username,
    password: password,
    productId: HumleyId
  };
  window.humleyApi = (window.humleyConversationBot === undefined) ? undefined : new humleyConversationBot(this.credential);
  this.initAiAssistant = function (parentId) {
    if (window.humleyConversationBot === undefined) {
      console.error('Humley Conversation Bot is not defined');
      return;
    }
    localStorage.setItem('humleyId', id);
    var id = localStorage.getItem('humleyId');
    if (localStorage.getItem('humleyId') == undefined) {
      id = guid();
    }
    var data = {
        params: {userId :id},
        uuid: '',
        cv: '',
        mx: '',
        imei: id,
        udid: '',
        noid: '',
        imsi: '',
        simid: ''
    };
    window.humleyApi.init(data).then(function (result) {
        if (!result) {
            console.error("session failed to start");
        }
    }, function (error) {
        console.error(error);
    });
    var content =  document.getElementById(parentId);
    var container = document.createElement('div');
    container.setAttribute('class', 'hum-chat-container');
    var chat = document.createElement('ul');
    chat.setAttribute('class', 'hum-chat-content');
    chat.setAttribute('id', 'humley-chat-module');
    container.appendChild(chat);

    var chatForm = document.createElement('form');
    chatForm.setAttribute('name', 'hum-chat-form');
    var chatInput = document.createElement('input');
    chatInput.setAttribute('class', 'hum-chat--input');
    chatInput.setAttribute('id', 'humley-chat-input');
    chatInput.setAttribute('type', 'text');
    chatForm.appendChild(chatInput);
    container.appendChild(chatForm);
    content.appendChild(container);

    if(chatForm.addEventListener){
      chatForm.addEventListener("submit", this.submitMessage, false); 
    }else if(chatForm.attachEvent){
      chatForm.attachEvent('onsubmit', this.submitMessage);
    }
  };
  this.addMessage = function(message, other = false) {
    var chatUlContainer =  document.getElementById('humley-chat-module');
    var liMsg = document.createElement('li');
    liMsg.setAttribute('class', other === true ? 'hum-chat-content--msg--other' : '')
    var msg = document.createElement('div');
    msg.setAttribute('class', other === true ? 'hum-chat-content--msg--other' : 'hum-chat-content--msg')
    msg.appendChild(message);
    liMsg.appendChild(msg);
    chatUlContainer.appendChild(liMsg);
  };
  this.submitMessage = function(e) {
    e.preventDefault();
    var chatMessage = document.getElementById('humley-chat-input');
    var txt = chatMessage.value;
    if(txt === '' || txt === undefined){
        return;
    }
    vm.addMessage(document.createTextNode(txt), true);
    window.humleyApi.talk(txt).then(function (data) {
      if (data.error) {
            console.error(data.errorInfo);
        }
        for (var i = 0; i < data.replies.length; i++) {
          if (data.replies[i].hasVideo) {
                data.replies[i].reply += '</p><p><iframe id="vpframe" src="' + data.replies[i].video.url + '" frameborder="0" allowfullscreen></iframe>';
            }
            if (data.replies[i].buttonId !== undefined) {
                if (data.replies[i].buttonId === -1) {
                    var feedbackButtons = '<span id="buttonOption" class="buttonResponseShow"><button type="button" onclick="sendButtonResponse(\'Yes\', 3)" class="btn-hum-yes">Yes</button><span id="buttonOption" class="buttonResponseShow"><button type="button" onclick="sendButtonResponse(\'Sort of\', 2)" class="btn-hum-srt">Sort of</button><button type="button" onclick="sendButtonResponse(\'No\', 0)" class="btn-hum-no">No</button></span>';
                    data.replies[i].reply += '</p><p>' + feedbackButtons;
                } else {
                    var actionButtonConent = vm.actionButton(data.replies[i].buttonId, data.replies[i].actionURL, data.replies[i].actionType, data.replies[i].replyId);
                    if (actionButtonConent !== '') {
                        data.replies[i].reply += '</p><p>' + actionButtonConent;
                    }
                }
            }
            var response = document.createElement('div');
            response.innerHTML = data.replies[i].reply;
            vm.addMessage(response);

        }
    });
    chatMessage.value = '';
  }
  this.actionButton = function(btnID, actionUrl, ActionType, bannerId) {
      var btnTxt,
          htmlTxt = '';
      switch (btnID) {
          case 1:
              btnTxt = 'Download';
              break;
          case 2:
              btnTxt = 'Open';
              break;
          case 3:
              btnTxt = 'Continue';
              break;
          case 4:
              btnTxt = 'Purchase';
              break;
          case 5:
              btnTxt = 'Buy';
              break;
          case 6:
              btnTxt = 'Listen';
              break;
          case 7:
              btnTxt = 'Play';
              break;
          case 8:
              btnTxt = 'Proceed';
              break;
          case 9:
              btnTxt = 'Okay';
              break;
          case 10:
              btnTxt = 'Next';
              break;
          case 11:
              btnTxt = 'Done';
              break;
          case 12:
              btnTxt = 'Thanks';
              break;
          case 13:
              btnTxt = 'Explore';
              break;
          case 14:
              btnTxt = 'Advance';
              break;
          case 15:
              btnTxt = 'Donate';
              break;
          case 16:
              btnTxt = 'Learn';
              break;
          case 17:
              btnTxt = 'Discover';
              break;
          case 18:
              btnTxt = 'More info';
              break;
          case 19:
              btnTxt = 'Details';
              break;
          case 20:
              btnTxt = 'Go On';
              break;
          case 21:
              btnTxt = 'Start';
              break;
          case 22:
              btnTxt = 'Send SMS';
              break;
          case 23:
              btnTxt = 'Call';
              break;
          case 24:
              btnTxt = 'Ring';
              break;
          case 25:
              btnTxt = 'Begin';
              break;
          case 26:
              btnTxt = 'Email';
              break;
          case 27:
              btnTxt = 'Top up';
              break;
          case 28:
              btnTxt = 'Update';
              break;
          case 29:
              btnTxt = 'Enjoy';
              break;
          case 30:
              btnTxt = 'Order now';
              break;
          case 31:
              btnTxt = 'Order';
              break;
          case 32:
              btnTxt = 'Book';
              break;
          case 33:
              btnTxt = 'Book now';
              break;
          case 85:
              btnTxt = 'Similar';
              break;
          case 35:
              btnTxt = 'Recommended';
              break;
          case 36:
              btnTxt = 'More like this';
              break;
          case 37:
              btnTxt = 'Most popular';
              break;
          case 38:
              btnTxt = 'Start free trial';
              break;
          case 39:
              btnTxt = 'Join';
              break;
          case 40:
              btnTxt = 'Share';
              break;
          case 41:
              btnTxt = 'Try now';
              break;
          case 42:
              btnTxt = 'Join now';
              break;
          case 43:
              btnTxt = 'Top ten';
              break;
          case 44:
              btnTxt = 'Dislike';
              break;
          case 45:
              btnTxt = 'Hate';
              break;
          case 46:
              btnTxt = 'Not fussed';
              break;
          case 47:
              btnTxt = 'Neither';
              break;
          case 48:
              btnTxt = 'Like';
              break;
          case 49:
              btnTxt = 'Love';
              break;
          case 50:
              btnTxt = 'Search';
              break;
          case 51:
              btnTxt = 'Find more';
              break;
          case 52:
              btnTxt = 'More';
              break;
          case 53:
              btnTxt = 'Show me how';
              break;
          case 54:
              btnTxt = 'Read more';
              break;
          case 55:
              btnTxt = 'Show me more';
              break;
          case 56:
              btnTxt = 'Take me there';
              break;
          case 57:
              btnTxt = 'Take me';
              break;
          case 58:
              btnTxt = 'Show me';
              break;
          case 59:
              btnTxt = 'Setup';
              break;
          case 60:
              btnTxt = 'Watch';
              break;
          case 61:
              btnTxt = 'Let me watch';
              break;
          case 62:
              btnTxt = 'Let me see';
              break;
          case 63:
              btnTxt = 'Browse';
              break;
          case 64:
              btnTxt = 'See more online';
              break;
          case 65:
              btnTxt = 'Ask online';
              break;
          case 66:
              btnTxt = 'Online help';
              break;
          case 67:
              btnTxt = 'Open app';
              break;
          case 68:
              btnTxt = 'Help';
              break;
          case 69:
              btnTxt = 'Call us';
              break;
          case 70:
              btnTxt = 'Ask for help';
              break;
          case 71:
              btnTxt = 'Ring us';
              break;
          case 72:
              btnTxt = 'Ring for help';
              break;
          case 73:
              btnTxt = 'Support';
              break;
          case 74:
              btnTxt = 'Forums';
              break;
          case 75:
              btnTxt = 'Try our forums';
              break;
          case 76:
              btnTxt = 'Chat';
              break;
          case 77:
              btnTxt = 'Try our chat';
              break;
          case 78:
              btnTxt = 'Online support';
              break;
          case 79:
              btnTxt = 'Support';
              break;
          case 80:
              btnTxt = 'Still an issue?';
              break;
          case 81:
              btnTxt = 'Request demo';
          case 82:
              btnTxt = 'Request trial';
              break;
          case 83:
              btnTxt = 'Open PDF';
              break;
          case 84:
              btnTxt = 'Send email';
              break;
          default:
              btnTxt = '';
      }
      if (btnTxt !== '') {
          if (actionUrl !== '') {
              var regexPattern = /^(iview\d{0,5}:\/{2}call=)/;
              actionUrl = actionUrl.replace(regexPattern, "tel:");
              htmlTxt = '<a href="' + actionUrl + '" target="_blank" onclick="checkpoint(' + bannerId + ', \'' + ActionType + '\')" class="btn-action"><span class="openLinks">' + btnTxt + '<span></a>';
          }
      }
      return htmlTxt;
  };
  function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
  }
}
function checkpoint(bannerId, ActionType) {
    if (ActionType === 'Browser') {
        window.humleyApi.sendCheckPoint(6001, 'BannerId', bannerId);
    }
}
function sendButtonResponse(message, typeId) { 
    window.humleyApi.sendFeedback(typeId);
    window.HumleyAITemplate.addMessage(document.createTextNode(message),true)
}

