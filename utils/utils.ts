export function getMillisecondsForAllHours(date:any) {
    var startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // Set to midnight of the given date
    var hoursArray :number[]= [];
    for (var i = 0; i < 24; i++) {
      var currentHour = new Date(startOfDay);
      currentHour.setHours(i); // Set the hour within the loop
  
      hoursArray.push(currentHour.getTime());
    }
    return hoursArray;
  }
 export  function getCurrentFormattedDate(date :Date ): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function prettyDateFormat(dateString :string) {
  const options:any  = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDate = new Date(dateString).toLocaleDateString("en-US", options);

  return formattedDate;
}


export function formatDateWithMonthNames(timestamp :number) {
  const date = new Date(timestamp);

  // Define an array of month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Extract date and time components
  const day = date.getDate();
  const month = monthNames[date.getMonth()]; // Get the month name
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Create a formatted date and time string
  const formattedDate = `${month} ${day}, ${hours}:${(0 <= minutes && minutes <= 9) ?`0${minutes }` : minutes}`;

  return formattedDate;
}

export function haversineDistance(lat1 :number, lon1 :number, lat2 :number, lon2 :number) {
  // Radius of the Earth in kilometers
  const earthRadius = 6371; // You can use 3959 for miles

  // Convert latitude and longitude from degrees to radians
  const lat1Rad = (Math.PI * lat1) / 180;
  const lon1Rad = (Math.PI * lon1) / 180;
  const lat2Rad = (Math.PI * lat2) / 180;
  const lon2Rad = (Math.PI * lon2) / 180;

  // Haversine formula
  const dlat = lat2Rad - lat1Rad;
  const dlon = lon2Rad - lon1Rad;
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.asin(Math.sqrt(a));
  const distance = earthRadius * c;
  return  distance.toFixed(1)
   
}

export const show = {
  opacity: 1,
};

export const hide = {
  opacity: 0,
};


export function timeAgo(timestamp : string) {
  const currentDate = new Date();
  const previousDate = new Date(timestamp);
  const timeDifference = currentDate.getTime() - previousDate.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < minute) {
    return 'Just now';
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(timeDifference / year);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
}
export function formatHoursFromTimestamp(timestamp: string): string {
  const timestampObj = new Date(timestamp);
  const hours = timestampObj.getHours();
  const formattedHours = `${hours < 10 ? '0' : ''}${hours}:00`;
  return formattedHours;
}