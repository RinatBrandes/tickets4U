

import { httpService } from './http.service.js'
// import { utilService } from './util.service.js'

// import { getActionRemoveCar, getActionAddCar, getActionUpdateCar } from '../store/car.actions.js'



export const ticketService = {
    query,
    // getById,
    // save,
    // remove,
    // getEmptyCar,
    // subscribe,
    // unsubscribe
    
}



async function query() {
    return await httpService.get('ticket')
}
// function getById(carId) {
//     return storageService.get(STORAGE_KEY, carId)
//     // return axios.get(`/api/car/${carId}`)
// }
// async function remove(carId) {
   
//     await storageService.remove(STORAGE_KEY, carId)
//     carChannel.postMessage(getActionRemoveCar(carId))
// }
// async function save(car) {
//     var savedCar
//     if (car._id) {
//         savedCar = await storageService.put(STORAGE_KEY, car)
//         carChannel.postMessage(getActionUpdateCar(savedCar))
        
//     } else {
//         // Later, owner is set by the backend
//         car.owner = userService.getLoggedinUser()
//         savedCar = await storageService.post(STORAGE_KEY, car)
//         carChannel.postMessage(getActionAddCar(savedCar))
//     }
//     return savedCar
// }

// function getEmptyCar() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }

// function subscribe(listener) {
//     carChannel.addEventListener('message', listener)
// }
// function unsubscribe(listener) {
//     carChannel.removeEventListener('message', listener)
// }


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




