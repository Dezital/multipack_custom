import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  FormLayout,
  Frame,
  Heading,
  Icon,
  InlineError,
  Loading,
  Page,
  Select,
  TextField,
  EmptyState,
} from "@shopify/polaris";

import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";
import LoadingSpinner from "./LoadingSpinner";
import FinalProductShow from "./FinalProductShow";

function PackCreationPage({productdata,setShowSelectedProduct}) {
  
  const [orders, SetOrders] = useState();
  const [quantityofMultipack, setQuantityOfMultipacks] = useState();
  const [quantityofNewProduct, setQuantityofNewProduct] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowProductData, setIShowProductData] = useState(false);

  const [totalmultipackquantity,settoatlMultipackQuantity] =useState();
  const [multipackName,setMultipackName]= useState()
  const [multipackprice,setMultipackPrice]=useState()
  const [multipackdiscription,setMultipackDiscription] =useState()
  const [multipackweight,setMultipackWeight]=useState()
  const [multipackSku,setMultipackSku]=useState()
  // const [multipackprice,setMultipackPrice]=useState();

  const app = useAppBridge();

  const handleFomSubmission = () => {
    let nw = productdata.variants[0].inventoryQuantity / quantityofMultipack;
    nw= Math.floor(nw);
   
    settoatlMultipackQuantity(`${nw}`)
    let multipacktitle = productdata.title + `-${quantityofMultipack}Packs`;
    setMultipackName(multipacktitle);
    let multipackpaisa = productdata.variants[0].price * quantityofMultipack;
    setMultipackPrice(`${multipackpaisa}`)
    let multipackdis = productdata.descriptionHtml;
    setMultipackDiscription(multipackdis);
    let multipackwgh = productdata.variants[0].weight * quantityofMultipack;
    setMultipackWeight(`${multipackwgh}`)
    let mulsku = productdata.variants[0].sku+`-${quantityofMultipack}Packs`
    setMultipackSku(`${mulsku}`)

    setIShowProductData(true)

    setIsLoading(true);

    
    //setIShowProductData(true);
    setIsLoading(false);
    // setIShowProductData(true);
    // input = input + 1;
  
    // createMultipack();
  };

  const handleForm2Submission = () => {
    createMultipack();
  };

  const handlechangeMultipackQuantity = (input) => {
    setQuantityOfMultipacks(input);
  };

  
  return (
    <div>
      <div className={`product-fullfillment-card `}>
        <div className="product-fullfillment-card-img">
          <div className="product-image-section">
            <img
              className="product-img"
              src={productdata.images[0].originalSrc}
            />
          </div>
        </div>

        <div className="product-fullfillment-card-details ">
          <div className="title-text">{productdata.title}</div>

          <div>
            <div className="orderid-text">
              SKU: {productdata.variants[0].sku}
            </div>
          </div>

          <div>
            <div className="orderid-text">
              Total Quantity:{" "}
              {productdata.variants[0].inventoryQuantity}
            </div>
          </div>
          <div>
            <div className="orderid-text">
              Product Price: {productdata.variants[0].price}
            </div>
          </div>
        </div>
      </div>
      <div className="Form-tags">
        <Form onSubmit={handleFomSubmission}>
          <FormLayout>
            <TextField
              value={quantityofMultipack}
              type="number"
              onChange={(input) => {
                handlechangeMultipackQuantity(input);
              }}
              label="Add Quantity of multipacks to be created"
              required
            />

            <div className="show-data"></div>
            <Button primary submit>
              Create MultiPack
            </Button>
          </FormLayout>
        </Form>
      </div>

      {isShowProductData ? (
      <FinalProductShow
      setShowSelectedProduct={setShowSelectedProduct}
      multipackName={multipackName}
      multipackprice={multipackprice}
      multipackdiscription={multipackdiscription}
      multipackweight={multipackweight}
      multipackSku={multipackSku}
      productdata={productdata}
      quantityofMultipack={quantityofMultipack}
      totalmultipackquantity={totalmultipackquantity}
   
      ></FinalProductShow>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default PackCreationPage;
