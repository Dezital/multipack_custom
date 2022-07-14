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
import store from "store-js";
import { useShowSuccess } from "./hooks/useShowSuccess";

import {  Modal, TextContainer } from "@shopify/polaris";

function FinalEdit({ productdata, setisShowEdit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [updatedmultipackquantity, setUpdatedMultipackQuantity] = useState(
    `${productdata.multipack_qty}`
  );
  const [updatedmultipackname, setUpdatedMultipackname] = useState(
    productdata.multipack_name
  );
  const [updatedmultipacksku, setUpdatedMultipacksku] = useState(
    `${productdata.multipack_varient_sku}`
  );
  const [updatedmultipackprice, setUpdatedMultipackprice] = useState(
    `${productdata.multipack_price}`
  );
  const [updatemultipackWeight, setUpdateMultipackweight] = useState(
    `${productdata.multipack_varient_weight}`
  );
  const [newmultipackqty, setNewMultipackQty] = useState();
  const [showSubmitbtn, isShowSubmitBtn] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const app = useAppBridge();

  //const [multipackSku,setMultipackSku]=useState()

  const handleChangeInput = (value) => {
    setNewMultipackQty(value);
  };

  const handlesubmit = () => {
    let newWeight = productdata.product_varient_weight * newmultipackqty;
    console.log(newWeight);
    setUpdateMultipackweight(`${newWeight}`);
    let updatedprice = productdata.product_varient_price * newmultipackqty;

    setUpdatedMultipackprice(`${updatedprice}`);
    let productsku =
      productdata.product_varient_sku + `-${newmultipackqty}packs`;
    setUpdatedMultipacksku(`${productsku}`);

    let totalqty = productdata.product_varient_quantity / newmultipackqty;
    totalqty = Math.floor(totalqty);
    setUpdatedMultipackQuantity(`${totalqty}`);

    let newname = productdata.product_name + `-${newmultipackqty}packs`;
    setUpdatedMultipackname(newname);

    isShowSubmitBtn(true);
  };

  const handleProductuplaod = async () => {
    setIsLoading(true);

    let multipackName = updatedmultipackname;
    let multipackquantity = newmultipackqty;
    let multipackprice = updatedmultipackprice;
    let multipackSku = updatedmultipacksku;
    let multipackweight = updatemultipackWeight;
    let multipackid = productdata.multipack_id;
    let multipackvarientid = productdata.multipack_varient_id;
    let totalqunatityofmultipacks = updatedmultipackquantity;
    console.log("sizeof multipack", multipackquantity);
    console.log("multipack quantity", updatedmultipackquantity);

    const token = await getSessionToken(app);
    const res = await fetch("/updateProduct", {
      method: "POST",
      body: JSON.stringify({
        multipackName,
        multipackquantity,
        multipackprice,
        multipackSku,
        multipackweight,
        multipackid,
        multipackvarientid,
        totalqunatityofmultipacks,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "text/plain",
      },
    });

    const respo = await fetch("/getProrductsList", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "text/plain",
      },
    });

    const resp = await respo.json();

    // console.log('3434')
    if (resp.status == "OK") {
      // console.log(resp);
      // setuserHistoryData(resp.data);

      store.set("orderdata", resp.data);
    }
    console.log("", setisShowEdit);
    setisShowEdit(false);

    setIsLoading(false);
    alert("Your Product updated successfully");
  };



  const handleOpenModal =()=>{
    setShowModal(true)

  }
  const handleDeleteButton = async (input) => {
    setShowModal(false)
   
    console.log( productdata.multipack_id);
    const multipackid = productdata.multipack_id;
    setIsLoading(true);
    const token = await getSessionToken(app);
    const res = await fetch("/deleteProduct", {
      method: "POST",
      body: JSON.stringify({
        multipackid,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "text/plain",
      },
    });
    let dataArray= store.get("orderdata");
   let data = dataArray.filter(
      (person) => person.multipack_id != productdata.multipack_id
    );
    // setdataArray(data)

    store.set("orderdata", data);

    setIsLoading(false);

    useShowSuccess("product deleted Successfully")
    setisShowEdit(false);

  };

  // const createMultipack = async () => {
  //   setIsLoading(true);
  //   let multipackquantity = quantityofMultipack;
  //   let multipackimg = productdata.productdata.images[0].originalSrc.split(
  //     "?v="
  //   )[0];
  //   let OrignalProductId = productdata.productdata.id.replace(
  //     "gid://shopify/Product/",
  //     ""
  //   );
  //   let OriginalProductquantity =
  //     productdata.productdata.variants[0].inventoryQuantity;

  //   let multipackProductType = productdata.productdata.productType;

  //   let multipackBarcode = productdata.productdata.variants[0].barcode;

  //   let multipackweightUnit = productdata.productdata.variants[0].weightUnit;

  //   let OrginalProductVarientId = productdata.productdata.variants[0].id.replace(
  //     "gid://shopify/ProductVariant/",
  //     ""
  //   );

  //   console.log("i am good");
  //   const token = await getSessionToken(app);
  //   const res = await fetch("/createMultipack", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       multipackName,
  //       multipackquantity,
  //       multipackprice,
  //       multipackimg,
  //       multipackdiscription,
  //       multipackSku,
  //       OrignalProductId,
  //       OriginalProductquantity,
  //       multipackProductType,
  //       multipackBarcode,
  //       multipackweight,
  //       OrginalProductVarientId,
  //       multipackweightUnit,
  //     }),
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-type": "text/plain",
  //     },
  //   });

  //   setIsLoading(false);
  //   // setLoadingd(false);
  // };

  return (
    <div>
      {isLoading ? (
        <div>
          <LoadingSpinner></LoadingSpinner>
        </div>
      ) : (
        <div></div>
      )}
      <Card sectioned>
        <div className="topbutton-div">
          <div className="input-field-of-div">
            <Form onSubmit={handlesubmit}>
              <FormLayout>
                <FormLayout.Group condensed>
                  <TextField
                    label="Enter Pack quantity to update"
                    value={newmultipackqty}
                    onChange={handleChangeInput}
                    autoComplete="off"
                    disabled={showButtons}
                  />
                </FormLayout.Group>
              </FormLayout>
            </Form>
          </div>
          <div className="button-div"></div>
        </div>

        <div className="New-Product-details">
          <div className="New-Product-Form-Section">
            <Form onSubmit={handleProductuplaod}>
              <FormLayout>
                {/* {error && (
              <InlineError message={errordata} fieldID="n"></InlineError>
            )} */}
                <TextField
                  value={updatedmultipackname}
                  onChange={() => {}}
                  label="Title"
                  type="text"
                  required
                  disabled
                />

                <div className="form-small-layout">
                  <div className="Input-fieds-child">
                    <TextField
                      value={updatedmultipacksku}
                      onChange={() => {
                        "";
                      }}
                      label="SKU"
                      type="text"
                      disabled
                    />
                  </div>

                  <div className="Input-fieds-child">
                    <TextField
                      value={updatedmultipackquantity}
                      onChange={() => {
                        "";
                      }}
                      label="New Product Quantity"
                      type="number"
                      disabled
                    />
                  </div>

                  <div className="Input-fieds-child">
                    <TextField
                      value={updatedmultipackprice}
                      onChange={() => {
                        "";
                      }}
                      label="New Product Price"
                      type="text"
                      disabled
                    />
                  </div>
                  <div className="Input-fieds-child">
                    <TextField
                      value={updatemultipackWeight}
                      onChange={() => {
                        "";
                      }}
                      label="New Product Weight"
                      type="text"
                      disabled
                    />
                  </div>
                </div>
                {showSubmitbtn == true && (
                  <div>
                    <Button primary submit>
                      Publish
                    </Button>
                  </div>
                )}
              </FormLayout>
            </Form>
          </div>
          <div className="New-Product-image-section">
            <h3>Product Image</h3>
            <div className="Img-border">
              <img
                className="new-product-img"
                src={productdata.multipack_img}
              />
            </div>
          </div>
        </div>
        {showButtons == true && (
          <div className="isTrue-div">
            <div className="isTrue-div-item">
              <Button primary  onClick={()=>{
                setShowButtons(false)
              }}>Edit</Button>
            </div>
            <div className="isTrue-div-item">
              <Button destructive onClick={handleOpenModal}>Delete</Button>
            </div>

            
          </div>
        )}
        {showModal ==true &&
           <div style={{ height: "500px" }}>
           <Modal
             activator={showModal}
             open={showModal}
             onClose={()=>{setShowModal(false)}}
             title="Delete Product"
             primaryAction={{
               content: "Confirm",
               
               onAction: ()=>{handleDeleteButton("input")}
             }}
             secondaryActions={[
               {
                 content: "Cancel",
                 onAction: ()=>{setShowModal(false)},
               },
             ]}
           >
             <Modal.Section>
               <TextContainer>
                 <p>
                   Are You sure you want to delte this product. this action can't be undone.
                 </p>
               </TextContainer>
             </Modal.Section>
           </Modal>
         </div>
        }
      </Card>
    </div>
  );
}

export default FinalEdit;
