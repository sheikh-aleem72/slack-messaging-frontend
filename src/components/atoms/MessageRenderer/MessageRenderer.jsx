import Quill from "quill";
import { useEffect, useRef, useState } from "react";

export const MessageRenderer = ({ value }) => {
  console.log("Value: ", value);

  const rendererRef = useRef(null);
  // const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // console.log("Renderer Ref: ", rendererRef.current);
    if (!rendererRef.current) return;

    // console.log("Value: ", value);

    const quill = new Quill(document.createElement("div"), {
      theme: "snow",
    });

    // Disable editing
    quill.disable();

    const content = JSON.parse(value);
    quill.setContents(content);
    // log quill content
    // console.log("Content: ", quill.root.innerHTML);

    // Check if the content is empty
    // const isContentEmpty = quill?.getText().trim().length() === 0;
    // setIsEmpty(isContentEmpty);

    // Add content to the rendererRef
    rendererRef.current.innerHTML = quill.root.innerHTML;
  }, [value]);

  // if (isEmpty) return null;
  return <div ref={rendererRef} className="ql-editor ql-renderer" />;
};
