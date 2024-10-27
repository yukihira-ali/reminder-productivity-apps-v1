import { useContext, useEffect } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileMidBody from "../components/ProfileMidBody";
import ChatBotModal from "../components/ChatBotModal";
import DateTime from "../components/DateTime";

export default function ProfilePage() {


    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);



    return <>
        <Navbar expand="lg" style={{ padding: "10px 20px", borderBottom: "2px solid #ddd", backgroundImage: "linear-gradient(to right, #fcbc77, #f5dbbf" }}>
            <Container>
                <Navbar.Brand href="/profile" style={{ display: "flex", alignItems: "center" }}>
                    <i
                        className="bi bi-pencil"
                        style={{
                            fontStyle: "Arial",
                            fontSize: 40,
                            color: "black",
                            fontWeight: "bold",
                            marginRight: 10,
                            transition: "color 0.3s ease"
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "blue")}
                        onMouseLeave={(e) => (e.target.style.color = "black")}
                    >
                    </i>
                    Friendly Reminder
                </Navbar.Brand>
                <DateTime />
            </Container>
        </Navbar>

        <Container style={{ marginTop: "20px" }}>
            <Row>
                <Col xs={12} md={4} lg={3} style={{ padding: "10px" }}>
                    <ProfileSideBar />
                </Col>
                <Col xs={12} md={4} lg={6} style={{ padding: "10px" }}>
                    <ProfileMidBody />
                </Col>
                <Col xs={12} md={4} lg={3} style={{ padding: "10px" }}>
                    <ChatBotModal />
                </Col>
            </Row>
        </Container>
    </>

}
