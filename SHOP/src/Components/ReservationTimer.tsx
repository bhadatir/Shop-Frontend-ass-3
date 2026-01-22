import { useEffect, useState } from "react";

function ReservationTimer(){

  const [timeLeft, setTimeLeft] = useState<number>(300);

  useEffect(() => {
    if (timeLeft <= 0) return; 

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="text-black">
      {timeLeft > 0 ? (
        <div> Reservation Time Left: {formatTime(timeLeft)}</div>
      ) : (
        <div className="text-red">Reservation Expired</div>
      )}
    </div>
  );
};

export default ReservationTimer;