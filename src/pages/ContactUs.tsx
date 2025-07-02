// src/pages/ContactUs.tsx

import { useState } from "react";
import { toast } from "react-hot-toast";
import { db } from "../components/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const ContactUs = () => {
  const [selectedOption, setSelectedOption] = useState<"feedback" | "complaint">("feedback");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(
        collection(db, selectedOption === "feedback" ? "feedbacks" : "complaints"),
        {
          name,
          email,
          message,
          type: selectedOption,
          createdAt: serverTimestamp(),
        }
      );

      toast.success(
        selectedOption === "feedback"
          ? "Feedback submitted successfully!"
          : "Complaint submitted successfully!"
      );

      // Clear fields after submission
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting:", error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Share your {selectedOption === "feedback" ? "feedback" : "complaints"} with us. We value your input.
        </p>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setSelectedOption("feedback")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              selectedOption === "feedback"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700"
            }`}
          >
            Customer Feedback
          </button>
          <button
            type="button"
            onClick={() => setSelectedOption("complaint")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              selectedOption === "complaint"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700"
            }`}
          >
            Customer Complaints
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-800 dark:text-gray-100"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-800 dark:text-gray-100"
          />
          <textarea
            placeholder={
              selectedOption === "feedback"
                ? "Share your feedback with us..."
                : "Describe your complaint..."
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-800 dark:text-gray-100 resize-none"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Submitting..."
              : `Submit ${selectedOption === "feedback" ? "Feedback" : "Complaint"}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
