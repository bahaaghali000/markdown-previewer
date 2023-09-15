import "./App.css";
import React, { useState } from "react";
import { marked } from "marked";

import { docs } from "./markdownDocs";

const App = () => {
  const [code, setCode] = useState("## Hello");
  const [compiled, setCompiled] = useState('<h2 id="hello">Hello</h2>');

  const [hide, setHide] = useState({
    isMarkDown: true,
    isPreview: false,
    isDocs: false,
  });

  const openMD = () => {
    console.log(0);
    setHide({
      isMarkDown: true,
      isPreview: false,
      isDocs: false,
    });
  };

  const openPreview = () => {
    setHide({
      isMarkDown: false,
      isPreview: true,
      isDocs: false,
    });
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setCompiled(marked.parse(e.target.value));
  };

  const openDocs = () => {
    setHide({
      isMarkDown: false,
      isPreview: false,
      isDocs: true,
    });
  };

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={openMD} className={hide.isMarkDown ? "active" : ""}>
            MarkDown
          </button>
          <button
            onClick={openPreview}
            className={hide.isPreview ? "active" : ""}
          >
            Preview
          </button>
          <button onClick={openDocs} className={hide.isDocs ? "active" : ""}>
            Docs
          </button>
        </div>

        {hide.isDocs ? (
          <div className="docs">
            {docs.map((item, index) => (
              <div key={index} className="doc">
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                {item.examples.map((example, index) => (
                  <div key={`example${index}`} className="doc-example">
                    <h3>Example {index + 1}</h3>
                    <h5>-Markdown</h5>
                    <p>{example.markdown}</p>
                    <h5>-html</h5>
                    <p>{example.html}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : hide.isMarkDown ? (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        ) : (
          <div>
            <textarea value={compiled} />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
