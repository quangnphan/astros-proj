export function formatTimestamp(timestamp) {
    const dateObject = new Date(timestamp);
    const formattedDate = `${
      dateObject.getMonth() + 1
    }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    return formattedDate;
  }