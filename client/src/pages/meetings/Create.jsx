import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import config from '../../config/config';


const CreateMeeting = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [platform, setPlatform] = useState('zoom');
  const [meetingLink, setMeetingLink] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${config.API_BASE_URL}/meetings`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ title, description, date, platform, meetingLink }),
      });

      if (!res.ok) throw new Error('Failed to create meeting');
      navigate('/meetings');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <h4>Create Meeting</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleCreate}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date & Time</Form.Label>
            <Form.Control type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Platform</Form.Label>
            <Form.Select value={platform} onChange={(e) => setPlatform(e.target.value)} required>
              <option value="zoom">Zoom</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Meeting Link</Form.Label>
            <Form.Control type="url" value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit">Create Meeting</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateMeeting;
