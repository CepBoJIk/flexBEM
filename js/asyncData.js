const template = document.querySelector('.news-item-template').content;
const wrapper = document.querySelector('.news');

const sendRequest = function sendRequest(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send();

    xhr.onload = function() {
      if (xhr.status != 200) {
        const error = new Error(`${xhr.status}: ${xhr.statusText}`);
        reject(error);
      }
      resolve(xhr);
    }

    xhr.onerror = function() {
      reject(new Error('network error'))
    }
  })
}

class NewsContent {
  constructor(template, wrapper) {
    this.textContentList = null;
    this.template = template;
    this.wrapper = wrapper;
  }

  async getData(textUrl) {
    try {
      const resultXhr = await sendRequest('GET', textUrl)

      this.textContentList = JSON.parse(resultXhr.responseText);
      this.insertData(this.template, this.wrapper);
    } catch(error) {
      throw new Error(error);
    }
  }

  insertData(template, wrapper) {
    this.textContentList.forEach((text) => {
      const elem = template.cloneNode(true);
      const imgElem = elem.querySelector('.news-item__img img');
      const textElem = elem.querySelector('.news-item__text p');
      const headerElem = elem.querySelector('.news-item__header');

      textElem.textContent = text;
      this.insertImage(imgElem);
      this.insertHeader(headerElem, text);

      wrapper.appendChild(elem);
    })
  }

  async insertImage(elem) {
    try {
      const resultXhr = await sendRequest('GET', 'https://picsum.photos/200/200/?random')

      const url = resultXhr.responseURL;
      elem.setAttribute('src', url);
    } catch(error) {
      throw new Error(error);
    }
  }

  insertHeader(elem, text) {
    const header = text.split(' ')[0]; 
    elem.textContent = header;
  }
}

const newsContent = new NewsContent(template, wrapper);

newsContent.getData('https://baconipsum.com/api/?type=meat-and-filler&paras=6');
