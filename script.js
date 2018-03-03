// document.body.style.border = "10px solid orange";



//
// MAIN INJECTION
//

function main () {
  var body = document.body

  var htmldata = ''
  htmldata = `
      ${App.initHTML.sidemenu.html}

      ${App.initHTML.popup.htmlTop}
        ${App.initHTML.grammar.htmlPopup}
        ${App.initHTML.encryption.htmlPopup}
      ${App.initHTML.popup.htmlBottom}

    <style>
      ${App.initHTML.sidemenu.css}
      ${App.initHTML.popup.css}
      ${App.initHTML.uiModifications.css}
      ${App.initHTML.grammar.css}
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
