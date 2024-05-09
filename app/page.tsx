"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import BoardModal from "@/components/board-modal";
import CodeModal from "@/components/code-modal";
// import { kv } from "@/utils/kv";
import { KVNamespace } from '@cloudflare/workers-types'
import { kill } from "process";

export const runtime = "experimental-edge";

function getRandomNumberBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Home() {
  const code = getRandomNumberBetween(1000, 9999);

  const { KV_TEST } = process.env as unknown as { KV_TEST: KVNamespace}

  const [clipboardData, setClipboardData] = useState<string>("");
  const [codeInput, setCodeInput] = useState<number>(0);
  const [isWatching, setIsWatching] = useState<boolean>(false);

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

  const toggleModal = () => {
    setIsWatching(!isWatching);
    setClipboardData("");
    setIsModalOpen((prevOpen) => !prevOpen);
  };

  const toggleCodeModal = () => {
    setCodeInput(0);
    setIsCodeModalOpen((prev) => !prev);
  };

  const sendMessage = async () => {
    console.log(code, clipboardData);
    // kv.setKey({ key: String(codeInput), text: clipboardData })
    await KV_TEST?.put(String(code),clipboardData)
    toggleModal();
  };

  const receive = async () => {
    // const data = await kv.getKey({key: String(codeInput)})
    const data = await KV_TEST?.get(String(codeInput))
    console.log(data)
    console.log(codeInput);
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col gap-y-3 bg-black">
        <h1 className="text-3xl text-white font-bold">paperplane</h1>
        <button
          type="button"
          className="mt-32 relative inline-flex items-center justify-center w-[200px] h-12 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
          className="relative inline-flex items-center justify-center w-[200px] h-12 bg-gray-800 text-blue-800 rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
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
      </div>
    </>
  );
}
