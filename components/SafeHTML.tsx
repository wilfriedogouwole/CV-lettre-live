"use client";

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

interface SafeHTMLProps {
  html: string;
  className?: string;
}

export default function SafeHTML({ html, className }: SafeHTMLProps) {
  const [sanitized, setSanitized] = useState("");

  useEffect(() => {
    // Configuration de DOMPurify
    const clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'div', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      ALLOWED_ATTR: ['class', 'style'],
    });
    setSanitized(clean);
  }, [html]);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }} 
    />
  );
}