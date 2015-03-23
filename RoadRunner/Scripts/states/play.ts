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

    export class Play {

        //INSTANCE VARIABLES ++++++++++++++++++++++++++++++++
        public game: createjs.Container;

        public runningPath: objects.Runningpath;
        public hero: objects.Hero;
        public enemyCar: objects.EnemyCar[] = [];
        public fuel: objects.Fuel;
        public scoreboard: objects.ScoreBoard;

        //CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            // Add space to game
            this.runningPath = new objects.Runningpath();
            this.game.addChild(this.runningPath);


            // Add island to game
            this.hero = new objects.Hero();
            this.game.addChild(this.hero);



            for (var car = constants.ENEMYCAR_NUM; car > 0; car--) {
                this.enemyCar[car] = new objects.EnemyCar();
                this.game.addChild(this.enemyCar[car]);
            }
          
            this.fuel = new objects.Fuel();
            this.game.addChild(this.fuel);
            
            //Add Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);

            stage.addChild(this.game);
        }

        //PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++
        // Calculate the distance between two points ++++++++++++++++++++++++++++++++++++++
        distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }

        //CHECK COLLISION  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        checkCollision(collider: objects.GameObject) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = this.hero.x;
            p1.y = this.hero.y;
            p2.x = collider.x;
            p2.y = collider.y;
            if (this.distance(p2, p1) < ((this.hero.height * 0.5) + (collider.height * 0.5))) {
                if (!collider.isColliding) {
                    createjs.Sound.play(collider.soundString);
                    collider.isColliding = true;

                    switch (collider.name) {
                        case "fuel":
                            this.scoreboard.score += 100;
                            break;
                        case "enemyCar":
                            this.scoreboard.lives--;
                            break;
                    }
                }
            } else {
                collider.isColliding = false;
            }
        } // check collision end

        // UPDATE METHOD
        public update() {
            this.runningPath.update();
            this.hero.update();

            if (this.scoreboard.lives > 0) {
                for (var car = constants.ENEMYCAR_NUM; car > 0; car--) {
                    this.enemyCar[car].update();
                    this.checkCollision(this.enemyCar[car]);
                }
                
                this.fuel.update();
                this.checkCollision(this.fuel);
            }

            this.scoreboard.update();

            if (this.scoreboard.lives < 1) {
                createjs.Sound.stop();
                this.game.removeAllChildren();
                stage.removeAllChildren();
                finalScore = this.scoreboard.score;
                if (finalScore > highScore) {
                    highScore = finalScore;
                }
                currentState = constants.GAME_OVER_STATE;
                stateChanged = true;

            }
        }


    }
} 