import { Check, DoneAll } from '@mui/icons-material'
import { EventsFace } from '../utils/types'
import {
  formatDateFromTimestamp,
  formatDateWithMonthNames
} from '../utils/utils'

export function NotificationCard ({
  el,
  prev,
  markAsRead
}: {
  el: EventsFace
  prev: EventsFace
  markAsRead: any
}) {
  return (
    <div
      onClick={() => !el?.viewed && markAsRead(el?._id)}
      className='flex mx-auto cursor-pointer'
    >
      <p className='text-[rgb(59,63,92)] dark:text-gray-300  w-1/4 text-base font-semibold p-1 py-8'>
        {formatDateFromTimestamp(el?.created_at) ==
        formatDateFromTimestamp(prev?.created_at)
          ? ''
          : formatDateFromTimestamp(el?.created_at)}
      </p>
      <div className='relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before: before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2  after:rounded-full'></div>
      <div className='p-2.5 w-3/4 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5'>
        <p className='text-[#3b3f5c] dark:text-gray-300 font-semibold text-[13px]'>
          {el?.message}
        </p>
        <p>
          {!el?.viewed ? (
            <Check sx={{ color: 'white', width: '14px ' }} />
          ) : (
            <DoneAll sx={{ color: 'white', width: '14px ' }} />
          )}
        </p>
        <p className='text-gray-500 text-xs font-bold self-center min-w-[100px] max-w-[100px]'>
          {formatDateWithMonthNames(el?.created_at)}
        </p>
      </div>
    </div>
  )
}
