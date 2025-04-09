import { userService } from "../services/user.service.js"

const { createStore, compose } = Redux

//* Count
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'

//* Cars
export const SET_CARS = 'SET_CARS'
export const REMOVE_CAR = 'REMOVE_CAR'
export const ADD_CAR = 'ADD_CAR'
export const UPDATE_CAR = 'UPDATE_CAR'

//* User
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

//* Shopping cart
export const TOGGLE_CART_IS_SHOWN = 'TOGGLE_CART_IS_SHOWN'
export const ADD_CAR_TO_CART = 'ADD_CAR_TO_CART'
export const REMOVE_CAR_FROM_CART = 'REMOVE_CAR_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'


const initialState = {
    count: 100,
    cars: [],
    loggedInUser: userService.getLoggedinUser(),
    isCartShown: false,
    shoppingCart: []
}

function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {

        //* Count
        case INCREMENT:
            return { ...state, count: state.count + 1 }
        case DECREMENT:
            return { ...state, count: state.count - 1 }
        case CHANGE_BY:
            return { ...state, count: state.count + cmd.diff }

        //* Cars
        case SET_CARS:
            return {
                ...state,
                cars: cmd.cars
            }
        case REMOVE_CAR:
            return {
                ...state,
                cars: state.cars.filter(car => car._id !== cmd.carId)
            }
        case ADD_CAR:
            return {
                ...state,
                cars: [...state.cars, cmd.car]
            }
        case UPDATE_CAR:
            return {
                ...state,
                cars: state.cars.map(car => car._id === cmd.car._id ? cmd.car : car)
            }

        //* User
        case SET_USER:
            return {
                ...state,
                loggedInUser: cmd.user
            }
        case SET_USER_SCORE:
            const loggedInUser = { ...state.loggedInUser, score: cmd.score }
            return { ...state, loggedInUser }


        //* Shopping cart
        case TOGGLE_CART_IS_SHOWN:
            return { ...state, isCartShown: !state.isCartShown }

        case ADD_CAR_TO_CART:
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, cmd.car]
            }

        case REMOVE_CAR_FROM_CART:
            const shoppingCart = state.shoppingCart.filter(car => car._id !== cmd.carId)
            return { ...state, shoppingCart }

        case CLEAR_CART:
            return { ...state, shoppingCart: [] }

        default:
            return state
    }
}



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(appReducer, composeEnhancers())

// * For Debugging
window.gStore = store

// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })

