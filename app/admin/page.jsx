"use client";
import { useState,useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const AdminPage = () => {
  const addExam = useMutation(api.exams.addExam);
  const deleteExam = useMutation(api.exams.deleteExam);
  const exams = useQuery(api.exams.getExams);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");

  const [form, setForm] = useState({
    examName: "",
    keys: "",
    paragraph: "",
    time: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (
      !form.examName.trim() ||
      !form.paragraph.trim() ||
      !form.keys ||
      !form.time
    )
      return;

    await addExam({
      examName: form.examName.trim(),
      keys: form.keys,
      paragraph: form.paragraph.trim(),
      time: form.time,
      createdAt: new Date().toISOString(),
    });

    setForm({
      examName: "",
      keys: "",
      paragraph: "",
      time: "",
    });
  };

  const handleLogin = () => {
    if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      setIsAdmin(true);
    } else {
      alert("Wrong email");
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200">
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-[90%] max-w-sm">
          <h2 className="text-lg font-semibold text-purple-700 text-center">
            Admin Access
          </h2>

          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 text-white py-2 rounded"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3ff] via-white to-[#ede9fe] px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* FORM */}
        <div className="bg-white/80 backdrop-blur-md border border-purple-200 rounded-2xl shadow-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-purple-700">Add New Exam</h2>

          <input
            type="text"
            placeholder="Exam Name"
            value={form.examName}
            onChange={(e) => handleChange("examName", e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Keys"
            value={form.keys}
            onChange={(e) => handleChange("keys", e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Time (like this 5:00)"
            value={form.time}
            onChange={(e) => handleChange("time", e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            placeholder="Paragraph"
            value={form.paragraph}
            onChange={(e) => handleChange("paragraph", e.target.value)}
            className="w-full border p-3 rounded-lg min-h-[120px]"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white py-2 rounded-lg"
          >
            Add Exam
          </button>
        </div>

        {/* HISTORY */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {!exams ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="border rounded-lg p-3 flex justify-between items-center animate-pulse"
              >
                <div className="space-y-2 w-full">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            ))
          ) : exams.length === 0 ? (
            <p className="text-gray-500">No exams found</p>
          ) : (
            exams.map((exam) => (
              <div
                key={exam._id}
                className="border rounded-lg p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-purple-700">
                    {exam.examName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {exam.tag} | Keys: {exam.keys} | Time: {exam.time} min
                  </p>
                </div>

                <button
                  onClick={() => setDeleteId(exam._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
        {deleteId && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl space-y-4 w-[90%] max-w-sm">
              <h3 className="font-semibold text-lg text-red-500">
                Confirm Deletion
              </h3>

              <input
                type="email"
                placeholder="Enter admin email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (confirmEmail !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
                      alert("Wrong email");
                      return;
                    }

                    deleteExam({ id: deleteId });
                    setDeleteId(null);
                    setConfirmEmail("");
                  }}
                  className="flex-1 bg-red-500 text-white py-2 rounded"
                >
                  Confirm
                </button>

                <button
                  onClick={() => {
                    setDeleteId(null);
                    setConfirmEmail("");
                  }}
                  className="flex-1 bg-gray-300 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
