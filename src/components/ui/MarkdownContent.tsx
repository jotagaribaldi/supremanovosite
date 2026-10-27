"use client";

import React from "react";

interface MarkdownContentProps {
  content: string;
}

const elementStyles: Record<string, React.CSSProperties> = {
  h1: { fontSize: "2.25rem", fontWeight: "700", marginTop: "2rem", marginBottom: "1rem", lineHeight: "1.2" },
  h2: { fontSize: "1.875rem", fontWeight: "700", marginTop: "2rem", marginBottom: "1rem", lineHeight: "1.3" },
  h3: { fontSize: "1.5rem", fontWeight: "600", marginTop: "1.5rem", marginBottom: "0.75rem", lineHeight: "1.4" },
  h4: { fontSize: "1.25rem", fontWeight: "600", marginTop: "1.5rem", marginBottom: "0.75rem", lineHeight: "1.4" },
  p: { marginBottom: "1rem", lineHeight: "1.75" },
  ul: { marginBottom: "1rem", paddingLeft: "1.5rem", listStyleType: "disc" },
  ol: { marginBottom: "1rem", paddingLeft: "1.5rem", listStyleType: "decimal" },
  li: { marginBottom: "0.5rem", lineHeight: "1.75" },
  blockquote: { borderLeftWidth: "4px", borderLeftColor: "hsl(var(--primary))", paddingLeft: "1rem", marginLeft: "0", marginRight: "0", marginTop: "1rem", marginBottom: "1rem", fontStyle: "italic", color: "hsl(var(--muted-foreground))" },
  code: { fontFamily: "monospace", fontSize: "0.875em", backgroundColor: "hsl(var(--muted))", padding: "0.125rem 0.375rem", borderRadius: "0.25rem" },
  pre: { backgroundColor: "hsl(var(--muted))", borderRadius: "0.5rem", padding: "1rem", overflowX: "auto", marginBottom: "1rem" },
  a: { color: "hsl(var(--primary))", textDecoration: "underline", textUnderlineOffset: "2px" },
  strong: { fontWeight: "600" },
  em: { fontStyle: "italic" },
  hr: { borderTopWidth: "1px", borderColor: "hsl(var(--border))", marginTop: "2rem", marginBottom: "2rem" },
  table: { width: "100%", borderCollapse: "collapse", marginBottom: "1rem", fontSize: "0.875rem" },
  th: { borderBottomWidth: "2px", borderColor: "hsl(var(--border))", padding: "0.75rem", textAlign: "left", fontWeight: "600" },
  td: { borderBottomWidth: "1px", borderColor: "hsl(var(--border))", padding: "0.75rem" },
  img: { maxWidth: "100%", height: "auto", borderRadius: "0.5rem", marginTop: "1rem", marginBottom: "1rem" },
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  const renderNode = (node: any, index: number): React.ReactNode => {
    if (typeof node === "string") return node;
    if (!node || typeof node !== "object") return null;

    const { type, children, props } = node;
    const style = elementStyles[type] || {};

    const childElements = children?.map?.((child: any, i: number) => renderNode(child, i)) || [];

    switch (type) {
      case "root":
        return <div className="markdown-content">{childElements}</div>;
      case "paragraph":
        return <p style={style}>{childElements}</p>;
      case "heading":
        const Tag = `h${props?.level || 1}` as React.ElementType;
        return React.createElement(Tag, { style, key: index }, childElements);
      case "text":
        return node.value;
      case "strong":
        return <strong style={style}>{childElements}</strong>;
      case "emphasis":
        return <em style={style}>{childElements}</em>;
      case "link":
        return <a href={props?.url} target="_blank" rel="noopener noreferrer" style={style}>{childElements}</a>;
      case "code":
        return <code style={style}>{props?.value || childElements}</code>;
      case "inlineCode":
        return <code style={elementStyles.code}>{props?.value || childElements}</code>;
      case "list":
        const ListTag = props?.ordered ? "ol" : "ul";
        return React.createElement(ListTag, { style, key: index }, childElements);
      case "listItem":
        return <li style={style}>{childElements}</li>;
      case "blockquote":
        return <blockquote style={style}>{childElements}</blockquote>;
      case "thematicBreak":
        return <hr style={style} key={index} />;
      case "table":
        return <table style={style}>{childElements}</table>;
      case "tableRow":
        return <tr style={style}>{childElements}</tr>;
      case "tableCell":
        const CellTag = props?.header ? "th" : "td";
        return React.createElement(CellTag, { style, key: index }, childElements);
      case "image":
        return <img src={props?.url} alt={props?.alt || ""} style={style} key={index} loading="lazy" />;
      default:
        return <div key={index}>{childElements}</div>;
    }
  };

  // Simple markdown parser for basic elements
  const parseMarkdown = (markdown: string) => {
    const lines = markdown.split("\n");
    const nodes: any[] = [];
    let inCodeBlock = false;
    let codeBlockContent = "";
    let codeBlockLang = "";
    let inList = false;
    let listType: "ul" | "ol" = "ul";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockLang = line.slice(3).trim();
          codeBlockContent = "";
        } else {
          inCodeBlock = false;
          nodes.push({
            type: "codeBlock",
            lang: codeBlockLang,
            value: codeBlockContent,
          });
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent += line + "\n";
        continue;
      }

      // Headings
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        nodes.push({
          type: "heading",
          level: headingMatch[1].length,
          children: [{ type: "text", value: headingMatch[2] }],
        });
        continue;
      }

      // Horizontal rule
      if (line.match(/^[-*_]{3,}$/)) {
        nodes.push({ type: "thematicBreak" });
        continue;
      }

      // Lists
      const ulMatch = line.match(/^[\s]*[-*+]\s+(.+)$/);
      const olMatch = line.match(/^[\s]*\d+\.\s+(.+)$/);
      
      const listMatch = ulMatch || olMatch;
      if (listMatch) {
        if (!inList) {
          inList = true;
          listType = ulMatch ? "ul" : "ol";
          nodes.push({ type: "list", ordered: !!olMatch, children: [] });
        }
        (nodes[nodes.length - 1].children as any[]).push({
          type: "listItem",
          children: parseInline(listMatch[1]),
        });
        continue;
      } else if (inList && line.trim() === "") {
        // Continue list
        continue;
      } else if (inList) {
        inList = false;
      }

      // Blockquote
      const blockquoteMatch = line.match(/^>\s+(.+)$/);
      if (blockquoteMatch) {
        nodes.push({
          type: "blockquote",
          children: parseInline(blockquoteMatch[1]),
        });
        continue;
      }

      // Table
      const tableMatch = line.match(/^\|(.+)\|$/);
      if (tableMatch) {
        const cells = tableMatch[1].split("|").map((c) => c.trim());
        if (i + 1 < lines.length && lines[i + 1].match(/^\|[\s*-:]+\|$/)) {
          // Header row
          nodes.push({
            type: "table",
            children: [
              {
                type: "tableRow",
                children: cells.map((cell) => ({
                  type: "tableCell",
                  header: true,
                  children: parseInline(cell),
                })),
              },
            ],
          });
          i++; // Skip separator row
        } else {
          // Data row
          const lastNode = nodes[nodes.length - 1];
          if (lastNode && lastNode.type === "table") {
            (lastNode.children as any[]).push({
              type: "tableRow",
              children: cells.map((cell) => ({
                type: "tableCell",
                children: parseInline(cell),
              })),
            });
          }
        }
        continue;
      }

      // Paragraph
      if (line.trim()) {
        nodes.push({
          type: "paragraph",
          children: parseInline(line),
        });
      }
    }

    return { type: "root", children: nodes };
  };

  const parseInline = (text: string): any[] => {
    const nodes: any[] = [];
    let current = 0;

    const regex = /(\*\*.+?\*\*|__.+?__|\*.+?\*|_.+?_|`.+?`|\[.+?\]\(.+?\))/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > current) {
        nodes.push({ type: "text", value: text.slice(current, match.index) });
      }

      const content = match[1];
      if (content.startsWith("**") || content.startsWith("__")) {
        nodes.push({ type: "strong", children: [{ type: "text", value: content.slice(2, -2) }] });
      } else if (content.startsWith("*") || content.startsWith("_")) {
        nodes.push({ type: "emphasis", children: [{ type: "text", value: content.slice(1, -1) }] });
      } else if (content.startsWith("`")) {
        nodes.push({ type: "inlineCode", value: content.slice(1, -1) });
      } else if (content.startsWith("[")) {
        const linkMatch = content.match(/\[(.+?)\]\((.+?)\)/);
        if (linkMatch) {
          nodes.push({
            type: "link",
            url: linkMatch[2],
            children: [{ type: "text", value: linkMatch[1] }],
          });
        }
      }

      current = match.index + match[0].length;
    }

    if (current < text.length) {
      nodes.push({ type: "text", value: text.slice(current) });
    }

    return nodes.length > 0 ? nodes : [{ type: "text", value: text }];
  };

  const ast = parseMarkdown(content);

  const renderElement = (node: any, index: number): React.ReactNode => {
    if (typeof node === "string") return node;
    if (!node || typeof node !== "object") return null;

    const { type, children, ...props } = node;
    const style = elementStyles[type] || {};

    const childElements = children?.map?.((child: any, i: number) => renderElement(child, i)) || [];

    switch (type) {
      case "root":
        return <div className="markdown-content">{childElements}</div>;
      case "paragraph":
        return <p key={index} style={style}>{childElements}</p>;
      case "heading":
        const Tag = `h${props.level || 1}` as React.ElementType;
        return React.createElement(Tag, { key: index, style }, childElements);
      case "text":
        return node.value;
      case "strong":
        return <strong key={index} style={style}>{childElements}</strong>;
      case "emphasis":
        return <em key={index} style={style}>{childElements}</em>;
      case "link":
        return <a key={index} href={props.url} target="_blank" rel="noopener noreferrer" style={style}>{childElements}</a>;
      case "inlineCode":
        return <code key={index} style={elementStyles.code}>{props.value || childElements}</code>;
      case "codeBlock":
        return (
          <pre key={index} style={elementStyles.pre}>
            <code className={`language-${props.lang || ""}`}>{props.value}</code>
          </pre>
        );
      case "list":
        const ListTag = props.ordered ? "ol" : "ul";
        return React.createElement(ListTag, { key: index, style }, childElements);
      case "listItem":
        return <li key={index} style={style}>{childElements}</li>;
      case "blockquote":
        return <blockquote key={index} style={style}>{childElements}</blockquote>;
      case "thematicBreak":
        return <hr key={index} style={style} />;
      case "table":
        return <div key={index} style={{ overflowX: "auto" }}><table style={style}>{childElements}</table></div>;
      case "tableRow":
        return <tr key={index} style={style}>{childElements}</tr>;
      case "tableCell":
        const CellTag = props.header ? "th" : "td";
        return React.createElement(CellTag, { key: index, style }, childElements);
      case "image":
        return <img key={index} src={props.url} alt={props.alt || ""} style={style} loading="lazy" />;
      default:
        return <div key={index}>{childElements}</div>;
    }
  };

  return renderElement(ast, 0);
}