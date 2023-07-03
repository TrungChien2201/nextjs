import { ModalCustom } from '@/components/base/Modal'

export function ModalConfirmDelete(props) {
  const { isVisible, handleClose, onSubmit, titleItem } = props
  return (
    <ModalCustom
      isVisible={isVisible}
      title="Delete Item"
      handleClose={handleClose}
      onSubmit={onSubmit}
    >
      Are you sure want to delete {titleItem} ?
    </ModalCustom>
  )
}
