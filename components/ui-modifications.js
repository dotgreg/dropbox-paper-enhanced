App.initHTML.uiModifications = {}
App.initHTML.uiModifications.css = `
  /* MODIFICATIONS UI */

  .ace-editor {
    padding-top: 30px!important;
  }

  #padpage {
    width: 100%!important;
    margin-left: 10%!important;
    max-width: 1100px!important;
  }

  #padeditor {
    max-width: 1000px!important;
  }

  .ace-feature-bigtitle > .ace-editor > div:first-child {
    font-size: 30px!important;
    line-height: 31px!important;
  }

  div.ace-line {
    font-size: 13px!important;
    line-height: 21px!important;
  }

  .ace-editor div.ace-line.line-list-type-code {
    padding: 0px 8px!important;
  }

  .ace-editor code.listtype-code {
    font-size: 12px!important;
  }
`



  console.log('component/ui-modifications loaded')
