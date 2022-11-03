/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class OtherCars extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("red1", "./OtherCars/costumes/red1.png", { x: 34, y: 49 })
    ];

    this.sounds = [new Sound("meow", "./OtherCars/sounds/meow.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "create clones" },
        this.whenIReceiveCreateClones
      ),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick)
    ];

    this.vars.carid = 1;
    this.vars.py = -999;
    this.vars.z2 = 370.3703703703704;
  }

  *whenIReceiveCreateClones() {
    this.visible = false;
    this.vars.carid = 1;
  }

  *whenIReceiveTick() {
    this.vars.py = this.stage.vars.carspy[this.vars.carid - 1];
    if (this.vars.py < -177) {
      this.visible = false;
    } else {
      this.goto(this.stage.vars.carspx[this.vars.carid - 1], this.vars.py);
      this.vars.z2 = (-100 / (this.vars.py - 85)) * 100;
      this.size = 10000 / this.vars.z2;
      this.visible = true;
    }
  }
}
