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
    App.encryption = {}

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
      var res = App.encryption.encrypt(key.value, text.value)
      textarea.innerHTML = res
      textarea.innerText = res
    }
    decryptButton.onclick = function() {
      var res = App.encryption.decrypt(key.value, text.value)
      textarea.innerHTML = res
      textarea.innerText = res
    }

    App.encryption.getKey = function(password) {
      password = password.repeat(31)

      var key = []
      _.each(password, function(char) {
        key.push(parseInt(char.charCodeAt(0)))
      })

      key = key.slice(0, 32)

      return key
    }

    App.encryption.encrypt = function(password, text) {
      var key = App.encryption.getKey(password)
      var textBytes = aesjs.utils.utf8.toBytes(text);
      var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
      var encryptedBytes = aesCtr.encrypt(textBytes);
      var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
      return encryptedHex
    }

    App.encryption.decrypt = function(password, text) {
      var key = App.encryption.getKey(password)
      var encryptedBytes = aesjs.utils.hex.toBytes(text);
      var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
      var decryptedBytes = aesCtr.decrypt(encryptedBytes);
      var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
      return decryptedText
    }



  }, 1000)



  console.log('component/encryption loaded')
