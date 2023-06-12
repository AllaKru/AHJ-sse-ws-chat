/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-console */
import api from './api/api';

export default class Chat {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    this.element = element;

    this.add = this.add.bind(this);
    // this.addChat = this.addChat.bind(this);
    this.subScribe = this.subScribe.bind(this);
    // this.closeSocket = this.closeSocket.bind(this);
    // ---------!
    this.wss = this.wss.bind(this);
    // --------------!
    // this.message = this.message.bind(this);
    // this.chat = this.chat.bind(this);

    // this.sse = new EventSource('https://sse-ws-game.onrender.com/sse');
    // this.sse.addEventListener('message', this.onSubscribeData);
    this.ws = new WebSocket('ws://localhost:7070/ws');
    this.ws.addEventListener('open', () => console.log('open'));
    // this.ws.addEventListener('message', this.wss);
    // this.ws.addEventListener('close', this.closeSocket);
  }

  add() {
    const div = document.createElement('div');
    div.className = 'window';
    this.element.append(div);
    // api.api('/index');
    // api.api('/ping');
    this.subScribe(div);
    api.api('/ping');
    this.closeSocket();
    // this.ws = new WebSocket('ws://localhost:7070/ws');
  }

  subScribe(el, e) {
    const form = document.createElement('form');
    form.className = 'subscribe input';
    form.innerHTML = `<form> 
    Выберите псевдоним <input class="input subscribe__name" type="text" name="name" >
    <button class="btn subscribe__send submit">Продолжить</button>
    </form>`;

    el.append(form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const chatMessage = this.element.querySelector('.subscribe__name');
      const chatContent = this.element.querySelector('.chat__content');
      const message = chatMessage.value;

      // console.log(message);
      chatMessage.value = '';
      // this.ws.addEventListener('message', this.wss);
      // if () {
      //   this.chat();
      // }
      // console.log(e.target.querySelector('.subscribe__name').value)
      console.log(e.target);
      // if (e.target) {
      //   this.ws.addEventListener('message', this.wss);
      //   this.ws.send(message);
      // }
      this.ws.addEventListener('message', this.wss);
      console.log(message);
      this.addChat();
    });
  }

  wss(e) {
    // const ws = new WebSocket('ws://localhost:7070/ws');
    // this.ws.send(e.target.querySelector('.subscribe__name').value);
    const { data } = e;

    const message = JSON.parse(data);

    if (typeof message === 'string') {
      const span = document.createElement('span');
      span.className = 'span';
      span.textContent = message;
      this.element.querySelector('.subscribe').insertBefore(span,
        this.element.querySelector('.btn'));
      setInterval(() => {
        span.remove();
      }, 2000);
      console.log(message);
    } else if (message.message) {
      if (this.element.querySelector('.input22') === null) {
        // проверить

        // const div = document.createElement('div');
        const pre = document.createElement('pre');
        pre.className = 'subscribe input22';
        this.element.querySelector('.window').append(pre);
        this.element.querySelector('.input').remove();
        console.log(e);
      }
      this.element.querySelector('.input22').textContent += `\n${message.message}`;
      // if (message.message) {
      //   this.element.querySelector('.input22').textContent += `\n${message.message}`;
      // }
    } else if (message.chat) {
      this.element.querySelector('.input22').textContent = message.chat.join('\n');
    }

    // if (message.chat) {
    //   chatContent.textContent = message.chat.join('\n');
    // }

    // if (message.message) {
    //   chatContent.textContent += `\n${message.message}`;
    // }
    // console.log('message');
    // this.ws.send(message)
    // console.log('Привет ВС!');
  }

  addChat() {
    const div = document.createElement('div');
    div.className = 'chat';
    div.innerHTML = `<form>
    <input class="input subscribe__name1" type="text" name="name" value ="Напиши что-нибудь">
        
    </form>`;

    this.element.querySelector('.window').append(div);
    div.addEventListener('click', ()=>{
      div.querySelector('.subscribe__name1').value = '';
    })
  }

  closeSocket() {
    this.element.querySelector('.window').addEventListener('click', () => {
      // проверить без вс.он на сервере
      this.ws.addEventListener('close', () => console.log('close123'));
      console.log('close');
    });
  }

  // chat(x) {
  //   this.element.querySelector('.input22').textContent = x.chat.join('\n');
  // }

  // message(x) {
  //   const div = document.createElement('div');
  //   div.className = 'subscribe input22';
  //   div.textContent += `\n${x.message}`;
  //   this.element.querySelector('.window').append(div);
  // }
}
