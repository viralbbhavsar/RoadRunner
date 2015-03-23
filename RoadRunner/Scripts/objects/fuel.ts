module objects {

    export class Fuel extends objects.GameObject {

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("fuel");
            this.name = "fuel";
            this.soundString = "yay";
            this._dx = 4;
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