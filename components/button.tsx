"use client";
import { useFormStatus } from "react-dom";
import { clsx } from "clsx";

export const SubmitButton = ({ label }: { label: String }) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={clsx("bg-blue-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-blue-600", {
        "opacity-50 cursor-progress": pending,
      })}
      disabled={pending}
      type="submit"
    >
      {label === "upload" ? <>{pending ? "Uploading..." : "Upload"}</> : <>{pending ? "Updating..." : "Update"}</>}
    </button>
  );
};
