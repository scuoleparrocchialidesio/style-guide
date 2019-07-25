class Gallery {
  constructor({ container, lightbox }) {
    this.lightbox = lightbox
    this.container = container
    this.container.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 27: // ESC
        case 81: // 'q'
          this.lightbox.off()
          break;
        case 37: // left arrow
          this.goPrevious()
          break;
        case 39: // right arrow
          this.goNext()
          break;
        default:
          // Do nothing.
      }
    })
    this.container.addEventListener('click', event => {
      event.preventDefault()
      if (event.target.dataset.galleryImage !== 'true') {
        return false
      }
      console.debug('Opening image')
      const src = event.target.dataset.fullUrl
      const description = event.target.dataset.description
      const { index, previous, next } = event.target.dataset
      this.index = index
      this.previous = previous
      this.next = next
      // TODO:
      // - [ ] add close _button
      // - [ ] add previous-next buttons
      lightbox.setImage({ src })
      lightbox.setDescription({ description })
      this.lightbox.on()
    })
  }

  goNext() {
    if (this.next) {
      console.log(`Next image is ${this.next}`)
    }
  }

  goPrevious() {
    if (this.previous) {
      console.log(`Previous image is ${this.previous}`)
    }
  }
}

class Lightbox {
  constructor({ selector }) {
    // TODO: handle errors
    this.element = document.querySelector(selector);
    this.image = this.element.querySelector('[data-gallery-image]')
    this.description = this.element.querySelector('[data-gallery-description]')
    this.element.addEventListener('click', event => {
      if (event.target.dataset.galleryLightbox !== undefined) {
        this.off()
      }
    })
  }

  on() {
    this.element.classList.remove('hide')
  }

  off() {
    this.element.classList.add('hide')
  }

  setImage({ src }) {
    this.image.src = src
  }

  setDescription({ description }) {
    this.description.innerHTML = description
  }
}

function setupGalleries() {
  const lightbox = new Lightbox({ selector: '.gallery-lightbox' });
  document.querySelectorAll('[data-gallery]').forEach(element => {
    new Gallery({ lightbox, container: element })
  });
}

window.addEventListener('DOMContentLoaded', event => {
  console.debug('DOM fully loaded and parsed');
  setupGalleries();
});
