/**
 * Renders a schema.org payload as a JSON-LD script tag.
 *
 * Per the Next.js JSON-LD guide, structured data belongs in a native <script>
 * rather than next/script (it is data, not executable code). `<` is escaped to
 * its unicode form so a stray HTML tag inside any string value cannot close the
 * script element early and open an XSS hole.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
