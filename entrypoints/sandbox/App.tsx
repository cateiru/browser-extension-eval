import React from "react";
import { parse } from "./parser";

export const App = () => {
  React.useEffect(() => {
    const listener = (event: MessageEvent) => {
      const data = event.data;
      if (data.type !== "sandbox-eval") {
        return;
      }

      console.log(JSON.stringify(data, null, 2));

      parse(data.code, data.args)
        .then((result) => {
          event.source?.postMessage(
            {
              type: "sandbox-eval-result",
              result,
            },
            {
              targetOrigin: event.origin,
            }
          );
        })
        .catch((e) => {
          console.error(e);
        });
    };

    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);

  return <p>Sandbox</p>;
};
