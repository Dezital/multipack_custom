import { Button, Card, Tabs, Thumbnail } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { MobileBackArrowMajor } from "@shopify/polaris-icons";
import FormsAddTags from "./FormsAddTags";
import ShippinfCarrier from "./ShippingCarrier";
import AdvanceCheckbox from "./AdvanceCheckbox";
import store from "store-js";
import PartialFormTags from "./PartialFormTags";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";
import LoadingSpinner from "./LoadingSpinner";

import TopHeader from "./TopHeader";
import FinalEdit from "./FinalEdit";
import NewHistoryTest from "./NewHistoryTest";

function HistoryComponents() {
  const [selected, setSelected] = useState(0);
  const [loaded, setLoaded] = useState(true);
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowEdit, setisShowEdit] = useState(false);
  const [productdata, setProductData] = useState();
  const [dataArray, setdataArray] = useState([]);
  const app = useAppBridge();
  const [isdata, setisdata] = useState(true);
  var multipackid;
  var multipackname;
  var multipackimg;
  var multipackquantity;
  var multipack_varient_id;
  var multipackSku;
  var multipackprice;
  var product_varient_sku;
  let inut = {};

  useEffect(() => { 
  }, []);



  const handleEditButton = (input) => {
    console.log(input.value.multipack_id);
    
    multipackname = input.value.multipack_name;
    multipackid = input.value.multipack_id;
    multipackimg = input.value.multipack_img;
    multipackquantity = input.value.multipack_qty;
    multipack_varient_id = input.value.multipack_varient_id;
    multipackSku = input.value.multipack_varient_sku;
    multipackprice = input.value.multipack_price;
    product_varient_sku = input.value.product_varient_sku;

    inut = input.value;
    setProductData(input.value);

    setIsLoading(true);
    console.log("why its not loading");
    setisShowEdit(true);
    setIsLoading(false);
  };
  useEffect(() => {
    setIsLoading(false);
    console.log("we are in use effect");
    let data = store.get("orderdata");
    setdataArray(data);
        console.log('data length',data.length)
    if (data.length > 0) {
      setisdata(true);
    } else {
      setisdata(true);
    }
   
  }, [isShowEdit]);

  if (isShowEdit == true) {
    return (
      <FinalEdit
        productdata={productdata}
        inut={inut}
        multipack_name={multipackname}
        multipackid={multipackid}
        multipackimg={multipackimg}
        multipackquantity={multipackquantity}
        multipack_varient_id={multipack_varient_id}
        multipackSku={multipackSku}
        multipackprice={multipackprice}
        product_varient_sku={product_varient_sku}
        setisShowEdit={setisShowEdit}
      ></FinalEdit>
    );
  }

  const arr = [
    {
      id: 8,
      multipack_name:
        '"sign Here" Page Flag Dispenser Refill Rolls, 0.56" Wide, Red, 120-roll, 2 Rolls-pack-5Packs',
      multipack_id: 2147483647,
      multipack_price: 425,
      multipack_img:
        "https://cdn.shopify.com/s/files/1/0553/1690/6057/products/ESRTG93022.jpg",
      multipack_qty: 5,
      multipack_varient_id: "40052875165769",
      multipack_varient_sku: "RTG93022-5Packs",
      multipack_varient_barcode: "012534930227",
      multipack_varient_weight: "5.236",
      product_id: 2147483647,
      product_varient_id: 2147483647,
      created_at: "toady",
      updated_at: "yesterday",
      product_varient_quantity: "222",
      product_varient_sku: "RTG93022",
      product_varient_weight: "3",
      product_varient_price: 34,
      product_name:
        "sign Here Page Flag Dispenser Refill Rolls, 0.56 Wide, Red, 120-roll, 2 Rolls-pack",
      setSchedule: 0,
    },
    {
      id: 8,
      multipack_name:
        '"sign Here" Page Flag Dispenser Refill Rolls, 0.56" Wide, Red, 120-roll, 2 Rolls-pack-5Packs',
      multipack_id: 2147483647,
      multipack_price: 425,
      multipack_img:
        "https://cdn.shopify.com/s/files/1/0553/1690/6057/products/ESRTG93022.jpg",
      multipack_qty: 5,
      multipack_varient_id: "40052875165769",
      multipack_varient_sku: "RTG93022-5Packs",
      multipack_varient_barcode: "012534930227",
      multipack_varient_weight: "5.236",
      product_id: 2147483647,
      product_varient_id: 2147483647,
      created_at: "toady",
      updated_at: "yesterday",
      product_varient_quantity: "222",
      product_varient_sku: "RTG93022",
      product_varient_weight: "3",
      product_varient_price: 34,
      product_name:
        "sign Here Page Flag Dispenser Refill Rolls, 0.56 Wide, Red, 120-roll, 2 Rolls-pack",
      setSchedule: 0,
    },
  ];

  return (
    <div>
      <div>
        {isLoading ? (
          <div>
            <LoadingSpinner></LoadingSpinner>
          </div>
        ) : (
          <div></div>
        )}
         
        <div className="div-prod-table">
              <div className="div-prod-checkbox"></div>
              <div className="div-prod-img">
              {/* <Thumbnail source={value.multipack_img} size="large" alt="Small document" /> */}

              </div>
              <div className="div-prod-title">
              <div className="title-text">Name</div>
              </div>
              <div className="div-prod-price">
                Multipack Price

              </div>
              <div className="div-prod-price">
              Multipack Quantity
              </div>
            </div>
        {isdata == true &&
          dataArray.map((value, index) => (
            
            <div className="div-prod-table" role="button"
            onClick={() => {
              handleEditButton({ value });
            }}>
              <div className="div-prod-checkbox"></div>
              <div className="div-prod-img">
              <Thumbnail source={value.multipack_img} size="large" alt="Small document" />

              </div>
              <div className="div-prod-title div-title-name">
              <div className="title-text">{value.multipack_name}</div>
              </div>
              <div className="div-prod-price">
              {value.multipack_price}

              </div>
              <div className="div-prod-price">
              {value.newtotal_qty}
              </div>
            </div>
            
          ))}
      </div>
    </div>
  );
}

export default HistoryComponents;
