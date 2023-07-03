const { Modal, Button } = require('react-bootstrap')

export function ModalCustom(props) {
  const { title, children, cancelText = 'Cancel', submitText = 'Save', isVisible, handleClose, onSubmit, size = 'md', className, contentClassName, isDisabled } = props
  return (
    <div
      className={`modal show ${className}`}
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal contentClassName={contentClassName} size={size} show={isVisible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {children}
        </Modal.Body>

        <Modal.Footer>
          <Button disabled={isDisabled} onClick={handleClose} variant="secondary">{cancelText}</Button>
          <Button disabled={isDisabled} onClick={onSubmit} variant="primary">{submitText}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
