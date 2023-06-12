// const Router = require('koa-router')
const WS = require('ws')
// const router = new Router();
// const wsServer = WS.Server({ server });
const chat = [];
function wss(x) {

   x.on('connection', (ws) => {

      const errCallback = (e) => { console.log(e); };

      ws.on('message', (e) => {
         const index = chat.findIndex(item => e === item);
         if (index === -1) {
            chat.push(e);
            console.log(chat);

            Array.from(x.clients)
               .filter(client => client.readyState === WS.OPEN)
               .forEach(client => {
                  console.log( Array.from(x.clients).length);
                  client.send(JSON.stringify({ message: e }));
               });
            ws.send(JSON.stringify({ chat }), errCallback);
         } else {
            console.log(`Имя ${e} занято, выберите другое`);
            ws.send(JSON.stringify(`Имя ${e} занято, выберите другое`), errCallback);
         }

         //-----------------
         // chat.push(e);
         // chat.forEach((el) => {
         //    if (e === el) {
         //       console.log(el, e)
         //    } else
         //       console.log(el)
         // })
         //---------------


      });
      ws.on('close', () => {
         chat.length = 0;
         console.log('close')
         ws.send(JSON.stringify(`close`), errCallback);

      })


   });
}

module.exports = wss;