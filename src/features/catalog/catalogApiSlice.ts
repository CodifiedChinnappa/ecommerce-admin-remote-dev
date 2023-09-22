import { apiSlice } from "../../app/api/apiSlice";
import { Product } from "../../types";

// Define types for brandId and body
type CategoryBody = {
  parentId?: string | null;
  title: string;
};

// Define types for brandId and body
type BrandBody = {
  title: string;
};
type UpdateBrand = {
  brandId: string;
  body: BrandBody;
};
// Define types for productId and body
type ProductBody = {
  productId?: string;
  body: Product;
};

export const catalogApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // Create a category
    createCategory: builder.mutation({
      query: ({ parentId, title }: CategoryBody) => ({
        url: "/categories",
        method: "POST",
        body: { parentId, title },
      }),
    }),

    // Read categories (list all categories)
    getCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
    }),

    // Update a category by categoryId
    updateCategory: builder.mutation({
      query: ({ parentId, title }: CategoryBody) => ({
        url: `categories/${parentId}`,
        method: "PATCH",
        body: { parentId, title },
      }),
    }),

    createBrand: builder.mutation({
      query: ({ title }: BrandBody) => ({
        url: "/brands",
        method: "POST",
        body: { title },
      }),
    }),

    // Read brands (list all brands)
    getBrands: builder.query({
      query: () => ({
        url: "/brands",
        method: "GET",
      }),
    }),

    // Update a brand by brandId
    updateBrand: builder.mutation({
      query: ({ brandId, body }: UpdateBrand) => ({
        url: `/brands/${brandId}`,
        method: "PATCH",
        body: { ...body },
      }),
    }),
    createProduct: builder.mutation({
      query: (body: Product) => ({
        url: "/products",
        method: "POST",
        body: { ...body },
      }),
    }),

    // Query to fetch products (GET request)
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),

    // Query to get a single product (GET request)
    getProduct: builder.query({
      query: (productId: string) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),

    // Mutation to update a product (PATCH request)
    updateProduct: builder.mutation({
      query: ({ productId, body }: ProductBody) => ({
        url: `/products/${productId}`,
        method: "PATCH",
        body: { ...body },
      }),
    }),

    // Mutation to update a product status (PATCH request)
    updateProductStatus: builder.mutation({
      query: ({ productId, body }: ProductBody) => ({
        url: `/products/status/${productId}`,
        method: "PATCH",
        body: { ...body },
      }),
    }),
  }),
});

// Define hooks for the mutations and queries
export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useCreateBrandMutation,
  useGetBrandsQuery,
  useUpdateBrandMutation,
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
} = catalogApiSlice;
