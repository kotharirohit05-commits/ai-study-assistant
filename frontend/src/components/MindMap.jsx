import { useState } from "react";

function MindMapNode({ node, level = 0 }) {
  const [expanded, setExpanded] = useState(true);

  const hasChildren = node.children && node.children.length > 0;

  const nodeStyle =
    level === 0
      ? "border-indigo-300 bg-indigo-600 text-white shadow-lg shadow-indigo-200"
      : level === 1
      ? "border-purple-200 bg-purple-50 text-purple-900"
      : "border-slate-200 bg-white text-slate-700";

  return (
    <div className="flex flex-col items-center">
      {/* Node */}
      <button
        type="button"
        onClick={() => {
          if (hasChildren) {
            setExpanded((previous) => !previous);
          }
        }}
        className={`group relative max-w-55 rounded-2xl border px-5 py-3 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${nodeStyle}`}
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-semibold sm:text-base">
            {node.title}
          </span>

          {hasChildren && (
            <span
              className={`text-xs transition-transform duration-200 ${
                expanded ? "rotate-90" : ""
              }`}
            >
              ▶
            </span>
          )}
        </div>
      </button>

      {/* Children */}
      {hasChildren && expanded && (
        <>
          {/* Vertical line from parent */}
          <div className="h-7 w-px bg-slate-300" />

          <div className="relative flex flex-wrap justify-center gap-x-6 gap-y-6">
            {node.children.map((child, index) => (
              <div
                key={`${child.title}-${index}`}
                className="relative flex flex-col items-center"
              >
                <MindMapNode node={child} level={level + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function MindMap({ mindMap }) {
  if (!mindMap) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-6 sm:px-8">
        <div className="flex items-center justify-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
            🧠
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
              Mind Map
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Explore the key concepts visually.
            </p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="overflow-x-auto bg-slate-50 p-6 sm:p-10 dark:bg-slate-900">
        <div className="flex min-w-max justify-center">
          <MindMapNode
            node={{
              title: mindMap.topic,
              children: mindMap.children,
            }}
          />
        </div>
      </div>

      {/* Footer hint */}
      <div className="border-t border-slate-100 px-5 py-4 text-center">
        <p className="text-xs text-slate-400">
          Click a concept to expand or collapse its branches.
        </p>
      </div>
    </section>
  );
}

export default MindMap;