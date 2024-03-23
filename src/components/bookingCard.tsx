import { CancelOutlined, Person2Outlined, PhoneInTalk, PlaceOutlined, PlayArrow } from "@mui/icons-material";
import React from "react";
import { BookingFace } from "../utils/types";
import { formatDateWithMonthNames, timeAgo } from "../utils/utils";
import Link from "next/link";

function BookingCard({el , deleteGame}:{el: BookingFace , deleteGame : any}) {
  return <div
  className={`md:w-[500px] w-[90%]  dark:border-gray-500  rounded-lg  p-2 mx-auto my-5 flex flex-col gap-2 dark:text-white border-2  ${
    el?.status === 'confirmed'
      ? 'border-green-900'
      : el?.status === 'rejected'
      ? 'border-red-900'
      : el?.status === 'pending'
      ? 'border-orange-500'
      : ''
  } `}
>
  <div className='flex justify-between'>
    <span className='text-xs text-gray-900 dark:text-white'>
      <PlayArrow sx={{ width: '18px' }} />{' '}
      {formatDateWithMonthNames(el?.from)}{' '}
    </span>
    <button
      onClick={() => deleteGame(el?._id)}
      disabled={el.status === 'confirmed'}
      className='rounded border text-xs px-3'
    >
      <CancelOutlined sx={{ width: '18px' }} />
    </button>
  </div>
  <div className='flex justify-between'>
    <span className='text-xs text-gray-900 dark:text-white'>
      <Person2Outlined sx={{ width: '18px' }} />
      {el?.stadion?.owner?.name}
    </span>
    <a
      href={`tel:${el?.stadion?.callnumber}`}
      className='text-xs text-gray-900 dark:text-white'
    >
      <PhoneInTalk sx={{ width: '18px' }} />
      {el?.stadion?.callnumber}
    </a>
  </div>
  <Link
    href={`/stadiums/${el?.stadion?._id}`}
    className='text-xs text-gray-900 dark:text-white underline font-semibold'
  >
    <PlaceOutlined sx={{ width: '18px' }} />{' '}
    {el?.stadion?.destination}
  </Link>
  <div className='flex justify-between items-center'>
    <span className='text-xs text-gray-900 dark:text-white'>
      {timeAgo(el?.created_at)}
    </span>
    <span
      className={`text-xs text-gray-900 dark:text-white border px-2 py-1 rounded-sm ${
        el?.status === 'confirmed'
          ? 'text-green-900'
          : el?.status === 'rejected'
          ? 'text-red-900'
          : el?.status === 'pending'
          ? 'text-orange-300'
          : ''
      }
    }`}
    >
      {el?.status === 'confirmed'
        ? 'Tasdiqlandi'
        : el?.status === 'rejected'
        ? 'Rad etildi'
        : el?.status === 'pending'
        ? 'Kutilmoqda'
        : ''}
    </span>
  </div>
</div>
}

export default BookingCard;
