import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MultiStepForm from "../../components/MultiStepForm/index";
import "../OrderForm/orderForm.css";
export default function OrderDetails({ location }) {
  let { orderNumber } = useParams();
  const [progressValue, setProgressValue] = useState(0);
  const progress = (value) => {
    setProgressValue(value);
  };
  const [Order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3232/api/orderByOrderId/${orderNumber}`)
      .then((response) => {
        console.log(response);
        if (response.data.status === true) {
          setOrder(response.data.data);
        }
      })
      .catch();
  }, []);
  if (Order !== null) {
    console.log({ Order });
    return (
      <div>
        <div className="progress">
          <div className="bar" style={{ width: `${progressValue}%` }}>
            {/* <p className="percent">15%</p> */}
          </div>
        </div>
        <div className="red-400">
          <MultiStepForm Order={Order} progress={progress} />
        </div>
      </div>
    );
  } else {
    return <div>kjhdffkghdkg</div>;
  }
}
