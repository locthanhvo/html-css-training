import { useMemo } from 'react'
import { COLUMNS } from '@constants'
import Text from '@components/common/Text'
import SortIcon from '@components/Icons/SortIcon'
import { Colors, FontWeight } from '@themes'
import './tableHeader.css'

const TableHeader = () => {
  const renderColumns = useMemo(() => {
    return COLUMNS.map(({ headerName, icon, width }) => (
      <th className={`header-title th-${width}`} key={headerName}>
        <Text content={headerName} color={Colors.GreyLiver} fontWeight={FontWeight.Bold} />
        {icon && <SortIcon />}
      </th>
    ))
  }, [])

  return (
    <thead>
      <tr className='table-header'>
        <th className='header-title th-sm'></th>
        {renderColumns}
      </tr>
    </thead>
  )
}

export default TableHeader
