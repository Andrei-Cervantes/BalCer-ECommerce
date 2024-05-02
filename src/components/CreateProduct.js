import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export default function CreateProduct({ fetchData }) {

    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ price, setPrice ] = useState(0);

    const [ showCreate, setShowCreate ] = useState(false);

    const closeCreate =() => {
        setShowCreate(false);
    }

    function createProduct(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.error === "Duplicate Product Found"){  
                Swal.fire({
                    title: "Product already exists.",
                    icon: "error",                    
                    text: data.message
                })
            } else if (data.error === "Failed to create product") {
                Swal.fire({
                    title: "Unsuccessful Product Creation",
                    icon: "error",
                    text: data.message
                })
            } else {
                Swal.fire({
                    title: "Product Added",
                    icon:"success"                  
                })

                closeCreate();
            }
        })
        fetchData();
        setName("")
        setDescription("")
        setPrice(0);
    }
    return (
        <>
            <Button variant="primary" onClick={() => setShowCreate(true)}>Add New Product</Button>

            <Modal show={showCreate} onHide={closeCreate}>
				<Form onSubmit={e => createProduct(e)}>
					<Modal.Header closeButton>
			        	<Modal.Title>Add Product</Modal.Title>
			        </Modal.Header>
			        <Modal.Body>
			        	<Form.Group className="mb-3" controlId="productName">
			        	        <Form.Label>Name</Form.Label>
			        	        <Form.Control 
			        	        	type="text" 
			        	        	required
			        	        	value={name}
			        	        	onChange={e => setName(e.target.value)}
			        	        />
		        	    </Form.Group>
	    	        	<Form.Group className="mb-3" controlId="productDescription">
	    	        	        <Form.Label>Description</Form.Label>
	    	        	        <Form.Control 
	    	        	        	as="textarea"
	    	        	        	rows={5}
	    	        	        	required
	    	        	        	value={description}
	    	        	        	onChange={e => setDescription(e.target.value)}
	    	        	        />
	            	    </Form.Group>
	    	        	<Form.Group className="mb-3" controlId="productPrice">
	    	        	        <Form.Label>Price</Form.Label>
	    	        	        <Form.Control 
	    	        	        	type="number" 
	    	        	        	required
	    	        	        	value={price}
	    	        	        	onChange={e => setPrice(e.target.value)}
	    	        	        />
	            	    </Form.Group>
			        </Modal.Body>
			        <Modal.Footer>
	                  	<Button variant="secondary" onClick={closeCreate}>Close</Button>
	                  	<Button variant="primary" type="submit">Submit</Button>
	                </Modal.Footer>
				</Form>
			</Modal>
        </>
    )
}