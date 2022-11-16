import { useEffect, useState } from "react";
import "./App.css";
import { sampleText } from "./sampleText";
import { marked } from "marked";

function App() {
  const [text, setText] = useState(sampleText);

  const handleChange = (event) => {
    const text = event.target.value;
    setText(text);
  };

  const renderText = (text) => marked(text, { sanitize: true });
  useEffect(() => {
    console.log("I have been mounted");
    const text = localStorage.getItem("text");
    setText(text);
  }, []);

  useEffect(() => {
    console.log("I will only run if my deps change: ");
    localStorage.setItem("text", text);
  }, [text]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <textarea
            onChange={handleChange}
            value={text}
            className="form-control"
            rows="35"
          >
            {sampleText}
          </textarea>
        </div>
        <div className="col-sm-6">
          <div dangerouslySetInnerHTML={{ __html: renderText(text) }} />
        </div>
      </div>
    </div>
  );
}

export default App;
