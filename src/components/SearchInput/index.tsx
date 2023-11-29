import SearchIcon from '@components/Icons/SearchIcon'
import './searchInput.css'
import { ChangeEvent } from 'react'

interface Props {
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({ onChangeSearch }: Props) => {
  return (
    <div className='search'>
      <SearchIcon />
      <input
        className='search-input'
        type='text'
        name='search'
        placeholder='Search'
        onChange={onChangeSearch}
      />
    </div>
  )
}

export default SearchInput
