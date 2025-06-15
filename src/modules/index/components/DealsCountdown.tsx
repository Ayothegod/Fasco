import { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }: any) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: any = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <aside className="flex justify-between ">
      <div className="flex flex-col items-center">
        <span className="border p-4 rounded-md font-mono text-2xl">
          {timeLeft.days > 0 ? timeLeft.days : 0}
        </span>
        <p className="font-medium text-neutral-600">Days</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="border p-4 rounded-md font-mono text-2xl">
          {timeLeft.hours > 0 ? timeLeft.hours : 0}
        </span>
        <p className="font-medium text-neutral-600">Hrs</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="border p-4 rounded-md font-mono text-2xl">
          {timeLeft.minutes > 0 ? timeLeft.minutes : 0}
        </span>
        <p className="font-medium text-neutral-600">Mins</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="border p-4 rounded-md font-mono text-2xl">
          {timeLeft.seconds > 0 ? timeLeft.seconds : 0}
        </span>
        <p className="font-medium text-neutral-600">Sec</p>
      </div>
    </aside>
  );
};

const DealsCountdown = () => {
  const targetDate = new Date("2024-04-19T23:59:59");

  return (
    <div>
      <CountdownTimer targetDate={targetDate} />
    </div>
  );
};

export default DealsCountdown;
