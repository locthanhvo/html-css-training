import NextIcon from '@components/Icons/NextIcon'
import PreviousIcon from '@components/Icons/PreviousIcon'
import SelectBox from '@components/SelectBox'
import { OPTION_RECORDS } from '@constants'
import './pagination.css'
import Text from '@components/Text'
import { Colors, FontSize } from '@themes'
import { ChangeEvent } from 'react'

interface PaginationProps {
  onChangeLimitPagination: (e: ChangeEvent<HTMLSelectElement>) => void
  onClickNext: (e: React.MouseEvent<SVGSVGElement>) => void
  onClickPrevious: (e: React.MouseEvent<SVGSVGElement>) => void
  isActiveNextIcon: boolean
  isActivePreviousIcon: boolean
}

const Pagination = ({
  onChangeLimitPagination,
  onClickNext,
  onClickPrevious,
  isActiveNextIcon,
  isActivePreviousIcon,
}: PaginationProps) => {
  return (
    <div className='pagination'>
      <Text content='Item per page:' color={Colors.GreyDark} fontSize={FontSize.Medium} />
      <SelectBox
        className='number-record'
        optionList={OPTION_RECORDS}
        onChange={onChangeLimitPagination}
      />
      <div className='btn-pagination'>
        <PreviousIcon onClickPrevious={onClickPrevious} pointer={isActivePreviousIcon ? 'c-pointer' : ''} color={isActivePreviousIcon ? '#717171' : '#e4e4e4'} />
        <NextIcon onClickNext={onClickNext} pointer={isActiveNextIcon ? 'c-pointer' : ''} color={isActiveNextIcon ? '#717171' : '#e4e4e4'} />
      </div>
    </div>
  )
}

export default Pagination
