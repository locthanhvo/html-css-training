import Button from '@components/common/Button'
import Filter from '@components/Filter'
import Heading from '@components/common/Heading'
import AddIcon from '@components/Icons/AddIcon'
import SearchInput from '@components/SearchInput'
import Text from '@components/common/Text'
import { Colors, FontSize, FontWeight } from '@themes'

interface HeaderProps {
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClickSelectOption: (option: string | React.ChangeEvent<HTMLSelectElement>) => void
  selected: string
  onOpenForm: (e: React.FormEvent<Element>) => void
  onDeleteMultiple: () => void
  checked: number
}

const Header = ({
  onChangeSearch,
  onClickSelectOption,
  onOpenForm,
  onDeleteMultiple: onDeleteMultiple,
  selected,
  checked,
}: HeaderProps) => {
  return (
    <div className='d-flex main-header'>
      <Heading content='Team members' tag='h1' />
      <div className='d-flex main-tools'>
        <div className='d-flex  main-tool-group'>
          <div className='display-button'>
            <Button variants='danger' onClick={onDeleteMultiple} isDisabled={checked === 0}>
              <Text
                content='Delete All'
                color={Colors.White}
                fontSize={FontSize.TwoSmall}
                fontWeight={FontWeight.Bold}
              />
            </Button>
          </div>
          <SearchInput onChangeSearch={onChangeSearch} />
        </div>
        <div className='d-flex main-tool-group'>
          <Filter
            onClickSelectOption={onClickSelectOption}
            selectedOption={selected}
            checked={checked}
            onDeleteMutiple={onDeleteMultiple}
          />
          <Button variants='primary' onClick={onOpenForm}>
            <Text
              content='Add User'
              color={Colors.White}
              fontSize={FontSize.TwoSmall}
              fontWeight={FontWeight.Bold}
            />
            <AddIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header
