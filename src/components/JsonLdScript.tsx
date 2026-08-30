import React from 'react';

interface JsonLdScriptProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: Record<string, any> | null;
  id?: string;
}

export default function JsonLdScript({ schema, id }: JsonLdScriptProps) {
  if (!schema) return null;

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
