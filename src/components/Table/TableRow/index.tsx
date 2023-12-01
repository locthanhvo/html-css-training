import Checkbox from '@components/common/Checkbox'
import StatusUser from '@components/Status'
import { CheckBox, User } from '@types'
import Heading from '@components/common/Heading'
import Text from '@components/common/Text'
import Avatar from '@components/common/Avatar'
import './tableRow.css'
import { formatDate } from '@helpers'
import { memo, useState } from 'react'
import { Colors } from '@themes'
import EditIcon from '@components/Icons/EditIcon'
import DeleteIcon from '@components/Icons/DeleteIcon'
import Button from '@components/common/Button'

interface Props {
  data: User
  onClickDelete: (id: string) => void
  onClickEdit: (id: string) => void
  onChangeCheckbox: ({ isChecked, checkboxId }: CheckBox) => void
}

const TableRow = ({ data, onClickDelete, onClickEdit, onChangeCheckbox }: Props) => {
  const { id, firstName, lastName, email, status, createdAt, avatar } = data
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target

    setIsChecked(checked)
    onChangeCheckbox({ isChecked: checked, checkboxId: id })
  }

  return (
    <tr key={id} className={`table-row  d-flex ${isChecked ? 'selected-row' : ''}`}>
      <td className='row-record td-sm'>
        <Checkbox checkboxId={id} onCheckboxChange={handleCheckboxChange} />
      </td>
      <td className='row-record td-lg'>
        <Avatar
          url={avatar}
          firstName={firstName}
          lastName={lastName}
          name={`${firstName} ${lastName}`}
        />
        <div>
          <Heading tag='h2' content={`${firstName} ${lastName}`} />
          <Text content={`@${firstName}`} color={Colors.GreyDark} />
        </div>
      </td>
      <td className='row-record td-md'>
        <StatusUser status={status} />
      </td>
      <td className='row-record row-email td-lg'>{email}</td>
      <td className='row-record td-xl'>{formatDate(createdAt)}</td>
      <td className='row-record td-xl'>
        <Button variants='default' onClick={() => onClickEdit(id)}>
          <EditIcon />
        </Button>
        <Button variants='default' onClick={() => onClickDelete(id)}>
          <DeleteIcon />
        </Button>
      </td>
    </tr>
  )
}

export default memo(TableRow)
