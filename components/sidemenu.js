
  //
  // GRAMMAR CORRECTER
  //

  App.initHTML.sidemenu = {}

  App.initHTML.sidemenu.html = `
    <div class="de-menu">
      <ul>
        <li> <a href="https://paper.dropbox.com/"> Homepage </a> </li>
        <li> <a href="about:debugging"> about:debugging </a> </li>
        <li> <a href="https://paper.dropbox.com/doc/Main-Todo-lQDqNgWboBgDosMd8Qkci"> ★ Main Todo </a> </li>
        <li> <a href="https://paper.dropbox.com/doc/Webdev-JuS9BdjvVcbXkLh9LjzJf"> ★ Webdev </a> </li>
        <li> <a href="https://paper.dropbox.com/doc/31ten-L0723oRvMt7EL4dHWXmGK"> ★ 31ten </a> </li>
        <li> <a href="https://paper.dropbox.com/doc/31ten-L0723oRvMt7EL4dHWXmGK"> ★ 31ten </a> </li>
        <li> <p id="toggleEncryption"> Encrypt Text </p> </li>
        <li> <p id="grammarChecker"> grammar </p> </li>
        <li> <p id="timecounter"> </p> </li>
      </ul>
    </div>
  `
  App.initHTML.sidemenu.css = `
    .de-wrapper {

    }
    .de-menu {
      position: fixed;
      right: 50px;
      top: 100px;
      border: 1px red solid;
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
        console.log(m)
        var replacement = (m.replacements && m.replacements[0]) ? m.replacements[0].value : ''
        var finalMessage = " <span class='de-grammar-error'> <span class='de-grammar-icon'>*E*</span> <span class='de-grammar-message'>"+m.message+" - "+replacement+" </span></span> "
        sentence = sentence.splice(addedLength + m.offset, 0, finalMessage)
        addedLength = addedLength + finalMessage.length
      })
      return sentence
    }

    App.grammar.html.submit.onclick = function () {
      $j.ajax({
        type: "POST",
        url: App.grammar.config.endpoint,
        data: App.grammar.toCorrect,
        success: function(e){
          App.grammar.html.result.innerHTML = App.grammar.outputCorrected(App.grammar.toCorrect.text, e)
        },
        error: function(e){console.log('error',e)}
      });
    }

    App.grammar.html.toggleButton.onclick = function () {
      App.popup.open('grammar')
    }
  }, 1000)



  console.log('component/grammar loaded')
