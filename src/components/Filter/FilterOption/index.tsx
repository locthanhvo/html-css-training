import CalendarIcon from '@components/Icons/CalendarIcon'
import MailIcon from '@components/Icons/MailIcon'
import OptionIcon from '@components/Icons/OptionIcon'
import PlusIcon from '@components/Icons/PlusIcon'
import UserIcon from '@components/Icons/UserIcon'
import { FILTER_OPTIONS, ICON_FILTER } from '@constants'

interface FilterOptionProps {
  valueSelect: string
  onSelectOption: (option: string) => void
}

const FilterOption = ({ valueSelect, onSelectOption }: FilterOptionProps) => {
  const getIconByOption = (option: string) => {
    switch (option) {
      case ICON_FILTER.ACTIVE:
        return <UserIcon />
      case ICON_FILTER.OFFLINE:
        return <CalendarIcon />
      case ICON_FILTER.WAIT:
        return <MailIcon />
      default:
        return <UserIcon />
    }
  }

  return (
    <ul className='option-filter'>
      {FILTER_OPTIONS.map((option) => {
        const { id, name } = option
        const isSelected = valueSelect === name

        return (
          <li
            key={id}
            className={`option-item d-flex ${isSelected ? 'selected ' : ''}`}
            onClick={() => onSelectOption(name)}
          >
            <div className='d-flex flex-center option-frame'>
              <OptionIcon
                isSelected={isSelected}
                onClickOption={() => onSelectOption(name)}
                iconComponent={getIconByOption(name)}
              />
              {name}
            </div>
            {isSelected && <PlusIcon />}
          </li>
        )
      })}
    </ul>
  )
}

export default FilterOption
