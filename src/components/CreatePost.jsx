import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import ReminderForm from "./ReminderForm";
import { auth } from "../firebase";
import { Navbar } from "react-bootstrap";

export default function CreatePost() {

    const [posted, setPosted] = useState(false);
    const navigate = useNavigate();

    const handlePost = async (title, content) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User not found');
            }
            const idToken = await user.getIdToken();
            const response = await fetch('https://06030352-4adc-45cf-9d08-4008063ab4a9-00-29ba1uc97w0lh.sisko.replit.dev/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`,
                },
                body: JSON.stringify({ title, content }),
            });
            if (response.ok) {
                setPosted(true);
            }
        }
        catch (error) {
            console.error('Error posting reminder:', error);
        }
    };

    useEffect(() => {
        if (posted) {
            navigate("/profile");
        }
    }, [posted, navigate]);

    const handleBacktoProfile = () => {
        navigate("/profile");
    };


    return (
        <div className="container mt-5">
            <Navbar>
                <button onClick={handleBacktoProfile}>Back to Profile</button>
            </Navbar>

            <ReminderForm onSubmit={handlePost} />
        </div>
    )
}
