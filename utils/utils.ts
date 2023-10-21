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

