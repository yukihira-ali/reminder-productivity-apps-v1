import { getAuth } from 'firebase/auth';
import { Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import WeatherApp from './WeatherApp';


export default function ProfileSideBar() {
    const navigate = useNavigate();

    const auth = getAuth();

    const handleCreateReminder = () => {
        navigate("/create");
    };

    const handleGallery = () => {
        navigate("/gallery");
    };

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <Col
            sm={10}
            className='d-flex flex-column justify-content-start align-items-center bg-light vh-50'
            style={{ position: "sticky", top: 0, zIndex: 10 }}
        >
            <Button className="btn btn-secondary btn-lg mb-3 w-100" disabled>Your Profile</Button>
            <Button
                className="btn btn-primary btn-lg mb-3 w-100"
                onClick={handleCreateReminder}
            >
                <div>
                    <i className="bi bi-vector-pen"></i> Add a Reminder<br />Stay Organized, Feel Great!
                </div>
            </Button>
            <Button
                className="btn btn-secondary btn-lg mb-3 w-100"
                onClick={handleGallery}
            >
                <div>
                    <i className="bi bi-camera-fill"></i> Reminder Gallery
                </div>
            </Button>
            <Button
                className="btn btn-danger btn-lg mb-3 w-100"
                onClick={handleLogout}
            >
                <div>
                    <i className="bi bi-door-open-fill"></i> Logout
                </div>
            </Button>
            <WeatherApp />
        </Col>
    );
}
