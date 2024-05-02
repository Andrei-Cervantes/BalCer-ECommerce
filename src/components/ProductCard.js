import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard({ productProp }) {

    const { _id, name, description, price } = productProp;

    return (
        <Card id="courseComponent1" className="my-3">
            <Card.Body>
                <Card.Title className="text-center pb-3" style={{minHeight: '75px'}}>{name}</Card.Title>
                <Card.Subtitle className="pb-1">Description:</Card.Subtitle>
                <Card.Text style={{height: '100px', overflowY: 'auto'}}>{description}</Card.Text>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Subtitle>Price:</Card.Subtitle>
                        <Card.Text>Php {price}</Card.Text>
                    </div>
                    <div>
                        <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}