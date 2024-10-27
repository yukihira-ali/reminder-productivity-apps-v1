import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Card, Form, Navbar } from "react-bootstrap";

export default function EditPost() {
    const id = useParams().id;
    const [editPost, setEditPost] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`https://3a1059c0-715c-4025-b1e6-e706d95de636-00-dddjcjv4nz3q.sisko.replit.dev/posts/${id}`);
            if (response.ok) {
                const data = await response.json();
                setEditPost(data);
            }
        };
        fetchPost();
    }, [id]);

    const handleEditPost = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://3a1059c0-715c-4025-b1e6-e706d95de636-00-dddjcjv4nz3q.sisko.replit.dev/posts/${id}`, {
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
