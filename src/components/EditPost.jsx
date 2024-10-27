import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Card, Form, Navbar } from "react-bootstrap";

export default function EditPost() {
    const id = useParams().id;
    const [editPost, setEditPost] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`https://be-reminder-productivity-app-v1.vercel.app/posts/${id}`);
            if (response.ok) {
                const data = await response.json();
                setEditPost(data);
            }
        };
        fetchPost();
    }, [id]);

    const handleEditPost = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://be-reminder-productivity-app-v1.vercel.app/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editPost),
        });
        if (response.ok) {
            navigate("/profile");
        } else {
            console.error('Error editing post');
        }
    };


    return (
        <div className="container mt-5">
            <Navbar>
                <Button onClick={() => navigate("/profile")}>Back to Profile</Button>
            </Navbar>
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
                        <Button type="submit" variant="primary" className="w-100">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
