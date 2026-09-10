import assert from "node:assert/strict";
import test from "node:test";

import { fetchAsDataUrl } from "../lib/services/image.service.ts";

test("fetchAsDataUrl converts an image response without FileReader", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
        new Response(new Uint8Array([82, 79, 79, 77]), {
            status: 200,
            headers: { "content-type": "image/png" },
        });

    try {
        assert.equal(typeof FileReader, "undefined");
        const dataUrl = await fetchAsDataUrl("https://example.com/plan.png");
        assert.equal(dataUrl, "data:image/png;base64,Uk9PTQ==");
    } finally {
        globalThis.fetch = originalFetch;
    }
});

test("fetchAsDataUrl rejects failed responses", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => new Response(null, { status: 502 });

    try {
        await assert.rejects(
            fetchAsDataUrl("https://example.com/plan.png"),
            /Failed to fetch image: 502/,
        );
    } finally {
        globalThis.fetch = originalFetch;
    }
});
