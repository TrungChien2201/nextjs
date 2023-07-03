import { Spinner } from 'react-bootstrap'

export function Loading() {
  return (
    <div className="loading-overlay">
      <Spinner style={{ marginTop: '20%' }} animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>

  )
}
