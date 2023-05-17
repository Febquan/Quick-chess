import { forwardRef, useImperativeHandle } from "react";
import { useTimer } from "react-timer-hook";

function paddingTime(number: number) {
  let string = number.toString();
  if (string.length == 1) {
    string = "0" + string;
  }
  return string;
}
const Timer = forwardRef(
  (
    {
      expriryTime,
      autoStart,
      plusTime,
      ExpireFuc,
      className,
    }: {
      autoStart: boolean;
      expriryTime: Date;
      plusTime: number;
      ExpireFuc?: VoidFunction;
      className?: string;
    },
    ref
  ) => {
    const { seconds, minutes, hours, restart, pause, resume } = useTimer({
      expiryTimestamp: expriryTime,
      autoStart: autoStart,

      onExpire: ExpireFuc,
    });

    useImperativeHandle(ref, () => ({
      addTime: () => {
        const newTime = new Date(
          hours * 1000 * 3600 +
            minutes * 1000 * 60 +
            seconds * 1000 +
            plusTime * 1000
        );

        restart(new Date(new Date().getTime() + newTime.getTime()), false);
      },
      pauseTime: () => {
        pause();
      },
      resumeTime: () => {
        resume();
      },
    }));

    return (
      <div className={className}>
        <span>{paddingTime(hours)}</span>:<span>{paddingTime(minutes)}</span>:
        <span>{paddingTime(seconds)}</span>
      </div>
    );
  }
);

export default Timer;
