/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MapTrace extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("path", "./MapTrace/costumes/path.png", { x: 6, y: 26 }),
      new Costume("red dot", "./MapTrace/costumes/red dot.png", { x: 8, y: 8 })
    ];

    this.sounds = [new Sound("pop", "./MapTrace/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.KEY_PRESSED, { key: "m" }, this.whenKeyMPressed),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick)
    ];

    this.vars.d = 14;
  }

  *whenGreenFlagClicked() {
    this.costume = "red dot";
    this.visible = true;
    yield* this.wait(0.1);
    this.moveAhead();
  }

  *whenKeyMPressed() {
    this.costume = "path";
    this.goto(0, 0);
    this.visible = true;
    yield* this.wait(0.1);
    this.moveAhead();
  }

  *whenIReceiveTick() {
    this.vars.d =
      (Math.floor(this.sprites["Game"].vars["y"] / 400) %
        this.stage.vars.trackX.length) +
      1;
    this.goto(
      this.sprites["Map"].x + this.stage.vars.trackY[this.vars.d - 1] * 0.35,
      this.sprites["Map"].y - this.stage.vars.trackX[this.vars.d - 1] * 0.35
    );
  }
}
