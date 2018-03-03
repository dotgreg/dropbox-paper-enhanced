  App.initHTML.encryption = {}

  App.initHTML.encryption.htmlPopup = `
    <div id="de-popup-panel-encryption" class="de-popup-panel">
      <div class="de-container">
        <input type="text" id="de-popup-input" placeholder="input"/>
        <input type="password" id="de-popup-key" placeholder="key" />
        <div class="de-clear"></div>
      </div>
      <div class="de-container">
        <textarea id="de-popup-textarea-encrypted" readonly> </textarea>
      </div>
      <div class="de-container">
        <input type="button" class="de-button" id="de-popup-decrypt-button" value="decrypt" />
        <input type="button" class="de-button" id="de-popup-encrypt-button" value="encrypt" />
      </div>
    </div>
  `
  App.initHTML.encryption.css = `
    #de-popup-panel-encryption {

    }

    #de-popup-panel-encryption #de-popup-input {
      float: left;
      width: 70%;
    }

    #de-popup-panel-encryption #de-popup-key {
      float: left;
      width: 21%;
    }

    #de-popup-textarea-encrypted {
      width: 98%;
      height: 100px;
    }
  `

  setTimeout(function() {
    var encryptButton = document.getElementById('de-popup-encrypt-button')
    var decryptButton = document.getElementById('de-popup-decrypt-button')
    var popup = document.getElementById('de-popup')
    var key = document.getElementById("de-popup-key")
    var text = document.getElementById("de-popup-input")
    var encryptedInput = document.getElementById("de-popup-encrypted")
    var toggleEncryption = document.getElementById("toggleEncryption")
    var textarea = document.getElementById("de-popup-textarea-encrypted")

    textarea.onclick= function() {
      textarea.focus()
      textarea.select()
    }

    toggleEncryption.onclick = function () {
      App.popup.open('encryption')
    }

    encryptButton.onclick = function() {
      var res = window.cipher.encode(key.value, text.value)
      // console.log('encrypt', '\"'+key.value+'\"', '\"'+text.value+'\"', res)
      textarea.innerHTML = res
      textarea.innerText = res
    }
    decryptButton.onclick = function() {
      var res = window.cipher.decode(key.value, text.value)
      // console.log('decrypt', '\"'+key.value+'\"', '\"'+text.value+'\"', res)
      textarea.innerHTML = res
      textarea.innerText = res
    }
  }, 1000)



  console.log('component/encryption loaded')
