import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
    return (
        <Row>
            <Col
                className="d-flex flex-column justify-content-center"
                lg={6}
                xs={12}
            >
                <div className="hero-title">Keep your budget safe</div>
                <div className="hero-text">
                    Copper mug try-hard pitchfork pour-over freegan heirloom
                    neutra air plant cold-pressed tacos poke beard tote bag.
                    Heirloom echo park mlkshk tote bag selvage hot chicken
                    authentic tumeric truffaut hexagon try-hard chambray.
                </div>
                <div className="mb-4 d-flex justify-content-center justify-content-lg-start w-100">
                    <Link to="/operations">
                        <Button variant="primary" className="mr-3" size="lg">
                            Get started
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="outline-primary" size="lg">
                            Login
                        </Button>
                    </Link>
                </div>
            </Col>
            <Col lg={6} xs={12}>
                <img
                    src="https://i.postimg.cc/5NSS9HrH/Wm-ADCCi-Imgur.png"
                    alt="..."
                    className="w-100"
                />
            </Col>
        </Row>
    );
}

export default Home;
