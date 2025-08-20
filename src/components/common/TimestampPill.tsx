import { useState, useEffect } from "react";
import { formatDate } from "@/utils/dateUtils";

export function TimestampPill() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="academic-badge-type">
      {formatDate(now.toISOString())}
    </span>
  );
}