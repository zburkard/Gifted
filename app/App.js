import { GiftsController } from "./Controllers/GiftsController.js";


class App {

  giftsController = new GiftsController()

}

window["app"] = new App();
