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
        <li> <p id="toggleEncryption" class="de-button"> Encrypt </p> </li>
        <li> <p id="grammarChecker" class="de-button"> SpellCheck </p> </li>
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
      padding: 20px;
      border-radius: ${App.style.radius};
      box-shadow:  ${App.style.shadow};
      font-size: 10px;
      background: rgba(255,255,255,0.8)
    }

    .de-menu ul {
    }

    .de-menu ul li {
      margin-bottom: 10px;
    }
  `

  console.log('component/sidemenu loaded')
