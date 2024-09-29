import React from "react";
import { parse } from "../lib/parser";

function App() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [text, setText] = React.useState("");
  const [result, setResult] = React.useState("");

  React.useEffect(() => {
    if (!iframeRef.current) {
      return;
    }

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
    if (import.meta.env.MANIFEST_VERSION === 2) {
    }

    const iframe = iframeRef.current;
    if (!iframe) {
      // manifest v2 には sandbox が無いため、parse 関数を直接呼び出すことができる
      parse(text, undefined).then((result) => {
        setResult(result as string);
      });

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
      {/* manifest v3 のみ sandbox が対応しているため、2では iframe は非表示にする */}
      {import.meta.env.MANIFEST_VERSION === 3 && (
        <iframe src="./sandbox.html" ref={iframeRef} />
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", height: "1pn00px" }}
      />
      <button onClick={handleClick}>Run Eval</button>

      <p>{result}</p>

      <button onClick={handleOptionClick}>Go to Options</button>
    </>
  );
}

export default App;
