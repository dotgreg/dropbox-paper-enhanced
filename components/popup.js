
  //
  // POPUP
  //

  App.initHTML.popup = {}

  App.initHTML.popup.htmlTop = `
    <div id="de-popup">
      <div id="de-popup-close">X</div>
  `
  App.initHTML.popup.htmlBottom = `
    </div>
  `

  App.initHTML.popup.css = `
    /* POPUP */
    #de-popup {
      position: fixed;
      display:none;
      top: 150px;
      width: 300px;
      right: 100px;
      background: white;
      box-shadow: 1px 1px 1px rgba(0,0,0,0.2)
      padding: 15px;
    }

    #de-popup input {
      padding: 7px 10px;
      margin: 0px 0px 2px 2px;
      border: grey;
      background: #eee;
      width: 100px;
    }

    #de-popup-input {
      display: block;
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
      popup.style.left = window.innerWidth - 300 + 'px'

      _.map(App.popup.html.panels, function(p) {
        p.style.display = 'none'
      })
      document.getElementById("de-popup-panel-"+panel).style.display = 'block'
    }

    App.popup.html.close.onclick = App.popup.close
  }, 1000)

  console.log('component/popup loaded')
