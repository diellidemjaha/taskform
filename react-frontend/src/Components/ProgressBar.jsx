import React, { useEffect, useState } from 'react';

const ProgressBar = ({ task }) => {
  const { start_date, end_date } = task;

  const calculateProgress = () => {
    const currentDate = new Date();
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    // Calculate the total duration in milliseconds
    const totalDuration = endDate - startDate;

    // Calculate the elapsed time in milliseconds
    const elapsedTime = currentDate - startDate;

    // Calculate the percentage of elapsed time relative to the total duration
    const progressPercentage = (elapsedTime / totalDuration) * 100;

    // Ensure the progress percentage is within the 0-100 range
    return Math.min(100, Math.max(0, progressPercentage));
  };

  const [progress, setProgress] = useState(calculateProgress());

  useEffect(() => {
    // Recalculate progress when the component mounts
    setProgress(calculateProgress());

    // Optionally, you can update the progress periodically using a timer
    // const timer = setInterval(() => {
    //   setProgress(calculateProgress());
    // }, 1000);

    // Cleanup the timer when the component unmounts
    // return () => clearInterval(timer);
  }, [task]);

  return (
    <div className="progress" role="progressbar" aria-label="Secondary striped example" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
      <div className="progress-bar progress-bar-striped" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;