"use client";

export const ConfigPreview = ({ configuration }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Configuration Preview</h3>
      <pre className="p-4 bg-secondary/50 rounded-lg overflow-auto max-h-[400px]">
        <code className="text-sm">
          {JSON.stringify(configuration, null, 2)}
        </code>
      </pre>
    </div>
  );
};
