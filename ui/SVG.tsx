import { Spinner } from "@chakra-ui/react";
import { CSSProperties, useEffect, useState } from "react";

export interface SVGProps {
  url: string;
  style: CSSProperties;
}
export default function SVG({ url, style }: SVGProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<string>();

  useEffect(() => {
    setIsLoading(true);

    fetch(url, { cache: "force-cache" })
      .then((res) => res.text())
      .then((content) => {
        setContent(content);
        setIsLoading(false);
      })
      .catch(console.warn)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!content) {
    return <></>;
  }

  return <div style={style} dangerouslySetInnerHTML={{ __html: content }} />;
}
