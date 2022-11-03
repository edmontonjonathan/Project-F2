/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class CarSound extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./CarSound/costumes/costume1.png", {
        x: 0,
        y: 0
      })
    ];

    this.sounds = [
      new Sound("acc1", "./CarSound/sounds/acc1.wav"),
      new Sound("acc2", "./CarSound/sounds/acc2.wav"),
      new Sound("acc3", "./CarSound/sounds/acc3.wav"),
      new Sound("acc4", "./CarSound/sounds/acc4.wav"),
      new Sound("acc5", "./CarSound/sounds/acc5.wav"),
      new Sound("acc6", "./CarSound/sounds/acc6.wav"),
      new Sound("acc7", "./CarSound/sounds/acc7.wav"),
      new Sound("acc8", "./CarSound/sounds/acc8.wav"),
      new Sound("acc9", "./CarSound/sounds/acc9.wav"),
      new Sound("acc10", "./CarSound/sounds/acc10.wav"),
      new Sound("acc11", "./CarSound/sounds/acc11.wav"),
      new Sound("dec1", "./CarSound/sounds/dec1.wav"),
      new Sound("dec2", "./CarSound/sounds/dec2.wav"),
      new Sound("dec3", "./CarSound/sounds/dec3.wav"),
      new Sound("dec4", "./CarSound/sounds/dec4.wav"),
      new Sound("dec5", "./CarSound/sounds/dec5.wav"),
      new Sound("dec6", "./CarSound/sounds/dec6.wav"),
      new Sound("dec7", "./CarSound/sounds/dec7.wav"),
      new Sound("dec8", "./CarSound/sounds/dec8.wav"),
      new Sound("dec9", "./CarSound/sounds/dec9.wav"),
      new Sound("dec10", "./CarSound/sounds/dec10.wav"),
      new Sound("dec11", "./CarSound/sounds/dec11.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick),
      new Trigger(
        Trigger.BROADCAST,
        { name: "create clones" },
        this.whenIReceiveCreateClones
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.id2 = 1;
  }

  *whenIReceiveTick() {
    if (
      this.stage.vars.soundId == this.vars.id2 &&
      this.stage.vars.tick > this.stage.vars.soundTick
    ) {
      if (this.stage.vars.speed / 1.8 > this.stage.vars.sound) {
        this.stage.vars.sound += 1;
        if (this.stage.vars.sound > 11) {
          this.stage.vars.sound = 5;
        }
        yield* this.startSound(this.stage.vars.sound);
        this.stage.vars.soundTick += 30;
        this.stage.vars.soundId = 1 - this.stage.vars.soundId;
      } else {
        if (this.stage.vars.speed > 0) {
          this.stage.vars.sound = Math.ceil(this.stage.vars.speed / 2);
          yield* this.startSound(this.stage.vars.sound + 11);
          this.stage.vars.sound += -1;
          this.stage.vars.soundTick += 30;
          this.stage.vars.soundId = 1 - this.stage.vars.soundId;
        }
      }
    }
  }

  *whenIReceiveCreateClones() {
    this.audioEffects.volume = 50;
    this.vars.id2 = 0;
    this.createClone();
    this.vars.id2 = 1;
  }

  *whenGreenFlagClicked() {
    this.stage.vars.soundTick = 0;
    this.stage.vars.soundId = 0;
    this.stage.vars.sound = 0;
    this.stage.vars.isaccellerating = 1;
  }
}
