import React, { useEffect, useState } from 'react';

const ProgressBar = ({ task }) => {
  const { start_date, end_date } = task;

  const calculateProgress = () => {
    const currentDate = new Date();
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const totalDuration = endDate - startDate;

    const elapsedTime = currentDate - startDate;

    const progressPercentage = (elapsedTime / totalDuration) * 100;

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