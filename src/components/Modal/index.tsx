import { ReactNode } from 'react'
import './modal.css'
import Heading from '@components/common/Heading'
import Button from '@components/common/Button'
import Text from '@components/common/Text'
import SpinnerIcon from '@components/Icons/SpinnerIcon'
import CloseIcon from '@components/Icons/CloseIcon'
import { Colors, FontWeight } from 'themes'

interface ModalProps {
  title: string
  children: ReactNode
  primaryType?: 'button' | 'submit'
  primaryTitle: string
  isDisplay: boolean
  onCloseModal: (e: React.FormEvent) => void
  onSubmitModal: (e: React.FormEvent) => void
}

const Modal = ({
  children,
  title,
  primaryType,
  primaryTitle,
  isDisplay,
  onCloseModal,
  onSubmitModal,
}: ModalProps) => {
  return (
    <div className='modal d-flex flex-center open'>
      <div className='modal-content'>
        <div className='modal-header d-flex'>
          <Heading content={title} tag='h2' />
          <CloseIcon onClose={onCloseModal} />
        </div>

        <hr className='modal-line' />

        <div className='modal-body'>{children}</div>

        <div className='modal-footer'>
          <Button
            type={primaryType}
            isDisabled={isDisplay}
            onClick={onSubmitModal}
            variants='primary'
          >
            {isDisplay && <SpinnerIcon />}
            <Text content={primaryTitle} color={Colors.White} fontWeight={FontWeight.Bold} />
          </Button>
          <Button onClick={onCloseModal} variants='secondary'>
            <Text content='Cancel' color={Colors.Purple} fontWeight={FontWeight.Bold} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
