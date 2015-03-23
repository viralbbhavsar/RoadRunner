module objects {

    export class Hero extends objects.GameObject {
     
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("hero");

            this.x = constants.SCREEN_WIDTH - 30;


        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++

        public update() {
            this.y = stage.mouseY;
        }
    }

}    