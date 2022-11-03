/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Fog extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Fog", "./Fog/costumes/Fog.svg", { x: 240, y: 181 }),
      new Costume("Gradient2", "./Fog/costumes/Gradient2.svg", {
        x: 241,
        y: 180
      }),
      new Costume("Gradient3", "./Fog/costumes/Gradient3.svg", {
        x: 240,
        y: 180
      }),
      new Costume("Gradient4", "./Fog/costumes/Gradient4.svg", {
        x: 243,
        y: 61
      })
    ];

    this.sounds = [new Sound("pop", "./Fog/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.visible = true;
    this.moveAhead();
  }
}
