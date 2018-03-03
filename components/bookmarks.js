  App.initHTML.bookmarks = {}

  App.initHTML.bookmarks.htmlPopup = `
    <div id="de-popup-panel-bookmarks" class="de-popup-panel">
      <div class="de-container">
        <textarea id="de-bookmarks-editor-textarea"></textarea>
      </div>
      <input type-"button" class="de-button" id="de-bookmarks-editor-save" value="save"/>
    </div>
  `

  App.initHTML.bookmarks.html = `
      <div id="de-bookmarks">
        <div id="de-bookmarks-edit-button">✎</div>
        <ul id="de-bookmarks-list">

        </ul>
      </div>
  `
  App.initHTML.bookmarks.css = `
    #de-bookmarks {
      position: relative;
      min-height: 100px;
      width: 100%;
    }
    #de-bookmarks-edit-button {
      position: absolute;
      top: -10px;
      right: -10px;
      padding: 10px;
      cursor: pointer;
    }
    #de-bookmarks-editor-textarea {
      width: 98%;
      height: 200px;
    }
  `

  setTimeout(function() {

    App.bookmarks = {
      html: {
        list: document.getElementById("de-bookmarks-list"),

        textarea: document.getElementById("de-bookmarks-editor-textarea"),
        submit: document.getElementById("de-bookmarks-editor-save"),

        toggleButton: document.getElementById("de-bookmarks-edit-button"),
      },
      config: {
        endpoint: 'https://languagetool.org/api/v2/check',
      },
      toCorrect: {text: 'bonjour je suis gregoire et je fait plain de fotes', language:'fr'}
    }

    App.bookmarks.html.toggleButton.onclick = function () {
      App.popup.open('bookmarks')
      App.bookmarks.html.textarea.value = App.bookmarks.getList()
    }

    App.bookmarks.html.submit.onclick = function () {
      App.bookmarks.setList(App.bookmarks.html.textarea.value)
      App.bookmarks.updateHtml()
    }

    App.bookmarks.updateHtml = function () {
      // update the list
      var array = App.bookmarks.processText(App.bookmarks.getList())

      var res = ''
      _.each(array, function(i){
        if(!i[2]) res += `<li><a href="${i[1]}">${i[0]}</a></li>`
        else res += `<li><a href="${i[1]}" target="_${i[2]}">${i[0]}</a></li>`
      })

      // console.log(res)
      App.bookmarks.html.list.innerHTML = res
    }

    App.bookmarks.processText = function (text) {
      var list = text.split("\n")
      console.log(list)
      var array = []
      _.each(list, function(i){
        var j = i.split("|")
        if (j[0] && j[1] && !j[2]) array.push([j[0].trim(), j[1].trim()])
        if (j[0] && j[1] && j[2]) array.push([j[0].trim(), j[1].trim(), j[2].trim()])
      })
      return array
    }

    App.bookmarks.getList = function () {
      return localStorage.getItem("de-bookmarks");
    }
    App.bookmarks.setList = function (text) {
      return localStorage.setItem("de-bookmarks", text);
    }

    // trigger updateHTML in beginning
    App.bookmarks.updateHtml()
  }, 1000)

  console.log('component/bookmarks loaded')
