  App.initHTML.grammar = {}

  App.initHTML.grammar.htmlPopup = `
    <div id="de-popup-panel-grammar" class="de-popup-panel">
      <div class="de-container">
        <textarea id="de-popup-grammar-textarea"> </textarea>
      </div>
      <div class="de-container">
        <div id="de-popup-grammar-result"></div>
      </div>
      <div class="de-container">
        <input type="button" class="de-button" id="de-popup-grammar-correct" value="correct" />
        <select name="de-popup-grammar-lang" id="de-popup-grammar-lang">
          <option value="fr">FR</option>
          <option value="en-US">en-US</option>
        </select>
      </div>
    </div>
  `
  App.initHTML.grammar.css = `
      .de-grammar-error {
        color: red;
      }
      .de-grammar-icon {

      }

      #de-popup-grammar-textarea {
        width: 98%;
        height: 100px;
      }

      .de-grammar-message {
        display: none;
        position: absolute;
        min-width: 100px;
        background: rgba(255,255,255,1);
        padding: 10px;
        box-shadow: ${App.style.shadow};
      }
      .de-grammar-error:hover .de-grammar-message {
        display: block;
      }
  `

  setTimeout(function() {

    App.grammar = {
      html: {
        textarea: document.getElementById("de-popup-grammar-textarea"),
        lang: document.getElementById("de-popup-grammar-lang"),
        submit: document.getElementById("de-popup-grammar-correct"),
        result: document.getElementById("de-popup-grammar-result"),
        toggleButton: document.getElementById("grammarChecker"),
      },
      config: {
        endpoint: 'https://languagetool.org/api/v2/check',
      },
      toCorrect: {text: 'bonjour je suis gregoire et je fait plain de fotes', language:'fr'}
    }

    App.grammar.outputCorrected = function(sentence, obj) {
      var addedLength = 0
      _.each(obj.matches, function(m) {
        // console.log(m)
        var replacement = (m.replacements && m.replacements[0]) ? m.replacements[0].value : ''
        var finalMessage = " <span class='de-grammar-error'> <span class='de-grammar-icon'>*E*</span> <span class='de-grammar-message'>"+m.message+" - "+replacement+" </span></span> "
        sentence = sentence.splice(addedLength + m.offset, 0, finalMessage)
        addedLength = addedLength + finalMessage.length
      })
      return sentence
    }

    App.grammar.html.submit.onclick = function () {

      App.grammar.toCorrect = {text: App.grammar.html.textarea.value, language: App.grammar.html.lang.value};
      App.grammar.html.submit.value = 'correcting...'

      $j.ajax({
        type: "POST",
        url: App.grammar.config.endpoint,
        data: App.grammar.toCorrect,
        success: function(e){
          App.grammar.html.result.innerHTML = App.grammar.outputCorrected(App.grammar.toCorrect.text, e)
          App.grammar.html.submit.value = 'correct'
        },
        error: function(e){console.log('error',e)}
      });
    }

    App.grammar.html.toggleButton.onclick = function () {
      App.popup.open('grammar')
    }
  }, 1000)



  console.log('component/grammar2 loaded')
