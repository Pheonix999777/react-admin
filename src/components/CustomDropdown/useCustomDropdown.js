import { useEffect, useState } from "react";

export const useCustomDropdown = () => {
  const [isOpen, setOpen] = useState(false);
  const [innerValue, setInnerValue] = useState(null);

  const handleToggle = () => setOpen(prev => !prev);
  const handleClose = () => setOpen(false);

  const handleChange = (option) => setInnerValue(option);

  const handleWindowClick = (e) => {
    if (!e.target.closest("[data-name='custom-dropdown']")) {
      handleClose();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
    // eslint-disable-next-line
  }, []);

  return {
    isOpen,
    handleToggle,
    handleClose,
    innerValue,
    handleChange,
  };
};
