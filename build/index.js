var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = {};
__export(entry_server_node_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  return userAgent ? "isbot" in isbotModule && typeof isbotModule.isbot == "function" ? isbotModule.isbot(userAgent) : "default" in isbotModule && typeof isbotModule.default == "function" ? isbotModule.default(userAgent) : !1 : !1;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.jsx
var root_exports = {};
__export(root_exports, {
  default: () => App
});
import { Links, Meta, Outlet, Scripts, Link } from "@remix-run/react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function App() {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx2("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx2("link", { rel: "icon", href: "data:image/x-icon;base64,AA" }),
      /* @__PURE__ */ jsx2("title", { children: "Form Builder" }),
      /* @__PURE__ */ jsx2(Meta, {}),
      /* @__PURE__ */ jsx2(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "bg-gray-50", children: [
      /* @__PURE__ */ jsx2("header", { className: "bg-green-600 text-white p-4 shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex justify-between items-center", children: [
        /* @__PURE__ */ jsx2("h1", { className: "text-xl font-bold", children: "Hypergro.ai Form Builder" }),
        /* @__PURE__ */ jsx2("nav", { children: /* @__PURE__ */ jsx2("ul", { className: "flex space-x-4", children: /* @__PURE__ */ jsx2("li", { children: /* @__PURE__ */ jsx2(Link, { to: "/builder", className: "hover:underline", children: "Builder" }) }) }) })
      ] }) }),
      /* @__PURE__ */ jsx2("main", { className: "h-[calc(100vh-64px)]", children: /* @__PURE__ */ jsx2(Outlet, {}) }),
      /* @__PURE__ */ jsx2(Scripts, {})
    ] })
  ] });
}

// app/routes/builder.jsx
var builder_exports = {};
__export(builder_exports, {
  default: () => FormBuilder
});
import "react";

// app/components/Sidebar.jsx
import "react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var FIELD_TYPES = [
  { id: "text", label: "Text Field" },
  { id: "textarea", label: "Text Area" },
  { id: "dropdown", label: "Dropdown" },
  { id: "checkbox", label: "Checkbox" },
  { id: "radio", label: "Radio Button" },
  { id: "date", label: "Date Picker" },
  { id: "file", label: "File Upload" }
];
function Sidebar() {
  let onDragStart = (event, fieldType) => {
    event.dataTransfer.setData("fieldType", fieldType), event.dataTransfer.effectAllowed = "copy";
  };
  return /* @__PURE__ */ jsxs2("div", { className: "w-64 bg-blue-100 p-4 border-r border-blue-200 h-full overflow-auto", children: [
    /* @__PURE__ */ jsx3("h2", { className: "text-lg font-semibold mb-4", children: "Form Elements" }),
    /* @__PURE__ */ jsx3("div", { className: "space-y-2", children: FIELD_TYPES.map((field) => /* @__PURE__ */ jsxs2(
      "div",
      {
        className: "bg-blue p-3 rounded border border-gray-300 cursor-move flex items-center shadow-sm hover:shadow-md transition-shadow",
        draggable: !0,
        onDragStart: (e) => onDragStart(e, field.id),
        children: [
          /* @__PURE__ */ jsx3("span", { className: "mr-2 text-xl", children: field.icon }),
          /* @__PURE__ */ jsx3("span", { children: field.label })
        ]
      },
      field.id
    )) })
  ] });
}

// app/components/FormCanvas.jsx
import { useState } from "react";

// app/components/FormField.jsx
import "react";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function FormField({ field }) {
  let { type, label, placeholder, required } = field;
  return /* @__PURE__ */ jsxs3("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsxs3("label", { className: "block mb-2 font-medium", children: [
      label,
      required && /* @__PURE__ */ jsx4("span", { className: "text-red-500 ml-1", children: "*" })
    ] }),
    (() => {
      switch (type) {
        case "text":
          return /* @__PURE__ */ jsx4(
            "input",
            {
              type: "text",
              className: "w-full px-5 py-3 border rounded-md",
              placeholder,
              required
            }
          );
        case "textarea":
          return /* @__PURE__ */ jsx4(
            "textarea",
            {
              className: "w-full px-5 py-3 border rounded-md",
              rows: "3",
              placeholder,
              required
            }
          );
        case "dropdown":
          return /* @__PURE__ */ jsxs3(
            "select",
            {
              className: "w-full px-5 py-3 border rounded-md",
              required,
              children: [
                /* @__PURE__ */ jsx4("option", { value: "", children: "Select an option" }),
                /* @__PURE__ */ jsx4("option", { value: "option1", children: "Option 1" }),
                /* @__PURE__ */ jsx4("option", { value: "option2", children: "Option 2" }),
                /* @__PURE__ */ jsx4("option", { value: "option3", children: "Option 3" })
              ]
            }
          );
        case "checkbox":
          return /* @__PURE__ */ jsxs3("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx4(
              "input",
              {
                type: "checkbox",
                id: field.id,
                className: "mr-2"
              }
            ),
            /* @__PURE__ */ jsx4("label", { htmlFor: field.id, children: placeholder })
          ] });
        case "radio":
          return /* @__PURE__ */ jsx4("div", { className: "space-y-2", children: ["Option 1", "Option 2", "Option 3"].map((option, index) => /* @__PURE__ */ jsxs3("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx4(
              "input",
              {
                type: "radio",
                id: `${field.id}-${index}`,
                name: field.id,
                className: "mr-2"
              }
            ),
            /* @__PURE__ */ jsx4("label", { htmlFor: `${field.id}-${index}`, children: option })
          ] }, index)) });
        case "date":
          return /* @__PURE__ */ jsx4(
            "input",
            {
              type: "date",
              className: "w-full px-3 py-2 border rounded-md",
              required
            }
          );
        case "file":
          return /* @__PURE__ */ jsx4(
            "input",
            {
              type: "file",
              className: "w-full px-3 py-2",
              required
            }
          );
        default:
          return /* @__PURE__ */ jsxs3("p", { children: [
            "Unknown field type: ",
            type
          ] });
      }
    })()
  ] });
}

// app/components/FormCanvas.jsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function FormCanvas() {
  let [fields, setFields] = useState([]);
  return /* @__PURE__ */ jsx5(
    "div",
    {
      className: "flex-1 p-6 bg-black border border-dashed border-gray-300 min-h-screen",
      onDragOver: (event) => {
        event.preventDefault(), event.dataTransfer.dropEffect = "copy";
      },
      onDrop: (event) => {
        event.preventDefault();
        let fieldType = event.dataTransfer.getData("fieldType");
        if (fieldType) {
          let newField = {
            id: `field-${Date.now()}`,
            type: fieldType,
            label: `New ${fieldType} field`,
            placeholder: `Enter ${fieldType}...`,
            required: !1
          };
          setFields([...fields, newField]);
        }
      },
      children: fields.length === 0 ? /* @__PURE__ */ jsx5("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsx5("p", { className: "text-gray-400 text-lg", children: "Drag here" }) }) : /* @__PURE__ */ jsxs4("div", { className: "space-y-6 max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsx5("h2", { className: "text-xl font-semibold pb-2 border-b", children: "Form Preview" }),
        /* @__PURE__ */ jsx5("form", { className: "space-y-4", children: fields.map((field) => /* @__PURE__ */ jsxs4("div", { className: "p-4 border rounded-md bg-gray-50 hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx5(FormField, { field }),
          /* @__PURE__ */ jsxs4("div", { className: "flex justify-end mt-2 space-x-2", children: [
            /* @__PURE__ */ jsx5(
              "button",
              {
                type: "button",
                className: "px-2 py-1 text-xs bg-green-100 text-black-700 rounded hover:bg-green-200",
                onClick: () => {
                  alert(`Edit settings for ${field.label}`);
                },
                children: "Edit"
              }
            ),
            /* @__PURE__ */ jsx5(
              "button",
              {
                type: "button",
                className: "px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200",
                onClick: () => {
                  setFields(fields.filter((f) => f.id !== field.id));
                },
                children: "Remove"
              }
            )
          ] })
        ] }, field.id)) })
      ] })
    }
  );
}

// app/routes/builder.jsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function FormBuilder() {
  return /* @__PURE__ */ jsxs5("div", { className: "flex h-full overflow-hidden", children: [
    /* @__PURE__ */ jsx6(Sidebar, {}),
    /* @__PURE__ */ jsx6(FormCanvas, {})
  ] });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-6UFIZELL.js", imports: ["/build/_shared/chunk-XKOPZ3VR.js", "/build/_shared/chunk-MFPRU5OA.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-3EVAIEFF.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/builder": { id: "routes/builder", parentId: "root", path: "builder", index: void 0, caseSensitive: void 0, module: "/build/routes/builder-6HWLC2A6.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "1167e00b", hmr: void 0, url: "/build/manifest-1167E00B.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public\\build", future = { v3_fetcherPersist: !0, v3_relativeSplatPath: !0, v3_throwAbortReason: !0, v3_routeConfig: !1, v3_singleFetch: !0, v3_lazyRouteDiscovery: !0, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_node_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/builder": {
    id: "routes/builder",
    parentId: "root",
    path: "builder",
    index: void 0,
    caseSensitive: void 0,
    module: builder_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
