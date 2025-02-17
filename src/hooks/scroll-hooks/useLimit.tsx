import { useState } from "react";

const useLimit = () => {
  const limitDenominator = window.innerWidth > 440 ? 440 : window.innerWidth;

  const limitDefault =
    window?.innerWidth > 440
      ? Math.floor(window.innerWidth / limitDenominator) * 2
      : 3;

  const [limit, setLimit] = useState<number>(limitDefault);
  const [isLimit, setIsLimit] = useState<boolean>(false);

  const handleLimit = () => {
    if (limit >= 17) return;
    setIsLimit(true);
    const extraBooks =
      limitDefault === limit
        ? Math.floor(window.innerWidth / limitDenominator) + 1
        : Math.floor(window.innerWidth / limitDenominator);
    setLimit((n) => n + extraBooks);
  };

  return { handleLimit, limit, isLimit, setIsLimit, setLimit };
};

export default useLimit;
