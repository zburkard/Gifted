import { appState } from "../AppState.js"
import { Gift } from "../Models/Gift.js"
import { GiftApi } from "./AxiosService.js"

class GiftsService {

  async getGifts() {
    const res = await GiftApi.get()
    console.log(res.data)
    // NOTE This didnt work, you cant forEach over a single Gift in the appState
    // appState.gifts = new Gift(res.data)
    appState.gifts = res.data.map(g => new Gift(g))
  }

  async openGifts(id) {
    let selectedGift = appState.gifts.find(g => g.id == id)
    selectedGift.opened = !selectedGift.opened
    const res = await GiftApi.put(id, selectedGift)
    let index = appState.gifts.findIndex(g => g.id == id)
    appState.gifts.splice(index, 1, new Gift(res.data))
    console.log(res.data);
    appState.emit('gifts')
    // appState.gifts = appState.gifts
  }

  async createGift(giftData) {
    const res = await GiftApi.post('https://bcw-sandbox.herokuapp.com/api/gifts', giftData)
    console.log('[POST GIFT]', res.data)
    appState.gifts = [new Gift(res.data), ...appState.gifts]
  }
}

export const giftsService = new GiftsService()