import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "../../store";
import { Coffee } from "lucide-react";
import { createProductSchema, type CreateProductFormValues } from "../../validations/productSchema";
import { useState, useRef, useEffect } from "react";
import type { PRODUCT } from "../../types/Product";

interface ProductFormProps {
  product?: PRODUCT | null;
}

export default function ProductForm({ product }: ProductFormProps) {
  const { createProductFetch, updateProductFetch } = useStore();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [imageInputType, setImageInputType] = useState<"file" | "url">("file");
  const [imageUrl, setImageUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 1,
      category: "",
    },
  });

  useEffect(() => {
    if (product) {
      setValue("name", product.name || "");
      setValue("description", product.description || "");
      setValue("price", product.price || 1);
      setValue("category", product.category || "");
      if (product.image) {
        setImageUrl(product.image);
      }
    }
  }, [product, setValue]);

  const onSubmit = async (data: CreateProductFormValues) => {
    setError(null);
    setSuccess(null);

    const payload: CreateProductFormValues = { ...data };

    if (imageInputType === "file") {
      const imageFile = imageInputRef.current?.files?.[0];
      if (imageFile) {
        payload.image = imageFile;
      }
    } else if (imageInputType === "url" && imageUrl) {
      payload.image = imageUrl;
    }

    let response;
    if (product && product._id) {
      response = await updateProductFetch(product._id, payload);
      if (response.success) {
        setSuccess("Product updated successfully!");
      } else {
        setError(response.message || "Failed to update product.");
      }
    } else {
      response = await createProductFetch(payload);
      if (response.success) {
        setSuccess("Product created successfully!");
        reset();
        if (imageInputRef.current) imageInputRef.current.value = "";
      } else {
        setError(response.message || "Failed to create product.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-lg p-6 space-y-6"
        encType="multipart/form-data"
      >
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-lg">
            <Coffee className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {product ? "Update Product" : "Create Product"}
            </h2>
            <p className="text-sm text-gray-600">
              {product ? "Edit product details" : "Add a new product to your menu"}
            </p>
          </div>
        </div>

        {/* Error/Success */}
        {error && <div className="bg-red-100 text-red-700 p-3 rounded text-sm">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-3 rounded text-sm">{success}</div>}

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input
              {...register("name")}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.name ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Product name"
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register("description")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Description"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input
              type="number"
              step="0.01"
              min={1}
              {...register("price", { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.price ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="0.00"
            />
            {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              {...register("category")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Category"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <div className="flex items-center gap-4 mb-2">
              <button
                type="button"
                className={`px-2 py-1 rounded ${imageInputType === "file" ? "bg-orange-500 text-white" : "bg-gray-200"}`}
                onClick={() => setImageInputType("file")}
              >
                Upload File
              </button>
              <button
                type="button"
                className={`px-2 py-1 rounded ${imageInputType === "url" ? "bg-orange-500 text-white" : "bg-gray-200"}`}
                onClick={() => setImageInputType("url")}
              >
                Use URL
              </button>
            </div>
            {imageInputType === "file" ? (
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            ) : (
              <input
                type="text"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="Paste image URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:from-orange-700 hover:to-red-700 transition-all duration-200 disabled:opacity-60"
        >
          {isSubmitting
            ? product
              ? "Updating..."
              : "Creating..."
            : product
            ? "Update Product"
            : "Create Product"}
        </button>
      </form>
    </div>
  );
}
