import { useState } from 'react'
import './TicketForm.css'

export default function TicketForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'Medium'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ subject: '', message: '', priority: 'Medium' })
  }

  return (
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

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Ticket'}
        </button>
      </form>
    </div>
  )
}
