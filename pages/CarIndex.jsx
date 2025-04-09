const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link } = ReactRouterDOM

import { CarFilter } from '../cmps/CarFilter.jsx'
import { CarList } from '../cmps/CarList.jsx'
import { carService } from '../services/car.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadCars, removeCar, saveCar } from '../store/actions/car.actions.js'
import { ADD_CAR_TO_CART } from '../store/store.js'

export function CarIndex() {

    // TODO: move to storeState
    // const [cars, setCars] = useState(null)
    // const [cart, setCart] = useState([])

    const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())
    const cars = useSelector(storeState => storeState.cars)
    const dispatch = useDispatch()

    useEffect(() => {
        // DONE: use dispatch/action
        loadCars(filterBy)
            .catch(() => {
                showErrorMsg('Cannot load cars')
            })

    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onRemoveCar(carId) {
        // TODO: move to a function and use dispatch/action
        removeCar(carId)
            .catch(() => {
                showErrorMsg('Cannot remove car')
            })
    }

    function onAddRandomCar() {
        const carToSave = carService.getRandomCar()

        // TODO: move to a function and use dispatch/action
        saveCar(carToSave)
            .then((savedCar) => {
                showSuccessMsg(`Car added (id: ${savedCar._id})`)
            })
            .catch(() => {
                showErrorMsg('Cannot add car')
            })
    }

    function onEditCar(car) {
        const price = +prompt('New price?', car.price)
        const carToSave = { ...car, price }
        // DONE: move to a function and use dispatch/action
        saveCar(carToSave)
            .then((savedCar) => {
                showSuccessMsg(`Car updated to price: $${savedCar.price}`)
            })
            .catch(() => {
                showErrorMsg('Cannot update car')
            })
    }

    function addToCart(car) {
        console.log(`Adding ${car.vendor} to Cart`)
        // DONE: use dispatch/action
        dispatch({ type: ADD_CAR_TO_CART, car })
        showSuccessMsg(`Added ${car.vendor} to Cart`)
    }

    return (
        <div className='car-index'>
            <h3>Cars App</h3>
            <main>
                <section>
                    <button className='add-btn'><Link to={`/car/edit`}>Add Car</Link></button>
                    <button onClick={onAddRandomCar}>Add Random Car ⛐</button>
                </section>
                <CarFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {cars
                    ? <CarList
                        cars={cars}
                        onRemoveCar={onRemoveCar}
                        onEditCar={onEditCar}
                        addToCart={addToCart}
                    />
                    : <div>Loading..</div>
                }
                <hr />
                {/* <pre>{!!cart.length && JSON.stringify(cart, null, 2)}</pre> */}
            </main>
        </div>
    )

}