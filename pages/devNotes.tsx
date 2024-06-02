import React from "react";

const DevNotes: React.FC = () => {
  const notesToRemember = [
    {
      id: "1",
      title: "Shit to remember for devving @ Jumbo",
      content: "cmd + shift + p, then Restart TS Server (same with ESLint etc)",
    },
  ];

  return (
    <div className="bg-center w-full h-screen bg-no-repeat bg-cover md:bg-fixed">
      {notesToRemember.map((notes) => (
        <>
          <div className="container mx-auto px-6" key={notes.id}>
            {notes.id}
          </div>
          <div className="container mx-auto px-6" key={notes.id}>
            {notes.title}
          </div>
          <div className="container mx-auto px-6" key={notes.id}>
            {notes.content}
          </div>
        </>
      ))}
    </div>
  );
};

export default DevNotes;
