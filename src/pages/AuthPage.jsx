import '../style.css';
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthProvider";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthPage() {

    const loginImage = 'src/assets/planner.jpg';

    // Possible modals: null (no modal shows), SignUp, Login
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) navigate("/profile");
    }, [currentUser, navigate]);



    const handleSignUp = async (e) => {
        e.preventDefault();

        setError("");  // Reset error state
        setSuccess(false);  // Reset success state

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Get ID token
            const idToken = await user.getIdToken(true);

            // Send the token to Replit backend
            const response = await fetch("https://be-reminder-productivity-app-v1.vercel.app/verify-token", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${idToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                setSuccess(true);
                setEmail("");
                setPassword("");
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in user:', res.user);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleClose = () => setModalShow(null);

    return (
        <Row>
            <Col sm={6}
                style={{
                    backgroundColor: "#fcbc77",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Image src={loginImage} fluid />
            </Col>
            <Col sm={6} className="p-4" style={{ backgroundImage: "linear-gradient(to right, #fcbc77, #f5dbbf)" }}>
                <i className="bi bi-pencil" style={{ fontStyle: "arial", fontSize: 40, color: "black", fontWeight: "bold" }}> Friendly Reminder</i>

                <p className="mt-4" style={{ fontSize: 40, fontStyle: "italic" }}>Fail to Plan, Plan to Fail!</p>
                <h2 className="my-4" style={{ fontSize: 30 }}>Register for Free and Boost Your Productivity!</h2>
                <h2 className="my-4" style={{ fontSize: 30 }}>Join Now!</h2>

                <Col sm={5} className="d-grid gap-2">
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-google"></i> Sign up with Google
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-github"></i> Sign up with Github
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-apple"></i> Sign up with Apple
                    </Button>
                    <p style={{ textAlign: "center" }}>or</p>
                    <Button className="rounded-pill hover-icon" variant="outline-dark" style={{ backgroundColor: "#e0af79" }} onClick={handleShowSignUp}>
                        <i className="bi bi-lock lock-icon"></i>
                        <i className="bi bi-unlock unlock-icon"></i> Create an Account
                    </Button>

                    <p style={{ fontSize: "12px" }}>Create your account to get started! By signing up, you agree to our Terms of Service and Privacy Policy</p>
                    <p className="mt-1" style={{ fontWeight: "bold" }}>Already have an Account?</p>

                    <Button className="rounded-pill hover-icon" variant="outline-dark" style={{ backgroundColor: "#e0af79" }} onClick={handleShowLogin}>
                        <i className="bi bi-box-arrow-in-right arrow-in"></i>
                        <i className="bi-box-arrow-right arrow-out"></i> Sign In
                    </Button>
                </Col>

                {/* Sign up/login modal form */}
                <Modal
                    show={modalShow}
                    onHide={handleClose}
                    animation={false}
                    centered>
                    <Modal.Body style={{ backgroundImage: "linear-gradient(to right, #fcbc77, #f5dbbf)" }}>
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                            {modalShow === "SignUp"
                                ? "Create your account"
                                : "Log in to your account"}
                        </h2>
                        <Form
                            className="d-grid gap-2 px-5"
                            onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
                        >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter E-mail"
                                    style={{ backgroundColor: "#f5eee6" }}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Password"
                                    style={{ backgroundColor: "#f5eee6" }}
                                />
                            </Form.Group>

                            <p style={{ fontSize: "12px", color: "#333333", textAlign: "justify" }}>
                                By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. SigmaTweets may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalising our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                            </p>

                            <Button
                                className="rounded-pill"
                                variant="outline-dark"
                                type="submit"
                                style={{ backgroundColor: "#f5eee6" }}
                            >
                                {modalShow === "SignUp" ? "Sign Up" : "Log in"}
                            </Button>
                        </Form>
                    </Modal.Body>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>Signup successful!</p>}
                </Modal>
            </Col>
        </Row>
    );
}
