module objects {

    export class EnemyCar extends objects.GameObject {

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("enemyCar");
            this.name = "enemyCar";
            this.soundString = "thunder";
            this._dx = 5;
            this._reset();

        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++
        private _reset() {
            // set the island to start at a random x value
            this.x = this.height;
            this.y = Math.floor(Math.random() * constants.SCREEN_HEIGHT);
        }

        private _checkBounds() {
            if (this.x > (constants.SCREEN_WIDTH + this.width)) {
                this._reset();
            }
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.x += this._dx;
            this._checkBounds();
        }
    }

}     