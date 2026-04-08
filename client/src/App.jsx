import { useState, useEffect } from 'react'
import './App.css'

const API_BASE = 'http://localhost:8000/api'

function App() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'Medium'
  })

  // Fetch tickets on mount
  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
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
  )
}

export default App
