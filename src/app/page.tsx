"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Loading from "../components/Loading";
import Hero from "../components/Hero";
import Outlets from "../components/Outlets";
import MenuHome from "../components/MenuHome";
import TeamHome from "../components/TeamHome";
import ReviewsHome from "../components/ReviewsHome";
import Reservation from "../components/Reservation";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loading />;
  }

  return (
    <>
      <Hero theme={theme!} />
      <Outlets theme={theme!} />
      <MenuHome theme={theme!} />
      <TeamHome theme={theme!} />
      <ReviewsHome theme={theme!} />
      <Reservation theme={theme!} />
    </>
  );
}
