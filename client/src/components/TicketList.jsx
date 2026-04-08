import './TicketList.css'

// component to display list of tickets with status change buttons
export default function TicketList({ tickets, loading, onStatusChange }) {
    return (
        <div className="tickets-section">
            <h2>All Tickets</h2>
            {loading ? (
                <p className="loading">Loading...</p>
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
                                        onClick={() => onStatusChange(ticket._id, 'NEW')}
                                    >
                                        New
                                    </button>
                                    <button
                                        className={`status-btn ${ticket.status === 'INVESTIGATING' ? 'active' : ''}`}
                                        onClick={() => onStatusChange(ticket._id, 'INVESTIGATING')}
                                    >
                                        Investigating
                                    </button>
                                    <button
                                        className={`status-btn ${ticket.status === 'RESOLVED' ? 'active' : ''}`}
                                        onClick={() => onStatusChange(ticket._id, 'RESOLVED')}
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
    )
}
