"use client";

import Reservation from "@/src/components/Reservation";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ReservationPage = () => {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return;
  }

  return (
    <>
      <Reservation theme={theme!} />
    </>
  );
};

export default ReservationPage;
