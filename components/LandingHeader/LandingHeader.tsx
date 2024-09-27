import React, { useEffect, useState } from "react";

export const LandingHeader: React.FC = () => {
  const [gradientPosition, setGradientPosition] = useState({
    x: "50%",
    y: "50%",
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;

      setGradientPosition({ x: `${x}%`, y: `${y}%` });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const gradientStyle = {
    backgroundImage: `radial-gradient(circle at ${gradientPosition.x} ${gradientPosition.y}, #1e3c72, #1e3c72, #2a5298, #4b63b0, #6b77c6, #898edc, #a7a7f2, #c3bdfe, #ebf1ff)`,
  };

  const paragraphStyle = {
    backgroundImage: `linear-gradient(120deg, #f6d365 0%, #00f7ffca 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.662)",
  };

  return (
    <section
      className="flex flex-col bottom-0 absolute px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 items-center gap-8 sm:gap-16 justify-start w-full text-center text-white"
      id="about"
    >
      <div className="h-full text-left leading-none flex flex-col justify-end pb-24 sm:pb-32">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold bg-clip-text text-transparent font-montserrat leading-none"
          style={{ ...gradientStyle, WebkitBackgroundClip: "text" }}
        >
          G&apos;day!
        </h1>
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black bg-clip-text text-transparent font-montserrat leading-none"
          style={{ ...gradientStyle, WebkitBackgroundClip: "text" }}
        >
          Name&apos;s Tom.
        </h1>
        <p
          className="text-left text-sm sm:text-base md:text-lg lg:text-xl pl-1 mx-auto"
          style={paragraphStyle}
        >
          I&apos;m a web developer with a passion for creating beautiful and
          responsive websites. With over 5 years of experience in various
          programming languages and frameworks, I can help bring your ideas to
          life.
        </p>
      </div>
    </section>
  );
};
