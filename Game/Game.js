/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Game extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("red1", "./Game/costumes/red1.png", { x: 34, y: 49 }),
      new Costume("red2", "./Game/costumes/red2.png", { x: 37, y: 49 }),
      new Costume("red3", "./Game/costumes/red3.png", { x: 42, y: 49 }),
      new Costume("red4", "./Game/costumes/red4.png", { x: 46, y: 49 }),
      new Costume("red5", "./Game/costumes/red5.png", { x: 64, y: 48 }),
      new Costume("red6", "./Game/costumes/red6.png", { x: 82, y: 50 }),
      new Costume("red7", "./Game/costumes/red7.png", { x: 76, y: 50 }),
      new Costume("red8", "./Game/costumes/red8.png", { x: 64, y: 52 }),
      new Costume("red9", "./Game/costumes/red9.png", { x: 48, y: 51 }),
      new Costume("red10", "./Game/costumes/red10.png", { x: 41, y: 50 }),
      new Costume("red11", "./Game/costumes/red11.png", { x: 40, y: 50 }),
      new Costume("red12", "./Game/costumes/red12.png", { x: 36, y: 48 }),
      new Costume("red13", "./Game/costumes/red13.png", { x: 36, y: 48 }),
      new Costume("red14", "./Game/costumes/red14.png", { x: 40, y: 48 }),
      new Costume("red15", "./Game/costumes/red15.png", { x: 47, y: 50 }),
      new Costume("red16", "./Game/costumes/red16.png", { x: 53, y: 50 }),
      new Costume("red17", "./Game/costumes/red17.png", { x: 73, y: 52 }),
      new Costume("red18", "./Game/costumes/red18.png", { x: 88, y: 51 }),
      new Costume("red19", "./Game/costumes/red19.png", { x: 86, y: 50 }),
      new Costume("red20", "./Game/costumes/red20.png", { x: 71, y: 51 }),
      new Costume("red21", "./Game/costumes/red21.png", { x: 56, y: 48 }),
      new Costume("red22", "./Game/costumes/red22.png", { x: 47, y: 49 }),
      new Costume("red23", "./Game/costumes/red23.png", { x: 43, y: 49 }),
      new Costume("red24", "./Game/costumes/red24.png", { x: 40, y: 49 })
    ];

    this.sounds = [
      new Sound("acc1", "./Game/sounds/acc1.wav"),
      new Sound("acc2", "./Game/sounds/acc2.wav"),
      new Sound("acc3", "./Game/sounds/acc3.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.y = 75737.51265477999;
    this.vars.i = 0;
    this.vars.psp = 846.8444444444442;
    this.vars.yy = 62;
    this.vars.z = 454.54545454545456;
    this.vars.x1 = 33.17109978898395;
    this.vars.x2 = 565.971099788984;
    this.vars.t = 1361.6868172226546;
    this.vars.roadTarget = 66;
    this.vars.roadTime = 90;
    this.vars.nextcary = 77255.41265477998;
    this.vars.nextcar = 1;
    this.vars.debug = -122;
    this.vars.ecsp = 17.900000000000013;
    this.vars.ects = 17.85811099759303;
    this.vars.nextLapY = 140800;
    this.vars.lapTicks = 594;
    this.vars.roadLag = [66, 66, 66, 66, 66, 66, 66, 66, 66, 66];
  }

  *whenGreenFlagClicked() {
    yield* this.init();
    this.visible = true;
    this.moveAhead();
    this.goto(0, -120);
    yield* this.broadcastAndWait("create clones");
    this.vars.y = 0;
    this.stage.vars.carX = 0;
    this.stage.vars.carSx = 0;
    this.vars.roadTime = 90;
    this.stage.vars.roadAng = 0;
    this.vars.roadTarget = 0;
    this.stage.vars.speed = 0;
    this.stage.vars.carsy.splice(this.vars.nextcar - 1, 1, 20);
    this.vars.ecsp = 0;
    this.vars.ects = 18;
    this.stage.vars.tick = 0;
    this.vars.nextLapY = 400 * this.stage.vars.trackX.length;
    while (true) {
      yield* this.updateTimers();
      if (this.keyPressed("p")) {
        while (!!this.keyPressed("p")) {
          yield;
        }
        while (!this.keyPressed("p")) {
          yield;
        }
        while (!!this.keyPressed("p")) {
          yield;
        }
      }
      this.vars.y += this.stage.vars.speed;
      this.vars.i = this.vars.roadLag[1 - 1];
      this.vars.roadLag.splice(1 - 1, 1);
      this.vars.roadLag.push(this.stage.vars.roadAng);
      this.stage.vars.horizonX += this.stage.vars.speed * (this.vars.i / -50);
      this.stage.vars.carX += this.stage.vars.speed * (this.vars.i / -75);
      yield* this.keys();
      this.stage.vars.mph = Math.round(this.stage.vars.speed * 7);
      yield* this.updateCars();
      yield* this.roadUpdate();
      yield* this.tick();
      yield* this.broadcastAndWait("tick");
      yield;
    }
  }

  *keys() {
    this.stage.vars.carX +=
      (this.stage.vars.speed / 4) *
      (this.stage.vars.carSx * (15 / (this.stage.vars.speed + 10)));
    if (Math.abs(this.stage.vars.speed) > 0.01) {
      if (this.keyPressed("a") || this.keyPressed("left arrow")) {
        this.stage.vars.carSx += -0.4;
      } else {
        if (this.stage.vars.carSlide > 0 && this.stage.vars.carSx < 0) {
          this.stage.vars.carSx += 0.2;
        }
      }
      if (this.keyPressed("d") || this.keyPressed("right arrow")) {
        this.stage.vars.carSx += 0.4;
      } else {
        if (this.stage.vars.carSlide > 0 && this.stage.vars.carSx > 0) {
          this.stage.vars.carSx += -0.2;
        }
      }
    }
    if (this.stage.vars.carSlide > 0) {
      this.stage.vars.carSx = this.stage.vars.carSx * 0.99;
    } else {
      this.stage.vars.carSx = this.stage.vars.carSx * 0.96;
    }
    if (this.stage.vars.carSx < -11) {
      this.stage.vars.carSx = -11;
    } else {
      if (this.stage.vars.carSx > 11) {
        this.stage.vars.carSx = 11;
      }
    }
    yield* this.setCostume((Math.round(this.stage.vars.carSx / 2) % 24) + 1);
    this.stage.vars.isaccellerating = 0;
    if (this.stage.vars.carSlide > 0) {
      if (this.stage.vars.speed > 10 && Math.abs(this.stage.vars.carSx) > 4) {
        this.stage.vars.carSlide = 30;
      } else {
        this.stage.vars.carSlide += -1;
      }
    }
    if (
      this.keyPressed("s") ||
      this.keyPressed("down arrow") || this.keyPressed("space")
    ) {
      this.stage.vars.isaccellerating = -1;
      if (this.stage.vars.speed > 0) {
        this.stage.vars.speed += -0.27;
      } else {
        this.stage.vars.speed += -0.1;
      }
      this.stage.vars.speed = this.stage.vars.speed * 0.99;
      if (this.stage.vars.speed > 10 && Math.abs(this.stage.vars.carSx) > 2) {
        this.stage.vars.carSlide = 30;
      }
    } else {
      if (this.keyPressed("w") || this.keyPressed("up arrow")) {
        this.stage.vars.isaccellerating = 1;
        this.stage.vars.speed += 0.23;
        this.stage.vars.speed = this.stage.vars.speed * 0.99;
      } else {
        this.stage.vars.speed = this.stage.vars.speed * 0.995;
      }
    }
    if (Math.abs(this.stage.vars.carX) > 106) {
      if (Math.abs(this.stage.vars.carX) > 132) {
        this.stage.vars.speed = this.stage.vars.speed * 0.98;
      } else {
        this.stage.vars.speed = this.stage.vars.speed * 0.995;
      }
    }
  }

  *tick() {
    this.stage.vars.grass1 = [];
    this.stage.vars.grass2 = [];
    this.stage.vars.grass1x = [];
    this.stage.vars.grass2x = [];
    this.vars.i = this.stage.vars.roadAng * 0.0001;
    this.vars.yy = -178;
    this.vars.nextcar = 1;
    this.stage.vars.carspy.splice(this.vars.nextcar - 1, 1, -999);
    this.stage.vars.carsy.splice(
      this.vars.nextcar - 1,
      1,
      this.stage.vars.carsy[this.vars.nextcar - 1] + this.vars.ecsp
    );
    this.vars.nextcary = this.stage.vars.carsy[this.vars.nextcar - 1];
    for (let i = 0; i < 60; i++) {
      this.vars.z = (-100 / (this.vars.yy - 80)) * 100;
      this.vars.t =
        this.vars.i * (this.vars.z * this.vars.z) - this.stage.vars.carX;
      this.vars.x1 = this.vars.t - 120;
      this.vars.x2 = this.vars.t + 120;
      this.vars.x1 = this.vars.x1 / (this.vars.z / 100) - 240;
      this.vars.x2 = this.vars.x2 / (this.vars.z / 100) + 240;
      if (this.vars.y + this.vars.z > this.vars.nextcary) {
        this.stage.vars.carspx.splice(
          this.vars.nextcar - 1,
          1,
          (this.stage.vars.carsx[this.vars.nextcar - 1] + this.vars.t) /
            (this.vars.z / 100)
        );
        this.stage.vars.carspy.splice(this.vars.nextcar - 1, 1, this.vars.yy);
        this.vars.nextcary = 999999;
      }
      if ((this.vars.z + this.vars.y) % 100 < 50) {
        this.stage.vars.grass1.push(this.vars.yy);
        if (this.vars.x1 > 0) {
          this.stage.vars.grass1x.push(0);
        } else {
          this.stage.vars.grass1x.push(this.vars.x1);
        }
        this.stage.vars.grass1.push(this.vars.yy);
        if (this.vars.x2 < 0) {
          this.stage.vars.grass1x.push(0);
        } else {
          this.stage.vars.grass1x.push(this.vars.x2);
        }
      } else {
        this.stage.vars.grass2.push(this.vars.yy);
        if (this.vars.x1 > 0) {
          this.stage.vars.grass2x.push(0);
        } else {
          this.stage.vars.grass2x.push(this.vars.x1);
        }
        this.stage.vars.grass2.push(this.vars.yy);
        if (this.vars.x2 < 0) {
          this.stage.vars.grass2x.push(0);
        } else {
          this.stage.vars.grass2x.push(this.vars.x2);
        }
      }
      this.vars.yy += 4;
      yield;
    }
  }

  *roadUpdate() {
    this.vars.roadTarget =
      3 *
      this.stage.vars.trackSx[
        (Math.floor(this.vars.y / 400) % this.stage.vars.trackSx.length) + 1 - 1
      ];
    this.vars.t =
      3 *
      this.stage.vars.trackSx[
        ((Math.floor(this.vars.y / 400) + 1) % this.stage.vars.trackSx.length) +
          1 -
          1
      ];
    this.vars.t = this.vars.t - this.vars.roadTarget;
    this.stage.vars.roadAng =
      this.vars.roadTarget + ((this.vars.y / 400) % 1) * this.vars.t;
  }

  *updateCars() {
    this.vars.t = this.stage.vars.carsy[1 - 1];
    if (this.vars.t < this.vars.y - 600) {
      this.vars.ects = this.random(10, 21.5);
      this.vars.ecsp = this.random(10, 21);
      this.vars.t = this.vars.y + this.random(400, 1500);
      this.stage.vars.carsy.splice(1 - 1, 1, this.vars.t);
      this.stage.vars.carsx.splice(1 - 1, 1, this.random(-120, 120));
    } else {
      if (this.vars.t > this.vars.y + 1500) {
        this.stage.vars.carsy.splice(1 - 1, 1, this.vars.y + 1500);
      } else {
        0;
      }
    }
    if (this.vars.ecsp < this.vars.ects) {
      this.vars.ecsp += 0.1;
    } else {
      if (this.vars.ecsp > this.vars.ects) {
        this.vars.ecsp += -0.1;
      } else {
        0;
      }
    }
  }

  *updateTimers() {
    this.stage.vars.tick += 1;
    if (this.vars.lapTicks == "") {
      if (!(this.vars.y == 0)) {
        this.vars.lapTicks = 1;
      }
    } else {
      this.vars.lapTicks += 1;
      this.stage.vars.lapTime = "";
      this.vars.i = this.vars.lapTicks;
      yield* this.appendTime(Math.floor(((this.vars.i % 30) / 30) * 100), 0);
      this.vars.i = Math.floor(this.vars.i / 30);
      yield* this.appendTime(this.vars.i % 60, ".");
      this.vars.i = Math.floor(this.vars.i / 60);
      yield* this.appendTime(this.vars.i, ":");
      if (this.vars.y > this.vars.nextLapY) {
        this.stage.vars.lastLap = this.stage.vars.lapTime;
        this.vars.nextLapY += 400 * this.stage.vars.trackX.length;
        this.vars.lapTicks = 1;
        this.stage.watchers.lastLap.visible = true;
      }
    }
  }

  *appendTime(num, sep) {
    if (num < 10) {
      this.stage.vars.lapTime =
        "" + ("" + 0 + num) + ("" + sep + this.stage.vars.lapTime);
    } else {
      this.stage.vars.lapTime = "" + num + ("" + sep + this.stage.vars.lapTime);
    }
  }

  *setCostume(costume) {
    if (!(costume == this.costumeNumber)) {
      this.costume = costume;
    }
  }

  *init() {
    this.vars.roadLag = [];
    for (let i = 0; i < 10; i++) {
      this.vars.roadLag.push(0);
      yield;
    }
    this.stage.vars.lastLap = "";
    this.stage.vars.lapTime = "00:00.00";
    this.vars.lapTicks = "";
    this.stage.vars.carSlide = 0;
    this.stage.watchers.lastLap.visible = false;
  }
}
