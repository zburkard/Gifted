import { appState } from "../AppState.js"
import { giftsService } from "../Services/GiftsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"



function _drawGifts() {
  let gifts = appState.gifts
  let template = ''
  gifts.forEach(g => template += g.GiftsTemplate)
  setHTML('gifts', template)
}
export class GiftsController {
  constructor() {
    console.log('controller working')
    appState.on('gifts', _drawGifts)
    this.getGifts()
  }

  async getGifts() {
    try {
      await giftsService.getGifts()
    } catch (error) {
      console.error('[Get Gifts]', error)
      Pop.error(error.message)
    }
  }

  async openGifts(id) {
    try {
      await giftsService.openGifts(id)
      console.log("gift opened");
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  async createGift() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let giftData = getFormData(form)
      Pop.toast('created gift')
      form.reset()
      await giftsService.createGift(giftData)
    } catch (error) {
      Pop.error(error.message)
    }
  }

}