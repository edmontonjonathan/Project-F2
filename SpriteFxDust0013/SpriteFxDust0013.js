/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class SpriteFxDust0013 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "Sprite_FX_Dust_2",
        "./SpriteFxDust0013/costumes/Sprite_FX_Dust_2.png",
        { x: 66, y: 35 }
      ),
      new Costume(
        "Sprite_FX_Dust_3",
        "./SpriteFxDust0013/costumes/Sprite_FX_Dust_3.png",
        { x: 62, y: 33 }
      ),
      new Costume(
        "Sprite_FX_Dust_4",
        "./SpriteFxDust0013/costumes/Sprite_FX_Dust_4.png",
        { x: 64, y: 35 }
      ),
      new Costume(
        "Sprite_FX_Dust_5",
        "./SpriteFxDust0013/costumes/Sprite_FX_Dust_5.png",
        { x: 64, y: 35 }
      ),
      new Costume(
        "Sprite_FX_Dust_6",
        "./SpriteFxDust0013/costumes/Sprite_FX_Dust_6.png",
        { x: 66, y: 33 }
      ),
      new Costume(
        "Sprite_FX_Dust_7",
        "./SpriteFxDust0013/costumes/Sprite_FX_Dust_7.png",
        { x: 69, y: 33 }
      )
    ];

    this.sounds = [new Sound("pop", "./SpriteFxDust0013/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick)
    ];

    this.vars.frame = 2.5;
    this.vars.mode = 2;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.size = 150;
    this.vars.frame = 0;
    this.vars.mode = 0;
  }

  *whenIReceiveTick() {
    if (
      (this.stage.vars.isaccellerating > 0 && this.stage.vars.speed < 5) ||
      (this.stage.vars.isaccellerating < 0 && this.stage.vars.speed > 6)
    ) {
      if (!(this.vars.mode == 1)) {
        this.moveAhead();
        this.vars.mode = 1;
        this.vars.frame = 0;
      } else {
        this.vars.frame += 0.25;
      }
      yield* this.setCostume((Math.floor(this.vars.frame) % 6) + 1, 150);
      this.goto(this.sprites["Game"].x, this.sprites["Game"].y - 16);
      this.visible = true;
    } else {
      if (this.stage.vars.carSlide > 5) {
        if (!(this.vars.mode == 2)) {
          this.moveAhead();
          this.vars.mode = 2;
          this.vars.frame = 0;
        } else {
          this.vars.frame += 0.25;
        }
        yield* this.setCostume((Math.floor(this.vars.frame) % 6) + 1, 200);
        this.goto(
          this.sprites["Game"].x - this.stage.vars.carSx * 2,
          this.sprites["Game"].y - 16
        );
        this.visible = true;
      } else {
        this.vars.mode = 0;
        this.visible = false;
      }
    }
  }

  *setCostume(costume2, size) {
    if (!(costume2 == this.costumeNumber)) {
      this.costume = costume2;
    }
    if (!(size == this.size)) {
      this.size = size;
    }
  }
}
