import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wallet from './pages/Wallet';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

// Meetings Pages
import ListMeetings from './pages/meetings/List';
import CreateMeeting from './pages/meetings/Create';
import ViewMeeting from './pages/meetings/View';
import EditMeeting from './pages/meetings/Edit';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wallet />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Meeting Routes */}
        <Route path="/meetings" element={
          <PrivateRoute>
            <ListMeetings />
          </PrivateRoute>
        } />
        <Route path="/meetings/create" element={
          <PrivateRoute>
            <CreateMeeting />
          </PrivateRoute>
        } />
        <Route path="/meetings/:id" element={
          <PrivateRoute>
            <ViewMeeting />
          </PrivateRoute>
        } />
        <Route path="/meetings/:id/edit" element={
          <PrivateRoute>
            <EditMeeting />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
