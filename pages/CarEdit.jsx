import { carService } from "../services/car.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveCar } from "../store/actions/car.actions.js"

const { useState, useEffect } = React
const { Link, useNavigate, useParams } = ReactRouterDOM


export function CarEdit() {
    const navigate = useNavigate()
    const [carToEdit, setCarToEdit] = useState(carService.getEmptyCar(''))
    const [isLoadingCar, setIsLoadingCar] = useState(false)
    const { carId } = useParams()

    useEffect(() => {
        if (carId) loadCar()
    }, [])


    function loadCar() {
        setIsLoadingCar(true)
        carService.getById(carId)
            .then(car => setCarToEdit(car))
            .catch(err => {
                console.log('Had issues in car edit', err)
                navigate('/car')
            })
            .finally(() => setIsLoadingCar(false))
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setCarToEdit((prevCar) => ({ ...prevCar, [field]: value }))
    }

    function onSaveCar(ev) {
        ev.preventDefault()
        if (!carToEdit.price) carToEdit.price = 1000
        saveCar(carToEdit)
            .then((savedCar) => {
                showSuccessMsg(`Car saved (id: ${savedCar._id})`)
                navigate('/car')
            })
            .catch(() => {
                showErrorMsg('Cannot save car')
            })
    }


    const loadingClass = isLoadingCar ? 'loading-car' : ''
    const { vendor, price } = carToEdit
    return (
        <section className={`car-edit ${loadingClass}`}>
            <h2>{carId ? 'Edit' : 'Add'} Car</h2>
            <form onSubmit={onSaveCar} >
                <label htmlFor="vendor">Vendor : </label>
                <input type="text"
                    name="vendor"
                    id="vendor"
                    placeholder="Enter vendor..."
                    value={vendor}
                    onChange={handleChange}
                />

                <label htmlFor="price">Price : </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={price}
                    onChange={handleChange}
                />

                <div>
                    <button>{carId ? 'Save' : 'Add'}</button>
                    <Link to="/car">Cancel</Link>
                </div>
            </form>
        </section>
    )
}