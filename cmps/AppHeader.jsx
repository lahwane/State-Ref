import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { TOGGLE_CART_IS_SHOWN } from '../store/store.js'

const { Link, NavLink } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux
const { useNavigate } = ReactRouter

export function AppHeader() {

    const navigate = useNavigate()
    const cartLength = useSelector(storeState => storeState.shoppingCart.length)

    // TODO: move to storeState
    // const [user, setUser] = useState(userService.getLoggedinUser())
    const user = useSelector(storeState => storeState.loggedInUser)
    const dispatch = useDispatch()

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }



    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_IS_SHOWN })

    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Car App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/car" >Cars</NavLink>
                    <a className='shopping-cart-link' onClick={onToggleCart} href="#">
                        🛒 Cart
                        {!!cartLength && <span className='shopping-cart-count'>{cartLength}</span>}
                    </a>
                </nav>
            </section>
            {user ? (
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname} <span>${user.score.toLocaleString()}</span></span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
        </header>
    )
}
