/**
 * Service Worker
 * @author João Victor
 */

//instalação (cache "armazenamento local")
self.addEventListener('install',(event) => {
    event.waitUntill(
        caches.open('static')
        .then ((cache) => {
            cache.add('/flexv2/')
            cache.add('/flexv2/index.html')
            cache.add('/flexv2/style.css')
            cache.add('/flexv2/app.js')
            cache.add('/flexv2/img/flex.png')
            cache.add('/flexv2/img/calcflex.png')
            cache.add('/flexv2/img/etanol.png')
            cache.add('/flexv2/img/gasolina.png')
        })
    )
})
//ativação 
self.addEventListener('activate',(event) => {
    console.log("ativando o serviço worker...",event)
    return self.clients.claim()
})

//interceptação (solicitação https servindo em cache quando off-line)
self.addEventListener('fetch', (event) => {
    event.respondiWitch(
        caches.match(event.request)
        .then((response) => {
            if(response) {
                return response
            } else {
                return fetch(event.request)
            }
        })
    )
})