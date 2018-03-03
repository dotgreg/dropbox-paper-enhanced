
  //
  // POPUP
  //

  App.initHTML.popup = {}

  App.initHTML.popup.htmlTop = `
    <div id="de-popup">
      <div id="de-popup-close">🗙</div>
  `
  App.initHTML.popup.htmlBottom = `
    </div>
  `

  App.initHTML.popup.css = `
    /* POPUP */
    #de-popup-close {
      position: absolute;
      top: 0px;
      right: 0px;
      padding: 10px;
      cursor: pointer;
    }

    #de-popup {
      font-size: 10px;
      position: fixed;
      display:none;
      top: 150px;
      width: 300px;
      right: 100px;
      background: white;
      border-radius: 3px;
      padding: 30px 10px 10px 10px;
      box-shadow: 0px 0px 2px rgba(99,114,130,0.26);
      font-size: 10px;
    }

    #de-popup textarea,
    #de-popup input {
      padding: 7px 10px!important;
      margin: 0px 0px 2px 2px!important;
      border: grey;
      background: #eee;
      border-radius: 3px!important;
      line-height: 18px!important;
    }

    #de-popup select {
      padding: 7px 10px;
      background: #eee;
      border: none;
    }

    #de-popup-input {
      display: block;
    }

    #de-popup input,
    #de-popup textarea {
      font-size: 10px;
    }
  `

  setTimeout(function() {
    App.popup = {
      html: {
        popup: document.getElementById('de-popup'),
        close: document.getElementById('de-popup-close'),
        panels: document.getElementsByClassName('de-popup-panel')
      }
    }

    App.popup.toggle = function (panel) {
      var popup = App.popup.html.popup
      if (popup.style.display === 'block') App.popup.close()
      else  App.popup.open(panel)
    }
    App.popup.close = function () {
      var popup = App.popup.html.popup
      popup.style.display = 'none'
    }
    App.popup.open = function (panel) {
      top = '200px';
      var popup = App.popup.html.popup
      popup.style.display = 'block'
      popup.style.top = top + 'px'
      popup.style.left = window.innerWidth - 400 + 'px'

      _.map(App.popup.html.panels, function(p) {
        p.style.display = 'none'
      })
      document.getElementById("de-popup-panel-"+panel).style.display = 'block'
    }

    App.popup.html.close.onclick = App.popup.close
  }, 1000)

  console.log('component/popup loaded')
