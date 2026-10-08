const Notification = ({ message, type = 'error' }) => {
  if (!message) {
    return null
  }

  return (
    <div
      className={type}
      role={type === 'error' ? 'alert' : 'status'}
      style={{
        color: type === 'error' ? '#8b1e1e' : '#176b38',
        backgroundColor: type === 'error' ? '#fce8e6' : '#e6f4ea',
        border: `1px solid ${type === 'error' ? '#d93025' : '#188038'}`,
        padding: '8px 12px',
        margin: '8px 0',
      }}
    >
      {message}
    </div>
  )
}

export default Notification