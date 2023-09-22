import { apiSlice } from "../../app/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Read a single order by orderId
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
    }),

    // Read all orders
    getOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),

    // Update an order by orderId
    updateOrder: builder.mutation({
      query: ({ orderId, orderData }) => ({
        url: `/orders/${orderId}`,
        method: "PATCH",
        body: orderData,
      }),
    }),

    // Update an order's status by orderId
    updateOrderStatus: builder.mutation({
      query: ({ orderId, body }) => ({
        url: `/orders/status/${orderId}`,
        method: "PATCH",
        body: { ...body },
      }),
    }),
  }),
});

// Define hooks for the mutations and queries
export const {
  useGetOrderByIdQuery,
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
} = orderApiSlice;
