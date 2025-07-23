import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "../../store";
import { Coffee } from "lucide-react";
import { createProductSchema, type CreateProductFormValues } from "../../validations/productSchema";
import { useState } from "react";

export default function CreateProductPage() {
  const { createProductFetch } = useStore();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 1,
      category: "",
    },
  });

  const onSubmit = async (data: CreateProductFormValues) => {
    setError(null);
    setSuccess(null);
    const response = await createProductFetch(data);
    if (response.success) {
      setSuccess("Product created successfully!");
      reset();
    } else {
      setError(response.message || "Failed to create product.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-lg p-6 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-lg">
            <Coffee className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Create Product</h2>
            <p className="text-sm text-gray-600">Add a new product to your menu</p>
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

        </div>

        {/* Footer */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:from-orange-700 hover:to-red-700 transition-all duration-200 disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
