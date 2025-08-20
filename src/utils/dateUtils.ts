export function formatDate(iso: string | { seconds?: number }): string {
  // Support Firestore Timestamp-like objects
  if (typeof iso === "object" && iso && "seconds" in iso) {
    const d = new Date((iso.seconds as number) * 1000);
    return d.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  const d = new Date(iso as string);
  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}