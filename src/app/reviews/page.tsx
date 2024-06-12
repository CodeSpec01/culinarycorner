"use client";

import ReviewsHome from "@/src/components/ReviewsHome";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ReviewPage = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return;
  }
  return <ReviewsHome theme={theme!} />;
};

export default ReviewPage;
