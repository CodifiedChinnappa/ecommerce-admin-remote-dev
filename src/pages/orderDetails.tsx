import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import axios from "../api/axios";

interface Address {
  first_name: string;
  last_name: string;
  phone_number: string;
  company_name: string;
  line_1: string;
  line_2: string;
  city: string;
  postcode: string;
  county: string;
  country: string;
  instructions: string;
}

interface Item {
  type: string;
  id: string;
  quantity: number;
  product_id: string;
  name: string;
  sku: string;
  meta: {
    display_price: {
      discount: {
        amount: number;
        currency: string;
        formatted: string;
      };
      tax: {
        value: {
          amount: number;
          currency: string;
          formatted: string;
        };
      };
      with_tax: {
        value: {
          amount: number;
          currency: string;
          formatted: string;
        };
        unit: {
          amount: number;
          currency: string;
          formatted: string;
        };
      };
    };
    timestamps: {
      created_at: string;
      updated_at: string;
    };
  };
  unit_price: {
    amount: number;
    currency: string;
    includes_tax: boolean;
  };
  value: {
    amount: number;
    currency: string;
    includes_tax: boolean;
  };
}

interface OrderData {
  order_no: string;
  dealer_ID: number;
  status: string;
  order_data: {
    data: {
      type: string;
      id: string;
      status: string;
      payment: string;
      shipping: string;
      anonymized: boolean;
      customer: {
        name: string;
        email: string;
      };
      shipping_address: Address;
      billing_address: Address;
      links: any;
      meta: {
        display_price: {
          discount: {
            amount: number;
            currency: string;
            formatted: string;
          };
          shipping: {
            amount: number;
            currency: string;
            formatted: string;
          };
          tax: {
            amount: number;
            currency: string;
            formatted: string;
          };
          without_tax: {
            amount: number;
            currency: string;
            formatted: string;
          };
        };
        timestamps: {
          created_at: string;
          updated_at: string;
        };
      };
      relationships: {
        items: {
          data: Item[];
        };
        customer: {
          data: {
            type: string;
            id: string;
          };
        };
      };
    };
    included: {
      items: Item[];
    };
  };
  fulfill_type: string;
  status_time: string;
  created_date: string;
  order_total: number;
  name: string;
  email: string;
  mobile: string;
  dealer_order_no: string;
}

const OrderDetails = () => {
  const [orderInfo, setOrderInfo] = useState<OrderData | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const { orderid } = useParams();

  const handleOrderStatus = async () => {
    try {
      // Update shipping status
      setLoadingState(true);
      await axios.put(`/update-ship_status/${orderid}`, {
        data: {
          type: "order",
          shipping: "fulfilled",
        },
      });

      // Update dealer order status
      const res2 = await axios.put(
        `/update-dealer_order/${orderid}/fullfilled`,
        {
          data: {
            type: "order",
            shipping: "fulfilled",
          },
        }
      );
      console.log(res2);
      setLoadingState(false);
    } catch (error) {
      console.log("API Error:", error);
      setLoadingState(false);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `/get-dealer_order/${orderid}/${auth.user.dealer_ID}`
  //       );
  //       setOrderInfo({
  //         ...data[0],
  //         order_data: JSON.parse(data[0].order_data),
  //       });
  //     } catch (err) {
  //       console.log("API Error:", err); // Log any error
  //     }
  //   };
  //   fetchData();
  // }, [auth, loadingState]);

  // order update state
  let buttonContent;

  if (orderInfo?.status === "fullfilled") {
    buttonContent = (
      <h3
        style={{
          fontSize: "18px",
          color: "green",
          background: "white",
          padding: "0.4rem",
          textTransform: "uppercase",
        }}
      >
        Fulfilled
      </h3>
    );
  } else if (loadingState) {
    buttonContent = <CircularProgress />;
  } else {
    buttonContent = (
      <button
        type="button"
        className="custom-button"
        // disabled={loadingState}
        onClick={handleOrderStatus}
      >
        Fulfill order
      </button>
    );
  }
  // order update state end

  return (
    <div className="order-details-main">
      {orderInfo ? (
        <div className="order-details-container">
          <div className="order-details-heading">
            <div>
              <h5>Order No : {orderInfo.order_no}</h5>
              <h5>Date : {orderInfo.created_date}</h5>
            </div>
            <div className="order-status-select">
              <h5>Status time : {orderInfo.status_time}</h5>
              <div style={{ display: "flex" }}>{buttonContent}</div>
            </div>
          </div>
          <div className="order-details-content">
            <div className="order-details">
              <div className="order-userdata">
                <div className="order-detail-row">
                  <h4>Customer Name</h4>
                  <p>{orderInfo?.name}</p>
                </div>
                <div className="order-detail-row">
                  <h4>Email</h4>
                  <p>{orderInfo?.email}</p>
                </div>
                <div className="order-detail-row">
                  <h4>Contact</h4>
                  <p>123</p>
                </div>
                <div className="order-detail-row">
                  <h4>Address</h4>
                  <p>
                    {orderInfo?.order_data.data.shipping_address.line_1}
                    <br />
                    {orderInfo?.order_data.data.shipping_address.line_2}
                    <br />
                    {orderInfo?.order_data.data.shipping_address.postcode}
                    <br />
                    {orderInfo?.order_data.data.shipping_address.city}
                    <br />
                    {orderInfo?.order_data.data.shipping_address.country}
                  </p>
                </div>
              </div>
              <div className="order-amount">
                <div className="order-amount-row">
                  <h4>Tax</h4>
                  <p>
                    {
                      orderInfo?.order_data.data.meta.display_price.tax
                        .formatted
                    }
                  </p>
                </div>
                <div className="order-amount-row">
                  <h4>Discount</h4>
                  <p>
                    {
                      orderInfo?.order_data.data.meta.display_price.discount
                        .formatted
                    }
                  </p>
                </div>
                <div className="order-amount-row">
                  <h4>Shipping cost</h4>
                  <p>
                    {
                      orderInfo?.order_data.data.meta.display_price.shipping
                        .formatted
                    }
                  </p>
                </div>
                <div className="order-amount-row">
                  <h4>No Tax</h4>
                  <p>
                    {
                      orderInfo?.order_data.data.meta.display_price.without_tax
                        .formatted
                    }
                  </p>
                </div>
                <div className="order-amount-row" style={{ marginTop: "10px" }}>
                  <h4 style={{ fontWeight: 700, fontSize: "18px" }}>Total</h4>
                  <p style={{ fontWeight: 700, fontSize: "18px" }}>
                    ${orderInfo?.order_total}
                  </p>
                </div>
              </div>
            </div>
            <hr />

            <div className="order-products">
              <table className="text-left">
                <thead className="text-xs text-black uppercase bg-gray-300">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Product id</th>
                    <th className="px-6 py-3">quantity</th>
                    <th className="px-6 py-3">unit price</th>
                    <th className="px-6 py-3">total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderInfo.order_data.included.items.map(item => {
                    return (
                      <tr key={item.id} className="order-details-tr">
                        <td className="px-6 py-4"> {item.name}</td>
                        <td className="px-6 py-4">{item.product_id}</td>
                        <td className="px-6 py-4">{item.quantity}</td>
                        <td className="px-6 py-4">
                          {item.meta.display_price.with_tax.unit.formatted}
                        </td>
                        <td className="px-6 py-4">
                          {item.meta.display_price.with_tax.value.formatted}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
