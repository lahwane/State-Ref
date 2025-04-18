const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { checkout } from '../store/actions/user.actions.js'
import { REMOVE_CAR_FROM_CART } from '../store/store.js'

export function ShoppingCart({ isCartShown }) {

    // DONE: get from storeState
    // const shoppingCart = []
    const shoppingCart = useSelector(storeState => storeState.shoppingCart)
    const dispatch = useDispatch()

    // DONE: get from storeState
    const user = useSelector(storeState => storeState.loggedInUser)

    function removeFromCart(carId) {
        console.log(`Todo: remove: ${carId} from cart`)
        // DONE: use dispatch
        dispatch({ type: REMOVE_CAR_FROM_CART, carId })

    }

    function getCartTotal() {
        return shoppingCart.reduce((acc, car) => acc + car.price, 0)
    }

    function onCheckout() {
        const amount = getCartTotal()
        // TODO: checkout function that dispatch
        checkout(amount)
            .then(() => {
                showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
            })
            .catch(() => {
                showErrorMsg('There was a problem checking out!')
            })
    }

    if (!isCartShown) return <span></span>

    const total = getCartTotal()
    return (
        <section className="cart" >
            <h5>Your Cart</h5>
            <ul>
                {
                    shoppingCart.map((car, idx) =>
                        <li key={idx}>
                            <button onClick={() => removeFromCart(car._id)}>
                                x
                            </button>
                            {car.vendor} | ${car.price}
                        </li>
                    )
                }
            </ul>
            <p>Total: ${total} </p>
            <button disabled={!user || !total} onClick={onCheckout}>Checkout</button>
        </section>
    )
}
