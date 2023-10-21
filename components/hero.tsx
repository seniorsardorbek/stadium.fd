"use client"

const Hero = () => {



return (
  <div className="container" >
    Hero
  </div>
)
}

export default Hero

// function getMillisecondsForAllHours(date :any) {
//   var startOfDay = new Date(date);
//   startOfDay.setHours(0, 0, 0, 0); // Set to midnight of the given date

//   var hoursArray = [];
//   for (var i = 0; i < 24; i++) {
//     var currentHour = new Date(startOfDay);
//     currentHour.setHours(i); // Set the hour within the loop

//     // Get the milliseconds for the current hour and add it to the array
//     hoursArray.push(currentHour.getTime());
//   }

//   return hoursArray;
// }

// // Example usage:
// var date = new Date("2023-10-08"); // Replace with your desired date
// var hoursInMilliseconds = getMillisecondsForAllHours(date);



// function formatTimestampToPrettyDate(timestamp: number): string {
//   const date = new Date(timestamp);
//   return date.toLocaleString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     timeZoneName: 'short'
//   });
// }

// const timestamp = 1696705200000;
// const prettyDate = formatTimestampToPrettyDate(timestamp);