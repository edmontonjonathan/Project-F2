import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Game from "./Game/Game.js";
import Sprite2 from "./Sprite2/Sprite2.js";
import Fog from "./Fog/Fog.js";
import Sky from "./Sky/Sky.js";
import OtherCars from "./OtherCars/OtherCars.js";
import CarSound from "./CarSound/CarSound.js";
import Map from "./Map/Map.js";
import MapTrace from "./MapTrace/MapTrace.js";
import SpriteFxDust0013 from "./SpriteFxDust0013/SpriteFxDust0013.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Game: new Game({
    x: 0,
    y: -120,
    direction: 90,
    costumeNumber: 3,
    size: 200,
    visible: true,
    layerOrder: 7
  }),
  Sprite2: new Sprite2({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 2
  }),
  Fog: new Fog({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 4,
    size: 100,
    visible: true,
    layerOrder: 5
  }),
  Sky: new Sky({
    x: 224.66829668434912,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 1
  }),
  OtherCars: new OtherCars({
    x: -35.44380611683786,
    y: 58,
    direction: 90,
    costumeNumber: 1,
    size: 27,
    visible: false,
    layerOrder: 3
  }),
  CarSound: new CarSound({
    x: 0,
    y: -28,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 4
  }),
  Map: new Map({
    x: 150,
    y: 125,
    direction: 90,
    costumeNumber: 1,
    size: 35,
    visible: true,
    layerOrder: 6
  }),
  MapTrace: new MapTrace({
    x: 219.01425839336937,
    y: 160.529158374276,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: true,
    layerOrder: 8
  }),
  SpriteFxDust0013: new SpriteFxDust0013({
    x: -9.280095559940914,
    y: -136,
    direction: 90,
    costumeNumber: 3,
    size: 200,
    visible: true,
    layerOrder: 9
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
