App.initHTML.shortcuts = {}

App.initHTML.shortcuts.htmlPopup = `

`
App.initHTML.shortcuts.html = `

`
App.initHTML.shortcuts.css = `
  #de-shortcuts-small-popup {
    display: none;
    position: fixed;
    top: 100px;
    font-size: 8px;
    left: 100px;
  }

  #de-shortcuts-small-popup-input {
    font-size: 8px;
    width: 200px;
  }

  #de-shortcuts-editor-textarea {
    width: 98%;
    height: 200px;
  }
`

App.initHTML.shortcuts.htmlPopup = `
  <div id="de-popup-panel-shortcuts" class="de-popup-panel">
    <div class="de-container">
      <input type="text"  id="de-shortcuts-small-popup-input" placeholder="Type a shortcut" />
    </div>
    <div class="de-container">
      <div id="de-shortcuts-list"></div>
    </div>
    <div class="de-container">
      <textarea id="de-shortcuts-editor-textarea"></textarea>
    </div>
    <input type-"button" class="de-button" id="de-shortcuts-editor-save" value="save"/>
  </div>
`

setTimeout(function() {

  App.shortcuts = {
    html: {
      popInput: document.getElementById('de-shortcuts-small-popup-input'),
      popWrapper: document.getElementById('de-shortcuts-small-popup'),

      list: document.getElementById("de-shortcuts-list"),
      textarea: document.getElementById("de-shortcuts-editor-textarea"),
      submit: document.getElementById("de-shortcuts-editor-save"),

      toggleButton: document.getElementById("de-shortcuts-toggle-button"),
    }
  }

  var getKeyNum = function (e) {
    var keynum;
    if(window.event) { // IE
      keynum = e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera
      keynum = e.which;
    }
    return keynum
  }

  var getChar = function (e) {
    return String.fromCharCode(getKeyNum(e))
  }

  //
  // KEY LOG and COPY SYSTEM
  //

  App.shortcuts.checkActivePattern = function (e) {
    if (e.ctrlKey && e.altKey && getChar(e) == 'e') {
      App.shortcuts.openPopup()
    }
  }

  App.shortcuts.checkShortcutPatterns = function (text) {
    _.each(App.shortcuts.processText(App.shortcuts.getList()), function(p) {
      if (text === p[0]){
        var res = eval(p[1])
        App.shortcuts.html.popInput.value = res
        App.shortcuts.html.popInput.select()
        var copyClipboardState = document.execCommand('copy')
        setTimeout(function(){
          App.shortcuts.html.popInput.value = `copied -> ${res}`
          App.shortcuts.html.popInput.disabled = true
        }, 100)
        setTimeout(function(){
          App.shortcuts.html.popInput.value = ''
          App.shortcuts.html.popInput.disabled = false
          App.popup.close()
        }, 1000)
      }
    })
  }

  App.shortcuts.html.popInput.onkeyup = function(e) {
    e.stopPropagation();
    App.shortcuts.checkShortcutPatterns(App.shortcuts.html.popInput.value)
  }

  document.onkeypress = function(e) {
    App.shortcuts.checkActivePattern(e)
  }

  //
  // popup system
  //

  App.shortcuts.openPopup = function () {
    App.popup.open('shortcuts')
    App.shortcuts.html.textarea.value = App.shortcuts.getList()
    App.shortcuts.html.list.innerHTML = `available: ${App.shortcuts.createListString()}`

    App.shortcuts.html.popInput.value = ''
    App.shortcuts.html.popInput.disabled = false
    App.shortcuts.html.popInput.focus()
  }

  //
  // Saving pattern system
  //

  App.shortcuts.html.submit.onclick = function () {
    App.shortcuts.setList(App.shortcuts.html.textarea.value)
    App.shortcuts.openPopup()
  }

  App.shortcuts.createListString = function () {
    var list = ''
    _.each(App.shortcuts.processText(App.shortcuts.getList()), function(p) {
      list += `${p[0]}, `
    })
    console.log(list)
    return list
  }

  App.shortcuts.html.toggleButton.onclick = function () {
    App.shortcuts.openPopup()
  }

  App.shortcuts.processText = function (text) {
    var list = text.split("\n")

    var array = []
    _.each(list, function(i){
      var j = i.split("|")
      if (j[0] && j[1]) array.push([j[0].trim(), j[1].trim()])
    })
    return array
  }

  App.shortcuts.getList = function () {
    return localStorage.getItem("de-shortcuts");
  }
  App.shortcuts.setList = function (text) {
    return localStorage.setItem("de-shortcuts", text);
  }

}, 1000)



console.log('component/shortcuts loaded')
