# Sample of eval for manifest v2 and v3

This repository is an example of how to run eval on a browser extension created using the [WXT](https://wxt.dev/) framework.

Eval normally requires `content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self';"`[^1].

Also, manifest v3 requires that you run in a sandbox, which is not supported in v2.

## Structure

WXT allows you to separate settings for each manifest version in [`wxt.config.ts`](./wxt.config.ts). I use this to separate settings for v2 and v3.

```ts
manifest: (config) => {
    const contentSecurityPolicy =
        config.manifestVersion === 3
        ? {
            sandbox: "sandbox allow-scripts; script-src 'self' 'unsafe-eval';",
            }
        : "script-src 'self' 'unsafe-eval'; object-src 'self';";

    return {
        content_security_policy: contentSecurityPolicy,
    };
},
```

and the sandbox iframes are also displayed differently depending on the manifest version.

```tsx
{import.meta.env.MANIFEST_VERSION === 3 && (
    <iframe src="./sandbox.html" ref={iframeRef} />
)}
```

## LICENSE

[MIT](./LICENSE)


[^1]: [content_security_policy - Mozilla | MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/content_security_policy)
[^2]: [Use eval() in sandboxed iframes  |  Chrome Extensions  |  Chrome for Developers](https://developer.chrome.com/docs/extensions/how-to/security/sandboxing-eval)
