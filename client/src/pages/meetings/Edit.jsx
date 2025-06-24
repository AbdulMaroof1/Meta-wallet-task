import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import config from '../../config/config';


const EditMeeting = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [platform, setPlatform] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/meetings/${id}`, { headers });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Not found');

        const m = result.data;

        setTitle(m.title);
        setDescription(m.description);
        setDate(m.date?.slice(0, 16)); // format for input type datetime-local
        setPlatform(m.platform);
        setMeetingLink(m.meetingLink);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${config.API_BASE_URL}/meetings/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          title,
          description,
          date,
          platform,
          meetingLink,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Update failed');
      }

      navigate('/meetings');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <h4>Edit Meeting</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date & Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Platform</Form.Label>
            <Form.Select value={platform} onChange={(e) => setPlatform(e.target.value)} required>
              <option value="">Select Platform</option>
              <option value="zoom">Zoom</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Meeting Link</Form.Label>
            <Form.Control
              type="url"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary">Update Meeting</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default EditMeeting;
