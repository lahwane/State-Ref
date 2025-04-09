const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { UserMsg } from './UserMsg.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { TOGGLE_CART_IS_SHOWN } from '../store/store.js'

export function AppFooter() {

    // const [isCartShown, setIsCartShown] = useState(false)
    const isCartShown = useSelector(storeState => storeState.isCartShown)
    const count = useSelector(storeState => storeState.count)
    const carsLength = useSelector(storeState => storeState.cars.length)
    const shoppingCartLength = useSelector(storeState => storeState.shoppingCart.length)
    const dispatch = useDispatch()

    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_IS_SHOWN })
    }

    // TODO: move to storeState
    // const carsCount = 0
    // const cart = []


    return (
        <footer className='app-footer'>
            <h5>
                Currently {carsLength} cars in the shop
            </h5>
            <p>
                Coffeerights to all - Count: {count}
            </p>
            <h5>
                <span>{shoppingCartLength}</span> Products in your Cart
                <a href="#" onClick={onToggleCart}>
                    ({(isCartShown) ? 'hide' : 'show'})
                </a>
            </h5>
            <ShoppingCart isCartShown={isCartShown} />
        </footer>
    )
}
