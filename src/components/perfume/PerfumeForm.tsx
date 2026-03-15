"use client";

import { SubmitButton } from "@/src/components/button/SubmitButton";
import { Input } from "@/src/components/input/Input";
import { Select } from "@/src/components/select/Select";
import { TextArea } from "@/src/components/textarea/TextArea";
import { GENDER_OPTIONS } from "@/src/constants";
import { PerfumeFormProps } from "@/src/types";
import { useActionState, useEffect, useRef } from "react";

export function PerfumeForm({ action, initialData }: PerfumeFormProps) {
  const [state, formAction] = useActionState(action, null);
  const formRef = useRef<HTMLFormElement>(null);

  const isEdit = !!initialData;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        {isEdit ? "Izmeni parfem" : "Dodaj novi parfem"}
      </h2>
      {state?.error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
          {state.error}
        </div>
      )}
      <form ref={formRef} action={formAction} className="flex flex-col gap-4">
        {isEdit && <input type="hidden" name="id" value={initialData.id} />}
        {isEdit && initialData.image_url && (
          <input
            type="hidden"
            name="existing_image_url"
            value={initialData.image_url}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Naziv parfema *"
            name="name"
            defaultValue={initialData?.name}
            required
          />
          <Input
            label="Brend *"
            name="brand"
            defaultValue={initialData?.brand}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="number"
            label="Količina *"
            name="quantity"
            defaultValue={initialData?.quantity ?? 1}
            min={0}
            required
          />
          <Input
            type="number"
            label="Cijena (KM) *"
            name="price"
            defaultValue={initialData?.price ?? ""}
            min={0}
            required
          />
          <Select
            label="Pol *"
            name="gender"
            defaultValue={initialData?.gender || ""}
            options={GENDER_OPTIONS}
            required
          />
        </div>
        <div>
          <Input
            type="file"
            label="Slika parfema (Opciono)"
            name="image"
            accept="image/*"
            className="p-0 border-0 bg-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
          />
          {isEdit && initialData.image_url && (
            <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
              Trenutna slika:{" "}
              <a
                href={initialData.image_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Pregledaj
              </a>
            </div>
          )}
        </div>
        <TextArea
          label="Opis (Opciono)"
          name="description"
          defaultValue={initialData?.description || ""}
          rows={3}
        />
        <div className="mt-2">
          <SubmitButton
            defaultText={isEdit ? "Sačuvaj Izmene" : "Dodaj Parfem"}
            loadingText={isEdit ? "Čuvanje..." : "Čuvanje u bazi..."}
          />
        </div>
      </form>
    </div>
  );
}
