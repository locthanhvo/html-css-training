import { OptionType } from '@types'
import { ChangeEvent } from 'react'

interface SelectBoxProps {
  name?: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLSelectElement>, option?: string) => void
  optionList: OptionType
  className: string
}

const SelectBox = ({ className, name, value, optionList, onChange }: SelectBoxProps) => (
  <select
    name={name}
    className={className}
    id={name}
    value={value}
    onChange={onChange}
    aria-label='Choose an option:'
  >
    {optionList.map((option) => {
      const { id, name, size } = option

      return (
        <option className='select-item' value={name === 'Status' ? '' : name || size} key={id}>
          {name || size}
        </option>
      )
    })}
  </select>
)

export default SelectBox
