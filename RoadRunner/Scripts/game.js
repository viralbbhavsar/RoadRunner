/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="constants.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/runningpath.ts" />
/// <reference path="objects/hero.ts" />
/// <reference path="objects/enemycar.ts" />
/// <reference path="objects/fuel.ts" />
/// <reference path="objects/button.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/scoreboard.ts" />
/// <reference path="states/gameover.ts" />
/// <reference path="states/menu.ts" />
/// <reference path="states/play.ts" />
// Game Variables +++++++++++++++++++++++++++++++++++++++++++++
var stats = new Stats();
var canvas;
var stage;
var assetLoader;
// Score Variables
var finalScore = 0;
var highScore = 0;
// State Variables
var currentState;
var currentStateFunction;
var stateChanged = false;
// Game Objects
var gameOver;
var play;
var menu;
// asset manifest - array of asset objects
var manifest = [
    { id: "hero", src: "assets/images/hero.jpg" },
    { id: "runningPath", src: "assets/images/runningpath.png" },
    { id: "enemyCar", src: "assets/images/enemycar.gif" },
    { id: "fuel", src: "assets/images/fuel.jpg" },
    { id: "tryAgainButton", src: "assets/images/playagainbutton.png" },
    { id: "playButton", src: "assets/images/playButton.png" },
    { id: "engine", src: "assets/audio/engine.ogg" },
    { id: "yay", src: "assets/audio/yay.ogg" },
    { id: "thunder", src: "assets/audio/thunder.ogg" }
];
function preload() {
    assetLoader = new createjs.LoadQueue(); // instantiated assetLoader
    assetLoader.installPlugin(createjs.Sound);
    assetLoader.on("complete", init, this); // event handler-triggers when loading done
    assetLoader.loadManifest(manifest); // loading my asset manifest
}
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    setupStats();
    currentState = constants.MENU_STATE;
    changeState(currentState);
}
// UTILITY METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function setupStats() {
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '650px';
    stats.domElement.style.top = '440px';
    document.body.appendChild(stats.domElement);
}
//GAME LOOP +++++++++++++++++++++++++++++
function gameLoop() {
    stats.begin(); // Begin metering
    //update the current state
    currentStateFunction.update();
    //check for the state changed
    if (stateChanged) {
        changeState(currentState);
    }
    stage.update(); // Refreshes our stage
    stats.end(); // End metering
}
// Our Game Kicks off in here
function changeState(state) {
    stateChanged = false;
    switch (state) {
        case constants.MENU_STATE:
            // Instantiate Menu State
            menu = new states.Menu();
            currentStateFunction = menu;
            break;
        case constants.PLAY_STATE:
            // Instantiate Play State
            play = new states.Play();
            currentStateFunction = play;
            break;
        case constants.GAME_OVER_STATE:
            // Instantiate Game Over State
            gameOver = new states.GameOver();
            currentStateFunction = gameOver;
            break;
    }
}
//# sourceMappingURL=game.js.map