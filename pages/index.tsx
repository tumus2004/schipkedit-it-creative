import React, { useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header/Header";
import { Showcase } from "../components/Showcase/Showcase";
import { LandingHeader } from "../components/LandingHeader/LandingHeader";

interface IndexProps {
  className?: string;
}

const Index: React.FC = ({ className }: IndexProps) => {
  useEffect(() => {
    const featuresEl: HTMLDivElement | null =
      document.querySelector(".showcase");
    const featureEls: NodeListOf<HTMLDivElement> =
      document.querySelectorAll(".item");

    if (featuresEl) {
      featuresEl.addEventListener("pointermove", (ev) => {
        featureEls.forEach((featureEl) => {
          const rect = featureEl.getBoundingClientRect();

          featureEl.style.setProperty(
            "--x",
            JSON.stringify(ev.clientX - rect.left)
          );
          featureEl.style.setProperty(
            "--y",
            JSON.stringify(ev.clientY - rect.top)
          );
        });
      });

      featuresEl.addEventListener("mouseleave", () => {
        featureEls.forEach((featureEl) => {
          featureEl.style.setProperty("--x", "-9999px");
          featureEl.style.setProperty("--y", "-9999px");
        });
      });
    }
  }, []);

  return (
    <div className="flex flex-col overflow-hidden relative h-screen">
      <Header />
      <main className="flex-1 w-full text-gray-300 px-6 md:px-8 lg:px-12 flex justify-center align-middle">
        <LandingHeader />
        {/* <Showcase /> */}
      </main>
    </div>
  );
};

export default Index;
