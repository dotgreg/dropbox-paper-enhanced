App.initHTML.timer = {}

App.initHTML.timer.htmlPopup = `
  <div id="de-popup-panel-timer" class="de-popup-panel">
    <div class="de-container">
      <select name="de-popup-timer-tasks" id="de-popup-timer-tasks">
      </select>
      <input type="button" class="de-button" id="de-popup-timer-toggle-button" value="start" />
      <input type="button" class="de-button" id="de-popup-timer-stop-button" value="stop" />
      <div id="de-popup-timer-sound-wrapper">
        <input type="checkbox" class="de-checkbox" id="de-popup-timer-sound" value="sound" checked />
        <span> sound </span>
      </div>
    </div>
    <div class="de-container">
      <textarea id="de-timer-editor-textarea"></textarea>
    </div>
    <input type-"button" class="de-button" id="de-timer-editor-save" value="save"/>
  </div>
`

App.initHTML.timer.html = `
    <div class="de-container">
      <p id="de-timer-toggle" class="de-button"> Timer </p>
    </div>
    <div id="de-timer-status-wrapper">
      <p id="de-timer-status"> </p>
      <p id="de-timer-status-bg"> </p>
    </div>
`
App.initHTML.timer.css = `
  #de-timer {

  }
  #de-timer-edit-button {

  }

  #id-popup-timer-sound {

  }

  #de-popup-timer-sound-wrapper {
    position: absolute;
    top: 40px;
    right: 20px;
  }
  #de-popup-timer-sound-wrapper input {
    position: relative;
    top: 2px;
  }
  #de-popup-timer-sound-wrapper span {
  }

  #de-timer-editor-textarea {
    width: 98%;
    height: 200px;
  }

  #de-timer-status-wrapper {
    position: relative;
    display: none;
    height: 30px;
    width: 100px;
    border: 1px solid #eee;
  }
  #de-timer-status {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  #de-timer-status-bg {
    background: #eee;
    height: 100%;
  }

`

function timer() {
  App.timer = {
    html: {
      togglePopup: document.getElementById("de-timer-toggle"),

      textarea: document.getElementById("de-timer-editor-textarea"),
      submit: document.getElementById("de-timer-editor-save"),

      toggleTimer: document.getElementById("de-popup-timer-toggle-button"),
      stopTimer: document.getElementById("de-popup-timer-stop-button"),

      status: document.getElementById("de-timer-status"),
      statusbg: document.getElementById("de-timer-status-bg"),
      statusWrapper: document.getElementById("de-timer-status-wrapper"),
      tasks: document.getElementById("de-popup-timer-tasks"),

      sound: document.getElementById("de-popup-timer-sound"),
    },
    state: {
      current: null,
      interval: null,
      task: null
    },
    config: {
      length: 30
    }
  }

  //
  // popup
  //

  App.timer.html.togglePopup.onclick = function () {
    App.popup.open('timer')
    App.timer.html.textarea.value = App.timer.getList()
  }

  //
  // timer
  //

  App.timer.html.toggleTimer.onclick = function () {
    if (!App.timer.state.interval) App.timer.start(App.timer.html.tasks.value)
    else App.timer.pause()
  }

  App.timer.html.stopTimer.onclick = function () {
    App.timer.stop()
  }

  // App.timer.new = function () {
  //
  // }
  //
  App.timer.start = function (task) {
    if (App.timer.state.interval) return false;

    App.timer.html.toggleTimer.value = 'pause'
    if (!App.timer.state.current) App.timer.state.current = 1000 * 60 * App.timer.config.length

    App.timer.state.task = task
    localStorage.setItem("de-timer-task", App.timer.state.task);

    App.timer.state.interval = setInterval(function(){
      if (App.timer.state.current > 0) {
        App.timer.state.current -= 1000
        localStorage.setItem("de-timer-current", App.timer.state.current);

        App.timer.html.status.innerHTML = App.timer.renderStatus(App.timer.state.current)

        App.timer.html.tasks.disabled = true
        App.timer.html.textarea.readOnly  = true
        App.timer.html.statusWrapper.style.display = 'block'

        var total = 1000 * 60 * App.timer.config.length
        var percentage = Math.round(((total - App.timer.state.current) / total) * 100)
        App.timer.html.statusbg.style.width = `${percentage}%`

        App.timer.playSounds(App.timer.state.current / 1000)

      } else {
        App.timer.finish()
      }
    }, 1000)
  }

  App.timer.pause = function () {
    if (App.timer.state.interval) clearInterval(App.timer.state.interval)
    App.timer.state.interval = null
    App.timer.html.toggleTimer.value = 'start'
  }

  App.timer.stop = function () {
    App.timer.clean()
  }

  App.timer.finish = function () {
    App.timer.incrementTaskTime(App.timer.processText(App.timer.getList()), App.timer.state.task)
    App.timer.clean()
  }

  App.timer.clean = function () {
    if (App.timer.state.interval) clearInterval(App.timer.state.interval)

    localStorage.removeItem("de-timer-current");
    localStorage.removeItem("de-timer-task");

    App.timer.html.status.innerHTML = ''
    App.timer.html.statusbg.style.width = '0%'
    App.timer.html.statusWrapper.style.display = 'none'
    App.timer.html.toggleTimer.value = 'start'

    App.timer.html.tasks.disabled = false
    App.timer.html.textarea.readOnly = false

    App.timer.state = {
      current: null,
      interval: null,
      task: null
    }
  }

  App.timer.renderStatus = function (time) {
    var timeInMin = time / (1000 * 60)
    return `${Math.round(timeInMin * 100) / 100} min`
  }

  App.timer.resurectTimer = function () {
    if (!localStorage.getItem("de-timer-current") || !localStorage.getItem("de-timer-task")) return false

    App.timer.state = {
      current: localStorage.getItem("de-timer-current"),
      interval: null,
      task: localStorage.getItem("de-timer-task")
    }

    // App.timer.html.status.innerHTML = App.timer.renderStatus(App.timer.state.current)
    //
    // App.timer.html.tasks.disabled = true
    // App.timer.html.textarea.readOnly  = true
    // App.timer.html.statusWrapper.style.display = 'block'
    App.timer.start()
    setTimeout(function(){App.timer.pause()}, 1000)

    // App.timer.start()
  }

  //
  // Sounds
  //

  App.timer.playSounds = function (sec) {
    if(sec % 60 === 0) {App.timer.playSound("tictac4")}
    if(sec == 1570){App.timer.playSound("1h45")}
    if(sec == 6299){App.timer.playSound("1h45")}
    if(sec == 5399){App.timer.playSound("1h30")}
    if(sec == 4499){App.timer.playSound("1h15")}
    if(sec == 3599){App.timer.playSound("1h")}
    if(sec == 2999){App.timer.playSound("50min")}
    if(sec == 2699){App.timer.playSound("45min")}
    if(sec == 2399){App.timer.playSound("40min")}
    if(sec == 1799){App.timer.playSound("30min")}
    if(sec == 1199){App.timer.playSound("20min")}
    if(sec == 899){App.timer.playSound("15min")}
    if(sec == 599){App.timer.playSound("10min")}
    if(sec == 299){App.timer.playSound("5min")}
    if(sec == 119){App.timer.playSound("2min")}
    if(sec == 59){App.timer.playSound("1min")}
    if(sec == 5){App.timer.playSound("velo")}
  }

  App.timer.playSound = function (sound) {
    if (App.timer.html.sound.checked) {
      var path = browser.extension.getURL("components/timer/assets/"+sound+".wav");
      var snd = new Audio(path);
      snd.play();
    } else {
      console.log('no sound config')
    }
  }


  //
  // list saving + text analyzer
  //

  App.timer.html.submit.onclick = function () {
    App.timer.setList(App.timer.html.textarea.value)
    App.timer.updateTasksListHtml()
  }

  App.timer.updateTasksListHtml = function () {
    var array = App.timer.processText(App.timer.getList())

    var res = ''
    _.each(array, function(i){
      if(i.task) res += `<option value="${i.task}">${i.task}</option>`
    })

    App.timer.html.tasks.innerHTML = res
  }

  App.timer.incrementTaskTime = function (array, task) {
    var index = _.findIndex(array, {task: task});
    array.splice(index, 1, {task: task, time: parseInt(array[index].time) + 1});

    var res = ''
    _.each(array, function(i){
      res += `${i.task} | ${i.time} \n`
    })

    App.timer.html.textarea.value = res
    App.timer.setList(res)
    App.timer.updateTasksListHtml()
    // console.log(res)
  }

  App.timer.processText = function (text) {
    var list = text.split("\n")

    var array = []
    _.each(list, function(i){
      var j = i.split("|")
      if (j[0] && j[1]) array.push({task: j[0].trim(), time: j[1].trim()})
    })
    return array
  }

  App.timer.getList = function () {
    return localStorage.getItem("de-timer");
  }
  App.timer.setList = function (text) {
    return localStorage.setItem("de-timer", text);
  }

  // INIT IN BEGINNING HTML LIST TASKS
  App.timer.updateTasksListHtml()

  // IF TIMER DETECTED in localstorage, resurect it
  App.timer.resurectTimer()
}

try {
  setTimeout(function(){timer()}, 1000)
} catch (e) {
  console.log(e);
}

console.log('component/timer loaded')
