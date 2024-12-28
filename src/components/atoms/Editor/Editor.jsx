import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // ES6
export const Editor = ({
  placeholder,
  onSubmit,
  onCancel,
  disabled,
  defaultValue,
}) => {
  const [text, setText] = useState("");
  const [isToolbarVisible, setToolbarVisible] = useState(null);

  const containerRef = useRef();
  const submitRef = useRef();
  const disabledRef = useRef();
  const defaultValueRef = useRef();
  const quillRef = useRef();
  const placeholderRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div") // create a new div element and append it to the container
    );

    const options = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["link", "image"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                return;
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n"); // insert a new line
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);

    quillRef.current = quill;
    quillRef.current.focus();

    quill.setContents(defaultValueRef.current);
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white ">
        <div className="h-full ql-custom" ref={containerRef} />
      </div>

      <p className="p-2 text-[10px] text-muted-foreground flex justify-end">
        <strong>Shift + return</strong> &nbsp; to add a new line
      </p>
    </div>
  );
};
