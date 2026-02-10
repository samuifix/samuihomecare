import type { PostBlock } from "@/lib/types";

function getBlockText(block: PostBlock): string {
  const children = block.children as { _type?: string; text?: string }[] | undefined;
  if (!Array.isArray(children)) return "";
  return children.map((c) => (c && typeof c.text === "string" ? c.text : "")).join("");
}

export function PortableText({ value }: { value: PostBlock[] }) {
  if (!Array.isArray(value) || value.length === 0) return null;

  return (
    <div className="space-y-4">
      {value.map((block, i) => {
        if (block._type === "block") {
          const text = getBlockText(block);
          const style = (block as { style?: string }).style ?? "normal";
          if (style === "h1") return <h2 key={i} className="text-2xl font-bold text-slate-900 mt-6 mb-2">{text}</h2>;
          if (style === "h2") return <h3 key={i} className="text-xl font-bold text-slate-900 mt-4 mb-2">{text}</h3>;
          if (style === "h3") return <h4 key={i} className="text-lg font-semibold text-slate-900 mt-3 mb-1">{text}</h4>;
          if (!text) return null;
          return <p key={i} className="text-slate-700 leading-relaxed">{text}</p>;
        }
        if (block._type === "image") {
          const imageBlock = block as unknown as { imageUrl?: string; alt?: string };
          if (!imageBlock.imageUrl) return null;
          const url = imageBlock.imageUrl;
          const alt = imageBlock.alt ?? "";
          return (
            <figure key={i} className="my-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={alt} className="rounded-lg w-full max-w-full h-auto" loading="lazy" />
            </figure>
          );
        }
        return null;
      })}
    </div>
  );
}
