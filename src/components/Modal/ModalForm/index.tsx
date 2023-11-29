import Modal from '@components/Modal'
import './modalForm.css'
import { ChangeEvent } from 'react'
import { User, UserField } from '@types'
import { STATUS_OPTIONS } from '@constants'
import SelectBox from '@components/SelectBox'
import InputGroup from '@components/InputGroup'

interface FormProps {
  onCloseForm: (e: React.FormEvent) => void
  onSubmitForm: (e: React.FormEvent) => void
  onChangeField: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  title: string
  isLoading: boolean
  primaryTitle: string
  data: User
  errorMessage: UserField
}

const Form = ({
  data,
  isLoading,
  onCloseForm,
  onSubmitForm,
  onChangeField,
  title,
  primaryTitle,
  errorMessage,
}: FormProps) => {
  const { firstName, lastName, email, password, confirmPassword, avatar, status, username, phone } =
    data

  const {
    firstName: firstNameError,
    lastName: lastNameError,
    email: emailError,
    password: passwordError,
    confirmPassword: confirmpasswordError,
    avatar: avatarError,
    status: statusError,
    username: usernameError,
    phone: phoneError,
  } = errorMessage

  return (
    <Modal
      onCloseModal={onCloseForm}
      onSubmitModal={onSubmitForm}
      title={title}
      primaryTitle={primaryTitle}
      primaryType='submit'
      isDisplay={isLoading}
    >
      <form className='form-content'>
        <div className='form-input'>
          <div className='form-gap'>
            <InputGroup
              type='text'
              name='firstName'
              value={firstName}
              placeholder='First Name *'
              onChangeInput={onChangeField}
              errorMessageField={firstNameError}
            />

            <InputGroup
              type='text'
              name='lastName'
              placeholder='Last Name *'
              value={lastName}
              onChangeInput={onChangeField}
              errorMessageField={lastNameError}
            />

            <InputGroup
              type='text'
              name='avatar'
              placeholder='Avatar'
              value={avatar}
              onChangeInput={onChangeField}
              errorMessageField={avatarError}
            />
          </div>

          <div className='form-gap'>
            <InputGroup
              type='email'
              name='email'
              placeholder='Email *'
              value={email}
              onChangeInput={onChangeField}
              errorMessageField={emailError}
            />

            <InputGroup
              type='text'
              name='phone'
              placeholder='Phone *'
              value={phone}
              onChangeInput={onChangeField}
              errorMessageField={phoneError}
            />

            <div className='input-group'>
              <SelectBox
                className='select-option item-validate'
                name='status'
                value={status}
                onChange={onChangeField}
                optionList={STATUS_OPTIONS}
              />
              {statusError && <span className={`status-error error-message`}></span>}
            </div>
          </div>

          <div className='form-gap'>
            <InputGroup
              type='text'
              name='username'
              placeholder='Username *'
              value={username}
              onChangeInput={onChangeField}
              errorMessageField={usernameError}
            />

            <InputGroup
              type='password'
              name='password'
              placeholder='Password *'
              value={password}
              onChangeInput={onChangeField}
              errorMessageField={passwordError}
            />

            <InputGroup
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password *'
              value={confirmPassword}
              onChangeInput={onChangeField}
              errorMessageField={confirmpasswordError}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default Form
