import { useState } from "react";
import ReactMarkdown from "react-markdown";
function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const generateAns = async () => {
    setAnswer("Loading answer...");
    setGeneratingAnswer(true);
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCaCoUP1elbNyV4REYq8m8tVzJ66gwG12U",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contents: [{ parts: [{ text: question }] }] }),
        }
      );
      const result = await response.json();
      setAnswer(result.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error(error);
    }
    setGeneratingAnswer(false);
  };

  return (
    <div className="mt-7">
      <h1 className="text-4 font-bold text-center">Chat-Bot</h1>
      <div className="h-[30vh] w-[80%]  m-auto mt-6 mb-6">
        <textarea
          value={question}
          className="border-2 min-h-full w-[100%] p-2 border-indigo-300/100 focus:border-sky-500"
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
      </div>
      <div className="w-[80%] m-auto h-[50px]">
        <button
          className={`float-right border-2 border-indigo-300 hover:bg-indigo-200 hover:border-0 ${
            generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={generateAns}
        >
          Generate Answer
        </button>
      </div>
     {answer && <div className="w-[80%] m-auto mt-8 bg-blue-100">
        <ReactMarkdown className="p-4">{answer}</ReactMarkdown>
      </div>}
    </div>
  );
}

export default App;
