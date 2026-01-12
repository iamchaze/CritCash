export default function readableDate(dateString) {
    const result = new Date(dateString).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    return result;
}