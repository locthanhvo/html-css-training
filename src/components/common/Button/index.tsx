import { ReactNode } from 'react'
import './button.css'

interface Props {
  type?: 'button' | 'submit'
  children: ReactNode
  variants: 'primary' | 'secondary' | 'default' | 'danger'
  onClick: (e: React.FormEvent) => void
  isActive?: boolean
  isDisabled?: boolean
}

const Button = ({ children, type = 'button', variants, isActive, isDisabled, onClick }: Props) => {
  const activeClass = isActive ? 'filter-active' : ''
  const disabledClass = isDisabled ? 'btn-disabled' : ''

  return (
    <button
      disabled={isDisabled}
      type={type}
      className={`btn d-flex flex-center c-pointer btn-${variants} ${activeClass} ${disabledClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
