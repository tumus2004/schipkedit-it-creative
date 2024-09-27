import Link from "next/link";

export const Showcase = () => {
  return (
    <section className="mb-24 md:mb-0 w-full mt-16" id="projects">
      <div className="h-screen mt-4 bg-gradient-to-br">
        <div className="showcase">
          <Link href="/solarSystem" className="item" id="item">
            <div className="item-content">
              <h3 className="text-lg font-semibold text-white">Solar System</h3>
              <p className="mt-2 text-sm">
                Three.js project that displays the solar system. It features a
                dynamic camera, planet stats, and a speed slider, along with
                real time planet rotation and revolution controls. The planet
                location is based on real NASA data, and the planet rotation and
                logarithmic orbit are based on real physics.
              </p>
            </div>
          </Link>
          <div className="item">
            <div className="item-content">
              <h3 className="text-lg font-semibold text-white">
                Blog Platform
              </h3>
              <p className="mt-2 text-sm">
                A dynamic blogging platform developed using React (Typescript),
                HTML and Tailwind. It supports user authentication, post
                creation, image upload and display with a responsive design.
              </p>
            </div>
          </div>
          <div className="item">
            <div className="item-content">
              <h3 className="text-lg font-semibold text-white">Weather App</h3>
              <p className="mt-2 text-sm">
                A weather forecasting app built with Next.js. It uses the
                OpenWeatherMap API to fetch and display weather data based on
                user&apos;s location.
              </p>
            </div>
          </div>
          <div className="item">
            <div className="item-content">
              <h3 className="text-lg font-semibold text-white">
                Task Manager App
              </h3>
              <p className="mt-2 text-sm">
                A task management application created with React. It allows
                users to create, update, and organize tasks effectively.
              </p>
            </div>
          </div>
          <div className="item">
            <div className="item-content">
              <h3 className="text-lg font-semibold text-white">
                Restaurant Reservation System
              </h3>
              <p className="mt-2 text-sm">
                A restaurant reservation system developed using Next.js, python
                for the backend and React. It features real-time availability
                updates and email notifications.
              </p>
            </div>
          </div>
          <div className="item">
            <div className="item-content">
              <h3 className="text-lg font-semibold text-white">JB HiFi</h3>
              <p className="mt-2 text-sm">
                Australia&apos;s leading retail electronics brand and one of the
                most widely used e-commerce sites in Australia, and the world.
                Using liquid (old-school shopify) but fully customised into a
                React environment with CSS-in-JS, styled components and using
                various technology stacks at an enterprise level, this was an
                incredible experience to be a part of.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
