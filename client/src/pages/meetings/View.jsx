import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';
import config from '../../config/config';

const ViewMeeting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${config.API_BASE_URL}/meetings/${id}`, { headers });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Meeting not found');
        setMeeting(data.data); // ✅ Correctly access .data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [id]);

  if (error) {
    return <Alert variant="danger" className="m-4">{error}</Alert>;
  }

  if (loading || !meeting) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <h3 className="mb-3">{meeting.title}</h3>
        <p className="text-muted">{meeting.description}</p>

        <hr />

        <p><strong>Date & Time:</strong> {new Date(meeting.date).toLocaleString()}</p>
        <p><strong>Platform:</strong> {meeting.platform}</p>
        <p><strong>Meeting Link:</strong>{' '}
          <a href={meeting.meetingLink} target="_blank" rel="noreferrer">
            {meeting.meetingLink}
          </a>
        </p>
        <p><strong>Created By:</strong> {meeting.createdBy}</p>

        <Button variant="secondary" onClick={() => navigate('/meetings')}>
          ← Back to Meetings
        </Button>
      </Card>
    </Container>
  );
};

export default ViewMeeting;
