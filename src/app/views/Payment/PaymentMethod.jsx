import React from "react";
import { useDispatch, useSelector } from "react-redux";

import PaymentMethodCard from "./PaymentMethodCard";
import {
  changeOrderPaymentMethod,
  getPaymentMethod,
} from "../../redux/actions/Payment/PaymentMethodActions";
import { getPaymentGateway } from "../../redux/actions/Payment/PaymentGatewayActions";

import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import { useEffect } from "react";
import { useState } from "react";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const { dataPaymentMethod, dataPaymentGateway } = useSelector(
    (state) => state.payment
  );
  const [paymentMethod, setPaymenMethod] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    dispatch(getPaymentMethod());
  };

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    console.log(targetId, sourceId);
    const result = swap(paymentMethod, sourceIndex, targetIndex);

    changeOrderPaymentMethod({ from: sourceIndex, to: targetIndex }).then(
      (res) => {
        console.log(res);
      }
    );

    return setPaymenMethod([...result]);
  }

  React.useLayoutEffect(() => {
    dispatch(getPaymentGateway(""));
    getData();
  }, []);

  useEffect(() => {
    if (dataPaymentMethod.length > 0) {
      setPaymenMethod(dataPaymentMethod);
      setLoading(false);
    }
  }, [dataPaymentMethod]);

  return (
    <div className="m-3">
      <h1 className="text-black fw-600 text-25 my-4 ml-5">Payment Method</h1>
      <GridContextProvider onChange={onChange}>
        <div className="container">
          <GridDropZone
            className="dropzone left"
            id="left"
            boxesPerRow={3}
            rowHeight={150}
          >
            {paymentMethod.map((item) => (
              <GridItem key={item.pm_code}>
                <div className="grid-item">
                  <PaymentMethodCard
                    isThereContent
                    data={item}
                    getData={getData}
                    dataPaymentGateway={dataPaymentGateway}
                  />
                </div>
              </GridItem>
            ))}
            <GridItem key={"new"} id="new">
              <div className="grid-item">
                <PaymentMethodCard
                  getData={getData}
                  dataPaymentGateway={dataPaymentGateway}
                />
              </div>
            </GridItem>
          </GridDropZone>
        </div>
      </GridContextProvider>
    </div>
  );
};

export default PaymentMethod;
