import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // ES6
import { Button } from "@/components/ui/button";
import { PiTextAa } from "react-icons/pi";
import { Hint } from "../Hint/Hint";
import { MdSend } from "react-icons/md";
import { ImageIcon } from "lucide-react";
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

  function toggleToolbar() {
    setToolbarVisible(!isToolbarVisible);
    const toolbar = containerRef.current.querySelector(".ql-toolbar");
    if (toolbar) {
      toolbar.classList.toggle("hidden");
    }
  }
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
          ["link"],
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
        <div className="flex px-2 pb-2 z-[5] gap-2">
          <Hint label={isToolbarVisible ? "show toolbar" : "hide toobar"}>
            <Button
              size="iconSm"
              variant="ghost"
              disabled={false}
              onClick={toggleToolbar}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          <Hint label="Image">
            <Button
              size="iconSm"
              variant="ghost"
              disabled={false}
              onClick={() => {}}
            >
              <ImageIcon className="size-4" />
            </Button>
          </Hint>
          <Hint label="Send Message">
            <Button
              className="ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white"
              onClick={() => {
                onSubmit({
                  body: JSON.stringify(quillRef.current?.getContents()),
                });
              }}
              disabled={false}
            >
              <MdSend className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>

      <p className="p-2 text-[10px] text-muted-foreground flex justify-end">
        <strong>Shift + return</strong> &nbsp; to add a new line
      </p>
    </div>
  );
};
