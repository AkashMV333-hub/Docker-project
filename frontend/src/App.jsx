import { useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";

function App() {
  const [word, setWord] = useState("");
  const [words, setWords] = useState([]);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchWords = async () => {
    try {
      const res = await axios.get(`${API_URL}/hello`);
      setWords(res.data.message || []);
    } catch {
      setError("Failed to fetch words");
    }
  };

  const submitWord = async () => {
    setError("");
    if (!word.trim()) return;

    const last = words[words.length - 1];
    if (last && last.text.slice(-1).toLowerCase() !== word[0].toLowerCase()) {
      setError("Your word must start with the last letter of the previous word!");
      return;
    }

    try {
      await axios.post(`${API_URL}/message`, { text: word });
      setWord("");
      fetchWords();
    } catch {
      setError("Failed to submit word");
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">🔗 Word Chain Game</h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-black">
        <input
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          value={word}
          placeholder="Enter next word..."
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitWord();
            }
          }}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={submitWord}
        >
          Submit Word
        </button>
      </div>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Current Chain:</h2>
        <div className="flex flex-wrap gap-2">
          {words.map((w, index) => (
            <span
              key={index}
              className="bg-white text-purple-700 font-bold px-4 py-2 rounded-full shadow-md"
            >
              {w.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;


