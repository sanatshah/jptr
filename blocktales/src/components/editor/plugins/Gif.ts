import ReactDOM from 'react-dom/client';
import { GiphyFetch } from "@giphy/js-fetch-api";
import { throttle } from 'throttle-debounce'
import { renderGrid } from '@giphy/js-components'
import { wrap } from 'module';

export class Gif {
  private gf;
  private elId;
  private wrapperId;

  constructor(){
    this.gf = new GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')

  }
  static get toolbox() {
    return {
      title: 'Gif',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    };
  }

  private fetchGifs = (offset: number) => {
    // use whatever end point you want,
    // but be sure to pass offset to paginate correctly
    return this.gf.trending({ offset, limit: 25 })
  }

  // Creating a grid with window resizing and remove-ability
  private makeGrid = (targetEl: HTMLElement) => {
      const render = () => {
          // here is the @giphy/js-components import
          const wrapper = document.getElementById(this.wrapperId)
          let width = 400

          if (wrapper) {
            width = wrapper?.getBoundingClientRect().left - wrapper?.getBoundingClientRect().right
          }

          return renderGrid(
              {
                  fetchGifs: this.fetchGifs,
                  width,
                  columns: window.innerWidth < 500 ? 2 : 3,
                  gutter: 6,
              },
              targetEl
          )
      }
      const resizeRender = throttle(500, render)
      window.addEventListener('resize', resizeRender, false)
      const remove = render()
      return {
          remove: () => {
              remove()
              window.removeEventListener('resize', resizeRender, false)
          },
      }
  }

  render(){
    const wrapper = document.createElement('div');
    wrapper.id = "gif"
    wrapper.style.height = "300px"
    wrapper.style.overflowY = "scroll"
    wrapper.style.overflowY = "scroll"
    this.wrapperId =wrapper.id

    const input = document.createElement('input');
    input.style.width = "100%"
    input.style.height = "40px"
    input.style.padding = "8px"
    input.style.paddingLeft = "48px"
    input.style.borderRadius = "10px"
    input.style.backgroundColor = "rgb(255 255 255 / 24%)"
    input.style.color = "wheat"
    input.style.marginBottom = "16px"
    input.style.border = "0px"
    wrapper.appendChild(input)

    const element = document.createElement('div');
    element.id = "giphy"

    wrapper.appendChild(element)
    this.elId = element.id

    return wrapper;
  }

  rendered(){
    const el = document.getElementById(this.elId)
    
    if (!el) {
      return
    }

    this.makeGrid(el)
  }

  save(blockContent){
    return {
      url: blockContent.value
    }
  }
}