import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // ES6
import { Button } from "@/components/ui/button";
import { PiTextAa } from "react-icons/pi";
import { Hint } from "../Hint/Hint";
import { MdSend } from "react-icons/md";
import { ImageIcon, Loader2, XIcon } from "lucide-react";
import { useAuth } from "@/hooks/context/useAuth";
import { useParams } from "react-router-dom";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import axiosConfig from "@/config/axiosConfig";
import axios from "axios";
import { useGetPresignedUrl } from "@/hooks/apis/cloudinary/useGetPresignedUrl";
import { useUploadImageToCloudinary } from "@/hooks/apis/cloudinary/useUploadImageToCloudinary";
export const Editor = ({
  placeholder,
  onSubmit,
  onCancel,
  disabled,
  defaultValue,
  socket,
}) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isToolbarVisible, setToolbarVisible] = useState(null);
  const { auth } = useAuth();
  const { channelId } = useParams();
  const { currentWorkspace } = useCurrentWorkspace();
  const { memberId } = useParams();
  const { getPreSignedUrlMutation } = useGetPresignedUrl();
  const { uploadImageToCloudinarypresignedUrlMutation } =
    useUploadImageToCloudinary();

  const currentUser = currentWorkspace?.members?.find(
    (member) => member?.memberId._id === auth?.user.id
  );

  const containerRef = useRef();
  const submitRef = useRef();
  const disabledRef = useRef();
  const defaultValueRef = useRef();
  const quillRef = useRef();
  const placeholderRef = useRef();
  const imageRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const abortController = useRef(null);

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
      placeholder: placeholder,
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

    quill.on("text-change", () => {
      handleTyping();
    });

    return () => {
      quill.off("text-change"); // Clean up event listener when component unmounts
    };
  }, []);

  function handleSendMessage() {
    const message = quillRef.current?.getText().trim();

    if (message.length === 0 && imageRef.current.value === "") {
      console.log("cannot send empty message");
      quillRef.current.setText("");
      return;
    }

    const messageContent = JSON.stringify(quillRef.current?.getContents());

    onSubmit({
      body: messageContent,
      // image // For image upload currently not enabled because not have aws account
    });
    imageRef.current.value = "";
    setImage(null);
    quillRef.current.setText("");
  }

  function handleTyping() {
    if (!socket) return;

    // Emit `typing` event to server
    if (channelId) {
      socket.emit("typing", { user: currentUser.memberId, channelId });

      // Clear previous timeout (if exists)
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Emit `stopTyping` event after 3 seconds of inactivity
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stopTyping", {
          user: currentUser.memberId,
          channelId,
        });
      }, 1000);
    } else if (memberId) {
      socket.emit("typing", { user: currentUser.memberId, memberId });

      // Clear previous timeout (if exists)
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Emit `stopTyping` event after 3 seconds of inactivity
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stopTyping", {
          user: currentUser.memberId,
          memberId,
        });
      }, 1000);
    }
  }

  async function handleImageUpload(file) {
    if (!file) return;
    setUploading(true);
    setImage(file);
    abortController.current = new AbortController();

    try {
      const presignedUrlData = await getPreSignedUrlMutation();

      const { uploadUrl, signature, timestamp, apiKey, folder } =
        presignedUrlData;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", folder);

      const response = await uploadImageToCloudinarypresignedUrlMutation({
        URL: uploadUrl,
        formData,
        config: { signal: abortController.current.signal },
      });

      setImageUrl(response?.secure_url);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Image upload canceled");
      } else {
        console.error("Image upload failed", error);
      }
    } finally {
      setUploading(false);
    }
  }

  function handleSendMessage() {
    const message = quillRef.current?.getText().trim();
    if (!message && !imageUrl) return;

    const messageContent = JSON.stringify(quillRef.current?.getContents());
    onSubmit({ body: messageContent, image: imageUrl });
    setImage(null);
    setImageUrl(null);
    quillRef.current.setText("");
  }

  function handleTyping() {
    if (!socket) return;
    const payload = { user: currentUser.memberId };
    if (channelId) payload.channelId = channelId;
    if (memberId) payload.memberId = memberId;
    socket.emit("typing", payload);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", payload);
    }, 1000);
  }

  function cancelUpload() {
    if (abortController.current) {
      abortController.current.abort();
      setImage(null);
      setImageUrl(null);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white ">
        <div className="h-full ql-custom" ref={containerRef} />
        {image && (
          <div className="p-2">
            <div className="relative size-[60px] flex items-center justify-center group/image">
              <button
                className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[5] border-2 border-white items-center justify-center"
                onClick={cancelUpload}
              >
                <XIcon className="size-4" />
              </button>

              {/* Image Preview */}
              <img
                src={URL.createObjectURL(image)}
                className={`rounded-xl border object-cover w-full h-full transition ${
                  uploading ? "blur-sm opacity-50" : "blur-0 opacity-100"
                }`}
              />

              {/* Loader Overlay while uploading */}
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                  <Loader2 className="size-6 animate-spin text-white" />
                </div>
              )}
            </div>
          </div>
        )}

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

          <input
            className="hidden"
            type="file"
            ref={imageRef}
            onChange={(e) => {
              handleImageUpload(e.target.files[0]);
            }}
          />
          <Hint label="Image">
            <Button
              size="iconSm"
              variant="ghost"
              disabled={false}
              onClick={() => {
                imageRef.current.click();
              }}
            >
              <ImageIcon className="size-4" />
            </Button>
          </Hint>
          <Hint label="Send Message">
            <Button
              className="ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white"
              onClick={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              disabled={uploading}
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
