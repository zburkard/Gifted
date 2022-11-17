export class Gift {
  constructor(data) {
    this.id = data.id
    this.url = data.url ? data.url : 'https://m.media-amazon.com/images/I/6155nc7dzLL.jpg'
    this.opened = data.opened
  }



  get GiftsTemplate() {
    return `
    <div class="col-4 d-flex">
    <div class="col-6 d-flex card rounded selectable img-thumbnail">
    <img onclick="app.giftsController.openGifts('${this.id}')" src="${this.url}">
    <p>${this.opened}</p>
    </div>
    </div>
    `
  }
}