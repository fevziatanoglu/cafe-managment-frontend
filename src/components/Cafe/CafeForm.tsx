import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "../../store";
import { useState, useEffect } from "react";
import type { CAFE } from "../../types/Cafe";
import ImageInput from "../Common/ImageInput";
import { createCafeSchema, type CreateCafeFormValues } from "../../validations/cafeSchema";

interface CafeFormProps {
    cafe?: CAFE | null;
}

export default function CafeForm({ cafe }: CafeFormProps) {
    const { createCafeFetch, updateCafeFetch, user } = useStore();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [image, setImage] = useState<string | File | undefined>("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CreateCafeFormValues>({
        resolver: zodResolver(createCafeSchema),
        defaultValues: {
            name: cafe?.name || "",
            address: cafe?.address || "",
            image: cafe?.image || "",
        },
    });

    useEffect(() => {
        if (cafe?.image) {
            setImage(cafe.image);
        } else {
            setImage("");
        }
        // No need to set form values here since defaultValues handles it
    }, [cafe]);

    const onSubmit = async (data: CreateCafeFormValues) => {
        setError(null);
        setSuccess(null);
        let response;
        let payload: CreateCafeFormValues | FormData;
        if (image instanceof File) {
            payload = new FormData();
            payload.append("name", data.name);
            payload.append("address", data.address || "");
            payload.append("owner", user?.id || "");
            if (image) {
                payload.append("image", image);
            }
        } else {
            payload = {
                ...data,
                image: image || "",
                owner: user?.id || "",
            };
        }
        if (cafe && cafe._id) {
            response = await updateCafeFetch(cafe._id, payload);
        } else {
            response = await createCafeFetch(payload);
        }
        if (response.success) {
            reset();
            setImage("");
            setSuccess(cafe ? "Cafe updated successfully!" : "Cafe created successfully!");
        } else {
            setError(response.message || "Operation failed. Please try again.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            encType="multipart/form-data"
        >
            {error && <div className="bg-red-100 text-red-700 p-3 rounded text-sm">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 p-3 rounded text-sm">{success}</div>}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cafe Name *</label>
                    <input
                        {...register("name")}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Cafe name"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                        {...register("address")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Address"
                    />
                </div>
                <ImageInput value={image} onChange={setImage} />
            </div>
            <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                        w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200
                        ${isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 transform hover:scale-[1.02] active:scale-[0.98]'
                        }
                        focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
                    `}
                >
                    Create Cafe
            </button>
        </form>
    );
}
