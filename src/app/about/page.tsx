"use client";

import TeamHome from "@/src/components/TeamHome";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const AboutUsPage = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return;
  }
  return <TeamHome theme={theme!} />;
};

export default AboutUsPage;
