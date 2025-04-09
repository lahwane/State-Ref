import { carService } from "../../services/car.service.js";
import { ADD_CAR, REMOVE_CAR, SET_CARS, store, UPDATE_CAR } from "../store.js"

export function loadCars(filterBy) {
    return carService.query(filterBy)
        .then(cars => {
            store.dispatch({ type: SET_CARS, cars })
        })
        .catch(err => {
            console.log('car action -> Cannot load cars', err)
            throw err
        })
}

export function removeCar(carId) {
    return carService.remove(carId)
        .then(() => {
            store.dispatch({ type: REMOVE_CAR, carId })
        })
        .catch(err => {
            console.log('car action -> Cannot remove car', err)
            throw err
        })
}

export function saveCar(car) {
    const type = car._id ? UPDATE_CAR : ADD_CAR
    return carService.save(car)
        .then((savedCar) => {
            store.dispatch({ type, car: savedCar })
            return savedCar
        })
        .catch(err => {
            console.log('car action -> Cannot save car', err)
            throw err
        })
}