import { useState } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown"
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
    <>
      <h1 className="text-12xl font-bold">Chat-Bot</h1>
      <div className="h-[200px] mt-6 mb-6">
    
        <textarea
          value={question} className="border-2 h-[150px] w-full p-2 border-indigo-300/100"
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
      </div >
      <button onClick={generateAns} disabled={generatingAnswer ? true : false}>
        Generate Answer
      </button>
      <div>
      <ReactMarkdown className="p-4">{answer}</ReactMarkdown>
      </div>
    </>
  );
}

export default App;
