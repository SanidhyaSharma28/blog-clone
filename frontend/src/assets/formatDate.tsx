export const formatDateAndTimeIST = (utcDateString:string) => {
    // Parse UTC string to Date object
    const dateUTC = new Date(utcDateString);
    
    if (isNaN(dateUTC.getTime())) {
        throw new Error("Invalid date string provided");
    }
    

    // Convert UTC to IST Date object
    const dateIST = new Date(dateUTC.getTime() );

    // Function to add ordinal suffix to day
    const getOrdinal = (n:any) => {
        const suffixes = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    };

    // Format day with ordinal suffix
    const day = getOrdinal(dateIST.getDate());

    // Array of month names
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    // Get month name
    const month = monthNames[dateIST.getMonth()];

    // Get year
    const year = dateIST.getFullYear();

    // Format time in IST
    const hours = dateIST.getHours();
    const minutes = dateIST.getMinutes().toString().padStart(2, "0");
    const timeIST = `${hours}:${minutes} IST`;

    // Construct final formatted string
    return `${day} ${month} ${year}, ${timeIST}`;
};

// Example usage
const utcDateString = "2023-07-13T07:58:21.682Z"; // Input UTC date string
const formattedDate = formatDateAndTimeIST(utcDateString);
console.log(formattedDate); // Expected output: "13th July 2023, 13:28 IST"
