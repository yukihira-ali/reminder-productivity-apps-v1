import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { Button, Card, Spinner } from "react-bootstrap";

const API_BASE_URL = "https://be-reminder-productivity-app-v1.vercel.app";

export default function ProfileMidBody() {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async (uid) => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/posts/user/${uid}`);
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    setPosts([])
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!currentUser) {
            navigate("/login");
        } else {
            fetchPosts(currentUser.uid);
        }
    }, [currentUser, navigate]);

    const handleEditPost = async (id) => {
        navigate(`/edit/${id}`);
    }

    const handleDeletePost = async (id) => {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setPosts(posts.filter(post => post.id !== id));
        } else {
            console.error('Error deleting post');
        }
    }

    return (
        <>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p>Reminding...</p>
                </div>
            ) : (
                <div>
                    <h2>Your Reminders</h2>
                    {posts.length > 0 ? (
                        posts.map((post) => {
                            // Format the created_at timestamp for each post
                            const formattedDate = new Date(post.created_at).toLocaleString('en-MY', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false // Change to true for 12-hour format
                            });

                            return (
                                <Card key={post.id} className="mb-3">
                                    <Card.Body>
                                        <Card.Title className="d-flex flex-column justify-content-between align-items-start">
                                            <div className="d-flex justify-content-between align-items-center w-100">
                                                {formattedDate}
                                                <Button className="me-2" disabled>{post.status}</Button>
                                            </div>
                                            <span>Title: {post.title}</span>
                                        </Card.Title>

                                        <hr />
                                        <Card.Text style={{ whiteSpace: "pre-wrap" }}>{post.content}</Card.Text>
                                        <div className="d-flex justify-content-end">
                                            <Button
                                                variant="warning"
                                                onClick={() => handleEditPost(post.id)}
                                                className="me-2"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDeletePost(post.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            );
                        })
                    ) : (
                        <p>No reminders yet!</p>
                    )}
                </div>
            )}
        </>
    );
}
