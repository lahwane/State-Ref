const { Link } = ReactRouterDOM

export function CarPreview({ car }) {

    return (
        <article>
            <h4>{car.vendor}</h4>
            <h1>⛐</h1>
            <p>Price: <span>${car.price.toLocaleString()}</span></p>
            {car.owner && <p>Owner: {car.owner.fullname}</p>}
            <hr />
            <Link to={`/car/edit/${car._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/car/${car._id}`}>Details</Link>
        </article>
    )
}
