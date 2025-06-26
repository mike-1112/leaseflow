// app/javascript/application.js

// 1) Turbo (must come first)
import "@hotwired/turbo-rails"

// 2) Stimulus bootstrap — this will import controllers/index.js,
//    which starts Stimulus and auto-registers every controller there
import "./controllers"
