/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/runningpath.ts" />
/// <reference path="../objects/hero.ts" />
/// <reference path="../objects/fuel.ts" />
/// <reference path="../objects/enemycar.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/scoreboard.ts" />
    
 

module states {
    // MENU STATE
    export class Menu {
        // INSTANCE VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++
        public game: createjs.Container;
        public runningPath: objects.Runningpath;
        public playButton: objects.Button;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            // Add ocean to game
            this.runningPath = new objects.Runningpath();
            this.game.addChild(this.runningPath);

            var roadRunner: objects.Label = new objects.Label("ROAD RUNNER", constants.SCREEN_CENTER_WIDTH, 100);
            roadRunner.font = "80px Consolas";
            roadRunner.regX = roadRunner.getMeasuredWidth() * 0.5;
            roadRunner.regY = roadRunner.getMeasuredHeight() * 0.5;
            this.game.addChild(roadRunner);

            this.playButton = new objects.Button("playButton", constants.SCREEN_CENTER_WIDTH, 400);
            this.game.addChild(this.playButton);
            this.playButton.on("click", this.playButtonClicked, this);

            stage.addChild(this.game);
        } // constructor end


        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++
        playButtonClicked() {
            this.game.removeAllChildren();
            stage.removeChild(this.game);
            currentState = constants.PLAY_STATE;
            stateChanged = true;
        }

        // UPDATE METHOD
        public update() {
            this.runningPath.update();
        } // update method end
    }
}   