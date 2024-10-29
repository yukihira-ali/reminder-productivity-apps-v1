import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

export default function ReminderForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // New loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true on submit
        try {
            await onSubmit(title, content, status); // Await onSubmit if it's async
            setTitle('');
            setContent('');
            setStatus("");
            setError("");
        } catch (error) {
            console.error('Error creating reminder:', error);
            setError('Failed to create reminder. Try again later.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="container mt-5">
            <Card>
                <Card.Body>
                    <Card.Title className="text-center">Create a Reminder</Card.Title>
                    {error && <Alert variant="danger" aria-live="assertive">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle" className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formContent" className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus" className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Blocked">Blocked</option>
                                <option value="Completed">Completed</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'} {/* Loading state */}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
