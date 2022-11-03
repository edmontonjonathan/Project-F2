/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sky extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("sky", "./Sky/costumes/sky.svg", { x: 480, y: 180 })
    ];

    this.sounds = [new Sound("pop", "./Sky/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick)
    ];
  }

  *whenGreenFlagClicked() {
    this.moveBehind(1000);
    this.stage.vars.horizonX = 0;
    this.goto(-240, 0);
    this.visible = true;
  }

  *whenIReceiveTick() {
    this.x = (this.stage.vars.horizonX % 480) - 240;
  }
}
