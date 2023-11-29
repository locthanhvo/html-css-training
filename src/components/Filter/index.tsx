import { ChangeEvent, useState } from 'react'
import Button from '@components/Button'
import FilterIcon from '@components/Icons/FilterIcon'
import FilterMobile from '@components/Filter/FilterMobile'
import { COLOR_ICON } from '@constants'
import './filter.css'
import FilterOption from './FilterOption'

interface FilterProps {
  selectedOption: string
  onClickSelectOption: (option: string | ChangeEvent<HTMLSelectElement>) => void
  onDeleteMutiple: () => void
  checked: number
}

const Filter = ({ selectedOption, checked, onClickSelectOption, onDeleteMutiple }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenDropDownClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  return (
    <>
      <div className='filter-desktop'>
        <Button variants='secondary' onClick={handleOpenDropDownClick} isActive={isOpen}>
          <p>Status</p>
          <FilterIcon color={isOpen ? COLOR_ICON.PURPLE : COLOR_ICON.GREY_DARK} />
        </Button>
        {isOpen && (
          <FilterOption onSelectOption={onClickSelectOption} valueSelect={selectedOption} />
        )}
      </div>

      <FilterMobile
        value={selectedOption}
        onChangeSelect={onClickSelectOption}
        checked={checked}
        onDeleteMutiple={onDeleteMutiple}
      />
    </>
  )
}

export default Filter
