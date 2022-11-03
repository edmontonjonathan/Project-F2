/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Map extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("circuit1", "./Map/costumes/circuit1.svg", { x: 225, y: 115 })
    ];

    this.sounds = [new Sound("pop", "./Map/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.KEY_PRESSED, { key: "m" }, this.whenKeyMPressed)
    ];

    this.vars.x3 = -107.128433125496;
    this.vars.y2 = 65.25398084054217;
    this.vars.a = 360;
    this.vars.GetDirection = 119.10047741154344;
    this.vars.i2 = 175;
    this.vars.la = 360;
  }

  *whenGreenFlagClicked() {
    this.goto(150, 125);
    this.direction = 90;
    this.size = 35;
    this.effects.ghost = 25;
    this.moveAhead();
  }

  *getDirection(dx, dy) {
    if (dy == 0) {
      if (dx > 0) {
        this.vars.GetDirection = 90;
      } else {
        this.vars.GetDirection = -90;
      }
    } else {
      this.vars.GetDirection = this.radToDeg(Math.atan(dx / dy));
      if (dy < 0) {
        if (dx > 0) {
          this.vars.GetDirection += 180;
        } else {
          if (dx < 0) {
            this.vars.GetDirection += -180;
          } else {
            this.vars.GetDirection = 180;
          }
        }
      }
    }
  }

  *whenKeyMPressed() {}

  *reposition() {
    this.goto(
      (0 - this.vars.x3) * Math.cos(this.degToRad(this.vars.a)) -
        (0 - this.vars.y2) * Math.sin(this.degToRad(this.vars.a)),
      (0 - this.vars.y2) * Math.cos(this.degToRad(this.vars.a)) +
        (0 - this.vars.x3) * Math.sin(this.degToRad(this.vars.a))
    );
    this.direction = 0 - this.vars.a;
  }
}
