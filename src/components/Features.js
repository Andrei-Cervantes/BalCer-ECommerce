import { Row, Col, Card } from 'react-bootstrap';

export default function Features() {
    return (
        <Row className="mt-3 mb-5">
            
            <Col xs={12} md={6} lg={3}>
                <Card className="cardHighlight" style={{ margin: '10px', padding: '20px' }}>
                    <Card.Body style={{ height: '250px', overflowY: 'auto' }}>
                        <Card.Title>
                            <h2>Wide Selection of Products</h2>
                        </Card.Title>
                        <Card.Text>
                            Explore our extensive range of products, from electronics to fashion and everything in between.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

           
            <Col xs={12} md={6} lg={3}>
                <Card className="cardHighlight" style={{ margin: '10px', padding: '20px' }}>
                    <Card.Body style={{ height: '250px', overflowY: 'auto' }}>
                        <Card.Title>
                            <h2>Secure Online Shopping</h2>
                        </Card.Title>
                        <Card.Text>
                            Shop with confidence knowing that your transactions are securely processed and protected.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

            
            <Col xs={12} md={6} lg={3}>
                <Card className="cardHighlight" style={{ margin: '10px', padding: '20px' }}>
                    <Card.Body style={{ height: '250px', overflowY: 'auto' }}>
                        <Card.Title>
                            <h2>Fast and Reliable Delivery</h2>
                        </Card.Title>
                        <Card.Text>
                            Enjoy fast and reliable delivery services to get your purchases conveniently delivered to your doorstep.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

           
            <Col xs={12} md={6} lg={3}>
                <Card className="cardHighlight" style={{ margin: '10px', padding: '20px' }}>
                    <Card.Body style={{ height: '250px', overflowY: 'auto' }}>
                        <Card.Title>
                            <h2>Excellent Customer Service</h2>
                        </Card.Title>
                        <Card.Text>
                            Experience exceptional customer service to assist you with any inquiries or concerns you may have.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
