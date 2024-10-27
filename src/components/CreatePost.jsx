import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import ReminderForm from "./ReminderForm";
import { auth } from "../firebase";
import { Button, Navbar } from "react-bootstrap";

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
            const response = await fetch('https://3a1059c0-715c-4025-b1e6-e706d95de636-00-dddjcjv4nz3q.sisko.replit.dev/posts', {
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
                <Button variant="secondary" onClick={handleBacktoProfile}>Back to Profile</Button>
            </Navbar>


            <ReminderForm onSubmit={handlePost} />
        </div>
    )
}
