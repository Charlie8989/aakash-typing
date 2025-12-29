import React from "react";
import Card from "../_components/Card";

const exams = [
  {
    id: 1,
    name: "Typing Beginner",
    createdAt: "12 Sep 2025",
    words: 200,
    time: 2,
  },
  {
    id: 2,
    name: "Intermediate Test",
    createdAt: "18 Sep 2025",
    words: 350,
    time: 3,
  },
  {
    id: 3,
    name: "Pro Speed Test",
    createdAt: "22 Sep 2025",
    words: 500,
    time: 5,
  },
  {
    id: 2,
    name: "Intermediate Test",
    createdAt: "18 Sep 2025",
    words: 350,
    time: 3,
  },{
    id: 2,
    name: "Intermediate Test",
    createdAt: "18 Sep 2025",
    words: 350,
    time: 3,
  },{
    id: 2,
    name: "Intermediate Test",
    createdAt: "18 Sep 2025",
    words: 350,
    time: 3,
  },{
    id: 2,
    name: "Intermediate Test",
    createdAt: "18 Sep 2025",
    words: 350,
    time: 3,
  },
];

const ExamsPage = () => {
  return (
    <section className="px-6 md:px-16 py-10">
      <h1 className="text-3xl font-bold mb-8">Available Exams</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {exams.map((exam) => (
          <Card
            key={exam.id}
            name={exam.name}
            createdAt={exam.createdAt}
            words={exam.words}
            time={exam.time}
          />
        ))}
      </div>
    </section>
  );
};

export default ExamsPage;
