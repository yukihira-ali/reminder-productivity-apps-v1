import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Card, Form, Navbar } from "react-bootstrap";

const API_BASE_URL = "https://be-reminder-productivity-app-v1.vercel.app";

export default function EditPost() {
    const { uid, id } = useParams(); // // Get both UID and post ID from URL parameters
    const [editPost, setEditPost] = useState({ title: '', content: '', status: '' });
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/posts/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    // Find the specific post by ID from the fetched posts
                    const post = data.find(post => post.id === parseInt(id));
                    console.log(post)
                    setEditPost(post); // Set the found post to state
                } else {
                    setError('Failed to fetch post');
                }
            } catch (err) {
                console.err(err);
                setError('Error fetching post');
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetchPost();
    }, [uid, id]); // Dependency on ID ensures it refetches when ID changes

    const handleEditPost = async (e) => {
        e.preventDefault();
        const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editPost),
        });
        if (response.ok) {
            navigate("/profile");
        } else {
            const errorData = await response.json();
            setError(errorData.error || 'Error editing post');
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <div className="container mt-5">
            <Navbar>
                <Button onClick={() => navigate("/profile")}>Back to Profile</Button>
            </Navbar>
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error if any */}
            <Card>
                <Card.Body>
                    <Card.Title className="text-center">Edit Post</Card.Title>
                    <Form onSubmit={handleEditPost}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={editPost.title}
                                onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={editPost.content}
                                onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus" className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={editPost.status}
                                onChange={(e) => setEditPost({ ...editPost, status: e.target.value })}
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Blocked">Blocked</option>
                                <option value="Completed">Completed</option>
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary" className="w-100">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
