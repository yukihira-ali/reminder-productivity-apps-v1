import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import ReminderForm from "./ReminderForm";
import { auth } from "../firebase";
import { Button, Navbar } from "react-bootstrap";

export default function CreatePost() {

    const [posted, setPosted] = useState(false);
    const navigate = useNavigate();

    const handlePost = async (title, content, status) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User not found');
            }
            const idToken = await user.getIdToken();
            const response = await fetch('https://eae02eb9-4d0e-4db0-ae83-6adefaa44fdb-00-31qhfn6omilw.pike.replit.dev/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`,
                },
                body: JSON.stringify({ title, content, status }),
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
                <Button variant="secondary" onClick={handleBacktoProfile}>Back to Profile</Button>
            </Navbar>


            <ReminderForm onSubmit={handlePost} />
        </div>
    )
}
