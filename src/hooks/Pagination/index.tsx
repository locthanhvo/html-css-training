import { LIMIT_DEFAULT, PAGE_DEFAULT, SNACKBAR_MESSAGE, SNACKBAR_STATUS } from '@constants'
import { User } from '@types'
import { useState, useEffect, ChangeEvent, useRef } from 'react'

interface PaginationProps {
  limit: number
  isActiveNextIcon: boolean
  isActivePreviousIcon: boolean
  isLoadingIndicator: boolean
  handleLimitList: (e: ChangeEvent<HTMLSelectElement>) => Promise<void>
  handleNextPageList: (e: React.MouseEvent<SVGSVGElement>) => Promise<void>
  handlePreviousPageList: (e: React.MouseEvent<SVGSVGElement>) => Promise<void>
  hasPagination: boolean
}

const usePagination = (
  handlePaginationPage: (page: number) => Promise<any[]>,
  handleLimitUser: (limit: number) => Promise<any[]>,
  showSnackBar: (message: string, status: SNACKBAR_STATUS) => void,
  users: User[],
): PaginationProps => {
  const [limit, setLimit] = useState<number>(LIMIT_DEFAULT)
  const [isActiveNextIcon, setIsActiveNextIcon] = useState<boolean>(true)
  const [isActivePreviousIcon, setIsActivePreviousIcon] = useState<boolean>(false)
  const [isLoadingIndicator, setIsLoadingIndicator] = useState(false)
  const pageRef = useRef(1)

  const handleLimitList = async (e: ChangeEvent<HTMLSelectElement>) => {
    try {
      const limitValue = e.target.value

      setLimit(parseInt(limitValue))

      const users = await handleLimitUser(parseInt(limitValue))
      const checkRecordPerPage = users.length < parseInt(limitValue)
      pageRef.current = PAGE_DEFAULT

      setIsActiveNextIcon(!checkRecordPerPage)
      setIsActivePreviousIcon(false)
    } catch (error) {
      showSnackBar(SNACKBAR_MESSAGE.GET_FAILED, SNACKBAR_STATUS.ERROR)
    }
  }

  const handleNextPageList = async (e: React.MouseEvent<SVGSVGElement>) => {
    setIsLoadingIndicator((prev) => !prev)
    try {
      if (users.length < limit) {
        return setIsLoadingIndicator((prev) => !prev)
      }

      const recordPerPage = await handlePaginationPage(pageRef.current + 1)

      pageRef.current += 1

      if (pageRef.current != PAGE_DEFAULT) {
        setIsActivePreviousIcon(true)
      }

      if (recordPerPage.length < limit) {
        setIsActiveNextIcon((prev) => !prev)
        e.preventDefault()
      }
    } catch (error) {
      showSnackBar(SNACKBAR_MESSAGE.GET_FAILED, SNACKBAR_STATUS.ERROR)
    }

    setIsLoadingIndicator((prev) => !prev)
  }

  const handlePreviousPageList = async (e: React.MouseEvent<SVGSVGElement>) => {
    setIsLoadingIndicator((prev) => !prev)

    try {
      if (pageRef.current > PAGE_DEFAULT) {
        await handlePaginationPage(pageRef.current - 1)
        pageRef.current -= 1

        setIsActiveNextIcon(true)

        if (pageRef.current === PAGE_DEFAULT) {
          setIsActivePreviousIcon((prev) => !prev)
          e.preventDefault()
        }
      }
    } catch (error) {
      showSnackBar(SNACKBAR_MESSAGE.GET_FAILED, SNACKBAR_STATUS.ERROR)
    }

    setIsLoadingIndicator((prev) => !prev)
  }

  useEffect(() => {
    const checkRecordPerPage = limit ? users.length < limit : users.length < LIMIT_DEFAULT

    setIsActiveNextIcon(!checkRecordPerPage)
  }, [users.length, limit])

  return {
    limit,
    isActiveNextIcon,
    isActivePreviousIcon,
    isLoadingIndicator,
    handleLimitList,
    handleNextPageList,
    handlePreviousPageList,
    hasPagination:
      pageRef.current !== PAGE_DEFAULT || (pageRef.current === PAGE_DEFAULT && users.length > 0),
  }
}

export default usePagination
