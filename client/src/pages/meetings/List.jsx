import { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Alert, ListGroup, Spinner } from 'react-bootstrap';
import dayjs from 'dayjs';
import config from '../../config/config';

const API_BASE = `${config.API_BASE_URL}/meetings`;

const ListMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const headers = useMemo(() => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }), [token]);

  const fetchMeetings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE, { headers });
      const data = await res.json();
      setMeetings(data.data || []);
    } catch {
      setError('Failed to fetch meetings.');
    } finally {
      setLoading(false);
    }
  }, [headers]);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
        headers,
      });
      fetchMeetings();
    } catch {
      setError('Failed to delete meeting.');
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>📅 All Meetings</h3>
        <Link to="/meetings/create" className="btn btn-success">
          + Create Meeting
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <ListGroup>
          {meetings.map((meeting) => (
            <ListGroup.Item
              key={meeting._id}
              className="d-flex justify-content-between align-items-start flex-wrap"
            >
              <div>
                <h5 className="mb-1">{meeting.title}</h5>
                <p className="mb-1 text-muted small">{meeting.description}</p>
                <p className="mb-1">
                  <strong>Date:</strong>{' '}
                  {meeting.date ? dayjs(meeting.date).format('YYYY-MM-DD HH:mm') : 'N/A'}
                </p>
                <p className="mb-1">
                  <strong>Platform:</strong> {meeting.platform || 'N/A'}
                </p>
                <p className="mb-0">
                  <strong>Link:</strong>{' '}
                  {meeting.meetingLink ? (
                    <a
                      href={meeting.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="d-inline-block text-truncate"
                      style={{ maxWidth: '250px', verticalAlign: 'middle' }}
                    >
                      {meeting.meetingLink}
                    </a>
                  ) : (
                    'N/A'
                  )}
                </p>
              </div>

              <div className="d-flex flex-column align-items-end">
                <Link to={`/meetings/${meeting._id}`} className="btn btn-sm btn-primary mb-1">
                  View
                </Link>
                <Link to={`/meetings/${meeting._id}/edit`} className="btn btn-sm btn-warning mb-1">
                  Edit
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(meeting._id)}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default ListMeetings;
