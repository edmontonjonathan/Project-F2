/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("grass1", "./Sprite2/costumes/grass1.png", { x: 480, y: 4 }),
      new Costume("grass2", "./Sprite2/costumes/grass2.png", { x: 480, y: 4 })
    ];

    this.sounds = [new Sound("pop", "./Sprite2/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "create clones" },
        this.whenIReceiveCreateClones
      ),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick)
    ];

    this.vars.id = 999;
    this.vars.x = -999;
  }

  *whenIReceiveCreateClones() {
    this.visible = false;
    yield* this.createClones();
  }

  *whenIReceiveTick() {
    if (this.costumeNumber == 1) {
      if (this.vars.id > this.stage.vars.grass1.length) {
        this.vars.x = -999;
      } else {
        this.vars.x = this.stage.vars.grass1x[this.vars.id - 1];
        this.y = this.stage.vars.grass1[this.vars.id - 1];
      }
    } else {
      if (this.vars.id > this.stage.vars.grass2.length) {
        this.vars.x = -999;
      } else {
        this.vars.x = this.stage.vars.grass2x[this.vars.id - 1];
        this.y = this.stage.vars.grass2[this.vars.id - 1];
      }
    }
    if (this.vars.x > -477 && this.vars.x < 477) {
      this.x = this.vars.x;
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *createClones() {
    this.goto(0, 0);
    this.costume = "grass1";
    this.vars.id = 0;
    for (let i = 0; i < 95; i++) {
      this.vars.id += 1;
      this.createClone();
      yield;
    }
    this.costume = "grass2";
    this.vars.id = 0;
    for (let i = 0; i < 95; i++) {
      this.vars.id += 1;
      this.createClone();
      yield;
    }
    this.vars.id = 999;
  }
}
