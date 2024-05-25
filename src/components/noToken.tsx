import Link from 'next/link'
function NoToken () {
  return (
    <div className=' mt-40 flex flex-col items-center justify-center gap-2  '>
      <h2 className='dark:text-white md:text-3xl text-lg text-center  p-5'>
        Ma&apos;lumotlarni ko&apos;rish uchun oldin tizimga kiring!
      </h2>
      <div className='flex gap-5'>
        <Link
          className='mt-16 text-md  dark:text-white md:px-4 px-2   py-1 rounded-lg border border-gray-900 dark:border-white w-40 md:w-56 text-center '
          href={'/login'}
        >
          Kirish{' '}
        </Link>

      </div>
    </div>
  )
}

export default NoToken
