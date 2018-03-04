  App.initHTML.grammar = {}

  App.initHTML.grammar.htmlPopup = `
    <div id="de-popup-panel-grammar" class="de-popup-panel">
      <div class="de-container">
        <textarea id="de-popup-grammar-textarea"> </textarea>
      </div>
      <div class="de-container">
        <div id="de-popup-grammar-result"></div>
        <div id="de-popup-grammar-result-sentiment"></div>
      </div>
      <div class="de-container">
        <input type="button" class="de-button" id="de-popup-grammar-correct" value="correct" />
        <select name="de-popup-grammar-lang" id="de-popup-grammar-lang">
          <option value="en-US">en-US</option>
          <option value="fr">FR</option>
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

      #de-popup-grammar-result-sentiment .red {
        color: red;
      }
      #de-popup-grammar-result-sentiment .green {
        color: green;
      }
  `

  setTimeout(function() {

    App.grammar = {
      html: {
        textarea: document.getElementById("de-popup-grammar-textarea"),
        lang: document.getElementById("de-popup-grammar-lang"),
        submit: document.getElementById("de-popup-grammar-correct"),
        result: document.getElementById("de-popup-grammar-result"),
        resultSentiment: document.getElementById("de-popup-grammar-result-sentiment"),
        toggleButton: document.getElementById("grammarChecker"),
      },
      config: {
        endpoint: 'https://languagetool.org/api/v2/check',
        sentiment: {
          endpoint: 'https://language.googleapis.com/v1/documents:analyzeSentiment',
          token: localStorage.getItem("de-google-sentiment")
        }
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

      App.grammar.html.result.innerHTML = ''
      App.grammar.html.resultSentiment.innerHTML = ''

      App.grammar.correctGrammar(function(e) {
        App.grammar.html.result.innerHTML = App.grammar.outputCorrected(App.grammar.toCorrect.text, e)
        App.grammar.html.submit.value = 'correct'
      })

      // GOOGLE SENTIMENT ANALYSIS ONLY WORKING IF de-google-sentiment in localstorage exist console.log(App.grammar.config.sentiment.token)
      if (App.grammar.html.lang.value === 'en-US' && App.grammar.config.sentiment.token) {
        App.grammar.analyzeSentiment(function(e) {
          var magnitude = e.documentSentiment.magnitude * 10
          var score = e.documentSentiment.score * 10
          var indicator = (score > 0) ? '+' : '-'
          var color = (score > 0) ? 'green' : 'red'
          var res = _.repeat( indicator , magnitude)
          App.grammar.html.resultSentiment.innerHTML = `<div class="${color}">${res}</div>`
        })
      }
    }

    App.grammar.html.toggleButton.onclick = function () {
      App.popup.open('grammar')
    }

    App.grammar.correctGrammar = function (callback) {
      $j.ajax({
        type: "POST",
        url: App.grammar.config.endpoint,
        data: App.grammar.toCorrect,
        success: function(e){
          callback(e)
        },
        error: function(e){console.log('error',e)}
      });
    }

    App.grammar.analyzeSentiment = function (callback) {
      var data = {
        'encodingType': 'UTF8',
        'document': {
          'type': 'PLAIN_TEXT',
          'content': App.grammar.toCorrect.text
        }
      }

      $j.ajax({
        type: "POST",
        headers: {"Authorization":" Bearer " + App.grammar.config.sentiment.token, "Content-Type": "application/json; charset=utf-8"},
        url: App.grammar.config.sentiment.endpoint,
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(e){
          callback(e)
        },
        error: function(e){console.log('error',e)}
      });
    }
  }, 1000)



  console.log('component/grammar2 loaded')
