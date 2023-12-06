import SelectBox from '@components/SelectBox'
import './filterMobile.css'
import { FILTER_MOBILE } from '@constants'
import Button from '@components/common/Button'
import Text from '@components/common/Text'
import { Colors, FontSize, FontWeight } from '@themes'

interface FilterMobileProps {
  onChangeSelect: (option: string | React.ChangeEvent<HTMLSelectElement>) => void
  onDeleteMultiple: () => void
  value: string
  checked: number
}

const FilterMobile = ({ onChangeSelect, onDeleteMultiple, value, checked }: FilterMobileProps) => {
  return (
    <div className='filter-mobile'>
      <SelectBox
        className='sort-option'
        optionList={FILTER_MOBILE}
        onChange={onChangeSelect}
        value={value}
      />
      <Button variants='danger' onClick={onDeleteMultiple} isDisabled={checked === 0}>
        <Text
          content='Delete All'
          color={Colors.White}
          fontSize={FontSize.TwoSmall}
          fontWeight={FontWeight.Bold}
        />
      </Button>
    </div>
  )
}

export default FilterMobile
