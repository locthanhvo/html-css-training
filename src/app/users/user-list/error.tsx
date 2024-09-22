'use client';

import { useEffect } from 'react';

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center mt-[177px] sm:mt-14 lg:mt-52 mb-7.5">
      <h1 className="text-secondary-100 font-medium text-[162px] sm:text-[192px]">
        Error
      </h1>
      <p className="text-sm text-dark-100 text-center mt-2">
        Oops! Something went wrong we&apos;re sorry, but it looks like
        we&apos;ve hit a snag.
      </p>
      <p className="text-sm text-dark-100 text-center mb-[85px] lg:mb-44">
        The page you were trying to reach is currently unavailable.
      </p>
      <button className="mb-[291px] sm:mb-16" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
};

export default GlobalError;
