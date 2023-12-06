import { SNACKBAR_DURATION, SNACKBAR_STATUS } from "@constants";
import { useState, useEffect } from "react";

const initialState = {
  message: "",
  status: "success" || "error",
};

const useSnackBar = () => {
  const [snackBarData, setSnackBarData] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);

  const showSnackBar = (message: string, status: SNACKBAR_STATUS) => {
    setSnackBarData({ message, status });
    setIsOpen(true);
  };

  const clearSnackBar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    if (isOpen) {
      timeoutId = setTimeout(() => {
        clearSnackBar();
      }, SNACKBAR_DURATION);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isOpen]);

  return {
    SnackBar: {
      isOpen,
      message: snackBarData.message,
      status: snackBarData.status,
    },
    showSnackBar,
    clearSnackBar,
  };
};

export default useSnackBar;
