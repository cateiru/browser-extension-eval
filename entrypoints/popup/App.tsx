import React from "react";

function App() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [text, setText] = React.useState("");
  const [result, setResult] = React.useState("");

  React.useEffect(() => {
    const listener = (event: MessageEvent) => {
      const data = event.data;
      if (data.type !== "sandbox-eval-result") {
        return;
      }

      setResult(data.result);
    };

    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);

  const handleClick = () => {
    const iframe = iframeRef.current;
    if (!iframe) {
      return;
    }

    iframe.contentWindow?.postMessage(
      {
        type: "sandbox-eval",
        code: text,
        args: undefined,
      },
      "*"
    );
  };

  const handleOptionClick = () => {
    if (browser.runtime.openOptionsPage) {
      browser.runtime.openOptionsPage();
    }
  };

  return (
    <>
      <iframe src="./sandbox.html" ref={iframeRef} />

      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleClick}>Run Eval</button>

      <p>{result}</p>

      <button onClick={handleOptionClick}>Go to Options</button>
    </>
  );
}

export default App;
