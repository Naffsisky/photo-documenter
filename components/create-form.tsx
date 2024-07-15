"use client";

import React from "react";
import { uploadImage } from "@/lib/action";
import { useFormState } from "react-dom";

function CreateForm() {
  const [state, formAction] = useFormState(uploadImage, null);
  return (
    <form action={formAction}>
      <div className="mb-4 pt-2">
        <input type="text" name="title" placeholder="title" className="py-2 px-4 rounded-sm border border-gray-400 w-full" />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.title}</p>
        </div>
      </div>

      <div className="mb-4 pt-2">
        <input type="file" name="image" className="file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-200 hover:file:bg-gray-200 file:cursor-pointer border border-gray-400 w-full" />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.image}</p>
        </div>
      </div>

      <div className="mb-4 pt-4">
        <button className="bg-blue-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-blue-600">Upload</button>
      </div>
    </form>
  );
}

export default CreateForm;
