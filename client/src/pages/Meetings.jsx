// src/pages/Meetings.jsx
import { useEffect, useState } from 'react';
import { Container, Card, Button, ListGroup, Form, Alert, Row, Col } from 'react-bootstrap';
import config from '../config/config';

const API_BASE = `${config.API_BASE_URL}/meetings`;

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const fetchMeetings = async () => {
    try {
      const res = await fetch(API_BASE, { headers });
      const data = await res.json();
      setMeetings(data);
    } catch (err) {
      setError('Failed to load meetings');
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers,
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      setTitle('');
      setDescription('');
      fetchMeetings();
    } catch (err) {
      setError('Failed to create meeting');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
        headers,
      });
      fetchMeetings();
    } catch (err) {
      setError('Failed to delete meeting');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">📅 Meetings</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="mb-4 p-3 shadow-sm">
        <h5>Create New Meeting</h5>
        <Form onSubmit={handleCreate}>
          <Row>
            <Col md={5}>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Col>
            <Col md={5}>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
            <Col md={2}>
              <Button type="submit" variant="primary" className="w-100">Create</Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <ListGroup>
        {meetings.map((m) => (
          <ListGroup.Item key={m._id} className="d-flex justify-content-between align-items-center">
            <div>
              <h6>{m.title}</h6>
              <p className="mb-0 text-muted small">{m.description}</p>
            </div>
            <div>
              <Button variant="danger" size="sm" onClick={() => handleDelete(m._id)}>
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Meetings;
