import Text from '@components/Text'
import './snackBar.css'
import { Colors, FontSize, FontWeight } from '@themes'
import CloseIcon from '@components/Icons/CloseIcon'

interface SnackBarProps {
  message: string
  status: string
  onCloseSnackBar: () => void
}

const SnackBar = ({ message, status, onCloseSnackBar }: SnackBarProps) => {
  return (
    <div className={`snack-bar open snack-bar-${status}`}>
      <div className='snack-bar-body'>
        <Text
          content={message}
          color={Colors.White}
          fontSize={FontSize.Medium}
          fontWeight={FontWeight.Bold}
        />
      </div>
      <CloseIcon onClose={onCloseSnackBar} />
    </div>
  )
}

export default SnackBar
