"use client";
import React from "react";
import Card from "../_components/Card";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CardSkeleton from "../_components/CardSkeleton";

const ExamsPage = () => {
  const exams = useQuery(api.exams.getExams);
 

  return (
    <section className="px-6 md:px-16 py-10 min-h-[55vh]">
      <h1 className="text-3xl font-bold mb-8">Available Exams</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {!exams
          ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
          : exams.map((exam) => (
              <Card
                key={exam._id}
                name={exam.examName}
                keys={exam.keys}
                time={exam.time}
                examId={exam._id}
              />
            ))}
      </div>
    </section>
  );
};

export default ExamsPage;
