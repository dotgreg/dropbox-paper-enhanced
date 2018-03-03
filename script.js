function main () {
  var body = document.body

  var htmldata = ''
  htmldata = `
      ${App.initHTML.sidemenu.htmlTop}
        ${App.initHTML.bookmarks.html}
        <ul>
          <li> <p id="toggleEncryption" class="de-button"> Encrypt </p> </li>
          <li> <p id="grammarChecker" class="de-button"> SpellCheck </p> </li>
        </ul>
      ${App.initHTML.sidemenu.htmlBottom}

      ${App.initHTML.popup.htmlTop}
        ${App.initHTML.bookmarks.htmlPopup}
        ${App.initHTML.grammar.htmlPopup}
        ${App.initHTML.encryption.htmlPopup}
      ${App.initHTML.popup.htmlBottom}

    <style>
      .de-container {
        margin-bottom: 5px;
      }
      .de-clear {
        clear:both;
      }
      .de-button {
        padding: 7px 10px!important;
        background: #007af5!important;
        border-radius: 3px!important;
        color: white!important;
        cursor: pointer!important;
        text-align: center!important;
      }
      .de-button:hover {
        background: #238ffc!important;
      }

      ${App.initHTML.sidemenu.css}
      ${App.initHTML.bookmarks.css}
      ${App.initHTML.popup.css}
      ${App.initHTML.uiModifications.css}
      ${App.initHTML.grammar.css}
      ${App.initHTML.encryption.css}
    </style>
  `

    if (document.getElementById('de-wrapper')) {
      document.getElementById('de-wrapper').innerHTML = htmldata;
    } else {
      body.insertAdjacentHTML('beforeend', '<div id="de-wrapper">' + htmldata + '</div>');
    }
}


try {
  console.log('======== SCRIPT DROPBOX ENHANCED STARTED==========')
  main()
} catch (e) {
  console.log(e)
}

console.log('script.js loaded')