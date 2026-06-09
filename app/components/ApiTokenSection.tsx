"use client";

import { useState, useTransition } from "react";
import { createApiToken } from "../actions/users";

export default function ApiTokenSection({
  initialToken,
}: {
  initialToken: string | null;
}) {
  const [token, setToken] = useState(initialToken);
  const [isPending, startTransition] = useTransition();

  return (
    <div
      data-testid="api-token-section"
      className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm"
    >
      <div className="mb-4 grid gap-2">
        <h2 className="text-2xl font-black text-stone-900">API token</h2>
        <p className="text-stone-600">
          Use this token to call the protected <code>/api/me</code> endpoint.
        </p>
      </div>
      {token ? (
        <div
          data-testid="token-display"
          className="mb-4 rounded-2xl bg-stone-100 px-4 py-3 font-mono text-sm text-stone-700"
        >
          <code data-testid="api-token">{token}</code>
        </div>
      ) : (
        <p
          data-testid="no-token-message"
          className="mb-4 rounded-2xl bg-stone-100 px-4 py-3 font-mono text-sm text-stone-700"
        >
          No token generated yet.
        </p>
      )}
      <button
        type="button"
        data-testid="generate-token-button"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const nextToken = await createApiToken();
            setToken(nextToken);
          });
        }}
        className="rounded-full bg-stone-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-500"
      >
        {isPending ? "Generating..." : "Generate new token"}
      </button>
    </div>
  );
}
