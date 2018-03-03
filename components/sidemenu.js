App.initHTML.sidemenu = {}

App.initHTML.sidemenu.htmlTop = `
  <div id="de-sidemenu">
`
App.initHTML.sidemenu.htmlBottom = `
  </div>
`

App.initHTML.sidemenu.css = `
  .de-wrapper {

  }
  #de-sidemenu {
    position: fixed;
    right: 50px;
    top: 100px;
    padding: 20px;
    border-radius: ${App.style.radius};
    box-shadow:  ${App.style.shadow};
    font-size: 10px;
    background: rgba(255,255,255,0.8)
  }

  #de-sidemenu ul {
  }

  #de-sidemenu ul li {
    margin-bottom: 10px;
  }
`

console.log('component/sidemenu loaded')
