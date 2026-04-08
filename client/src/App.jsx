import { useState, useEffect } from 'react'
import axios from 'axios'
import TicketForm from './components/TicketForm'
import TicketList from './components/TicketList'
import Notification from './components/Notification'
import './App.css'

const API_BASE = import.meta.env.VITE_BASE_URL

function App() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState({
    message: '',
    type: 'error'
  })

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_BASE}/tickets`);
      console.log("🫂🫂🫂", res);
      setTickets(res.data.data);

    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (formData) => {
    try {
      const res = await axios.post(`${API_BASE}/tickets`, formData);

      if (res.status === 201 || res.status === 200) {
        setNotification({
          message: 'Ticket created successfully!',
          type: 'success'
        })
        fetchTickets();
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error creating ticket';
      setNotification({
        message: errorMessage,
        type: 'error'
      })
      console.error("Error creating ticket:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.patch(`${API_BASE}/tickets/${id}`, {
        status: newStatus,
      });

      if (res.status === 200) {
        fetchTickets();
      }

    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  return (
    <div className="container">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'error' })}
      />
      <div className="content">
        <h1 className="title">Ticket Management</h1>

        <div className="grid">
          <TicketForm onSubmit={handleCreateTicket} loading={loading} />
          <TicketList
            tickets={tickets}
            loading={loading}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  )
}

export default App
