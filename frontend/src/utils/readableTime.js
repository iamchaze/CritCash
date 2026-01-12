export default function readableTime(dateString) {
    const result =  new Date(dateString).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
    return result.toUpperCase();
}