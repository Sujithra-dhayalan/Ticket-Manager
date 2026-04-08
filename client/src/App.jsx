import { useState, useEffect } from 'react'
<<<<<<< HEAD
import axios from 'axios'
import TicketForm from './components/TicketForm'
import TicketList from './components/TicketList'
import Notification from './components/Notification'
import './App.css'

const API_BASE = import.meta.env.VITE_BASE_URL
=======
import './App.css'

const API_BASE = 'http://localhost:8000/api'
>>>>>>> 1ffc6965e84aef8f23c22371f5e528b5869db7d9

function App() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)
<<<<<<< HEAD
  const [notification, setNotification] = useState({
    message: '',
    type: 'error'
  })

=======
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'Medium'
  })

  // Fetch tickets on mount
>>>>>>> 1ffc6965e84aef8f23c22371f5e528b5869db7d9
  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
<<<<<<< HEAD
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
=======
      setLoading(true)
      const res = await fetch(`${API_BASE}/tickets`)
      const data = await res.json()
      setTickets(data)
    } catch (error) {
      console.error('Error fetching tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_BASE}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setFormData({ subject: '', message: '', priority: 'Medium' })
        fetchTickets()
      }
    } catch (error) {
      console.error('Error creating ticket:', error)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/tickets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      if (res.ok) {
        fetchTickets()
      }
    } catch (error) {
      console.error('Error updating ticket:', error)
    }
  }

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Ticket Management</h1>
        
        <div className="grid">
          {/* Form Section */}
          <div className="form-section">
            <h2>Create New Ticket</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief subject"
                  required
                  minLength="3"
                  maxLength="255"
                />
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Detailed message"
                  required
                  minLength="10"
                  maxLength="5000"
                  rows="5"
                ></textarea>
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">Create Ticket</button>
            </form>
          </div>

          {/* Tickets List Section */}
          <div className="tickets-section">
            <h2>All Tickets</h2>
            {loading ? (
              <p>Loading...</p>
            ) : tickets.length === 0 ? (
              <p className="empty">No tickets yet</p>
            ) : (
              <div className="tickets-list">
                {tickets.map(ticket => (
                  <div key={ticket._id} className="ticket-card">
                    <div className="ticket-header">
                      <h3>{ticket.subject}</h3>
                      <span className={`badge priority-${ticket.priority.toLowerCase()}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    
                    <p className="ticket-message">{ticket.message}</p>
                    
                    <div className="ticket-footer">
                      <div className="ticket-meta">
                        <span className={`badge status-${ticket.status.toLowerCase()}`}>
                          {ticket.status}
                        </span>
                        <small>{new Date(ticket.createdAt).toLocaleDateString()}</small>
                      </div>
                      
                      <div className="status-buttons">
                        <button
                          className={`status-btn ${ticket.status === 'NEW' ? 'active' : ''}`}
                          onClick={() => handleStatusChange(ticket._id, 'NEW')}
                        >
                          New
                        </button>
                        <button
                          className={`status-btn ${ticket.status === 'INVESTIGATING' ? 'active' : ''}`}
                          onClick={() => handleStatusChange(ticket._id, 'INVESTIGATING')}
                        >
                          Investigating
                        </button>
                        <button
                          className={`status-btn ${ticket.status === 'RESOLVED' ? 'active' : ''}`}
                          onClick={() => handleStatusChange(ticket._id, 'RESOLVED')}
                        >
                          Resolved
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
>>>>>>> 1ffc6965e84aef8f23c22371f5e528b5869db7d9
  )
}

export default App
