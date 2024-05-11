"use client";

import { useEffect, useRef, useState } from "react";

import BoardModal from "@/components/board-modal";
import CodeModal from "@/components/code-modal";
import LinkModal from "@/components/link-modal";
import ContentModal from "@/components/content-modal";
import { KVNamespace } from "@cloudflare/workers-types";
import axios from "axios";
import toast from "react-hot-toast";

let CODE_NUM = 0;

let BASE_URL = ''
if (process.env.NODE_ENV === "development") {
  BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
}

export interface Env {
  KV_TEST: KVNamespace;
  BASE_URL: string;
}

function getRandomNumberBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function validCode() {
  console.log("code重复, 重新生成code");
  let isDone = false;
  while (!isDone) {
    const res = await axios.get(`${BASE_URL}/api/v1/${CODE_NUM}`);
    if (res.data.status === 0) {
      CODE_NUM = getRandomNumberBetween(1000, 9999);
    } else if ((res.data.status = 1)) {
      isDone = true;
    }
  }
}

export default function Home() {
  CODE_NUM = getRandomNumberBetween(1000, 9999);
  // const { KV_TEST } = process.env as unknown as { KV_TEST: KVNamespace}

  const [clipboardData, setClipboardData] = useState<string>("");
  const [codeInput, setCodeInput] = useState<number>(0);
  const [isWatching, setIsWatching] = useState<boolean>(false);

  const [theme, setTheme] = useState<string>("");

  const dataContentRef = useRef(null);
  const codeRef = useRef<number>(0);

  useEffect(() => {
    if (!isWatching) {
      const handlePaste = (event: ClipboardEvent) => {
        event.preventDefault();
        const clipboardText = event.clipboardData?.getData("text/plain");
        setClipboardData(clipboardText as string);
        setIsModalOpen(true);
        setIsWatching(true);
      };

      window.addEventListener("paste", handlePaste);

      return () => {
        window.removeEventListener("paste", handlePaste);
      };
    }
  }, [isWatching, clipboardData]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsWatching(!isWatching);
    setClipboardData("");
    setIsModalOpen((prevOpen) => !prevOpen);
  };

  const toggleCodeModal = () => {
    setIsWatching(!isWatching);
    setCodeInput(0);
    setIsCodeModalOpen((prev) => !prev);
  };

  const toggleLinkModal = () => {
    setIsLinkModalOpen((prev) => !prev);
  };

  const toggleContentModal = () => {
    setIsContentModalOpen((prev) => !prev);
  };

  const sendMessage = async (expire: number) => {
    validCode();
    console.log(expire)

    const data = {
      code: CODE_NUM,
      text: clipboardData,
      expire
    };

    codeRef.current = CODE_NUM;

    await axios.post(`${BASE_URL}/api/v1/${CODE_NUM}`, data);
    toggleModal();
    toggleLinkModal();
  };

  const receive = async () => {
    const res = await axios.get(`${BASE_URL}/api/v1/${codeInput}`);

    if (res.data.status === 0) {
      setClipboardData(res.data.value);
      toggleCodeModal();
      toggleContentModal();
      dataContentRef.current = res.data;
    }
    if (res.data.status === 1) {
      toast.error("提取码不存在");
    }
  };

  const themeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const getTheme = localStorage.getItem("theme") || "light";
    setTheme(getTheme);
    document.body.className = getTheme;
  }, [theme]);

  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col gap-y-3 bg-white dark:bg-black">
        <button
          className="absolute top-5 right-5 text-5xl xs:text-3xl dark:text-white text-black outline-none active:animate-spin"
          onClick={themeToggle}
        >
          ＊
        </button>
        <h1 className="text-3xl text-gray-800 dark:text-white font-bold">
          PaperPlane
        </h1>
        <button
          type="button"
          className="mt-32 relative inline-flex items-center justify-center w-[200px] h-12 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={toggleModal}
        >
          发送
        </button>
        <BoardModal
          clipboardData={clipboardData}
          setClipboardData={setClipboardData}
          sendMessage={sendMessage}
          isOpen={isModalOpen}
          onClose={toggleModal}
        />
        <button
          type="button"
          className="relative inline-flex items-center justify-center w-[200px] h-12 dark:bg-gray-800 dark:text-blue-800 bg-white hover:bg-gray-100 text-blue-500 rounded-md shadow-md"
          onClick={toggleCodeModal}
        >
          接收
        </button>
        <CodeModal
          codeInput={codeInput}
          setCodeInput={setCodeInput}
          receive={receive}
          isOpen={isCodeModalOpen}
          onClose={toggleCodeModal}
        />
        <LinkModal
          isOpen={isLinkModalOpen}
          onClose={toggleLinkModal}
          code={codeRef.current}
        />
        <ContentModal
          isOpen={isContentModalOpen}
          onClose={toggleContentModal}
          data={dataContentRef.current}
        />
        <span className="absolute bottom-2 dark:text-gray-300 text-gray-500 text-sm">
          © 2024{" "}
          <a href="https://www.github.com/eMoonT/paperplane">
            PaperPlane{"  "} •
          </a>
          {"  "}
          Engine by <a href="https://cloudflare.com">Cloudflare Pages</a>
        </span>
      </div>
    </>
  );
}
