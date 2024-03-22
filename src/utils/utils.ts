export function getMillisecondsForAllHours (date: any) {
  var startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  var hoursArray: number[] = []
  for (var i = 0; i < 24; i++) {
    var currentHour = new Date(startOfDay)
    currentHour.setHours(i)
    hoursArray.push(currentHour.getTime())
  }
  return hoursArray
}
const monthNames = [
  'Yanvar',
  'Fevral',
  'Mart',
  'April',
  'May',
  'Iyun',
  'Iyul',
  'Avgust',
  'Sentyabr',
  'Oktyabr',
  'Noyabr',
  'Dekabr'
]
export function getCurrentFormattedDate (date: Date): string {
  const months = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul",
    "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
  ];
  
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const monthName = months[monthIndex];
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${day} ${monthName} ${year}`;
}

export function prettyDateFormat (dateString: string) {
  const options: any = {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }

  const formattedDate = new Date(dateString).toLocaleDateString(
    'en-US',
    options
  )

  return formattedDate
}

export function formatDateWithMonthNames (timestamp: string | number){
  const date = new Date(timestamp)
 
  const day = date.getDate()
  const month = monthNames[date.getMonth()] // Get the month name
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  const formattedDate = `${month} ${day}, ${hours}:${
    0 <= minutes && minutes <= 9 ? `0${minutes}` : minutes
  }`

  return formattedDate
}

export function haversineDistance (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadius = 6371

  const lat1Rad = (Math.PI * lat1) / 180
  const lon1Rad = (Math.PI * lon1) / 180
  const lat2Rad = (Math.PI * lat2) / 180
  const lon2Rad = (Math.PI * lon2) / 180

  const dlat = lat2Rad - lat1Rad
  const dlon = lon2Rad - lon1Rad
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2
  const c = 2 * Math.asin(Math.sqrt(a))
  const distance = earthRadius * c
  return distance.toFixed(1)
}

export const show = {
  opacity: 1
}

export const hide = {
  opacity: 0
}

export function timeAgo (timestamp: string) {
  const currentDate = new Date()
  const previousDate = new Date(timestamp)
  const timeDifference = currentDate.getTime() - previousDate.getTime()
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day
  if (timeDifference < minute) {
    return 'Hozirgina'
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute)
    return `${minutes} daqiqa oldin`
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour)
    return `${hours} soat oldin`
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day)
    return `${days} kun oldin`
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week)
    return `${weeks} hafta oldin`
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month)
    return `${months} oy oldin`
  } else {
    const years = Math.floor(timeDifference / year)
    return `${years} yil oldin`
  }
}
export function formatDateFromTimestamp(timestamp: string): string {
  const timestampObj = new Date(timestamp);
  const monthIndex = timestampObj.getMonth();
  const monthName = monthNames[monthIndex];
  const hours = timestampObj.getHours();
  const formattedHours = `${monthName} ${timestampObj.getDate()}`;
  return formattedHours;
}
export function currency(n: number): string {
  if (n < 1e3) {
      return n.toString();
  } else if (n < 1e6) {
      return (n / 1e3).toFixed(2) + ' K so\'m';
  } else if (n < 1e9) {
      return (n / 1e6).toFixed(2) + ' M so\'m';
  } else if (n < 1e12) {
      return (n / 1e9).toFixed(2) + ' B so\'m';
  } else {
      return n.toString();
  }
}
