import React, { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";
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

import { ResourcePicker, useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { toast, ToastContainer } from "react-toastify";
import { SettingsMajor } from "@shopify/polaris-icons";
import { SearchMajor } from "@shopify/polaris-icons";

import LoadingSpinner from "../components/LoadingSpinner";
import SettingsPage from "../components/SettingsPage";
import ProductDetails from "../components/ProductDetails";
import OrderTopTab from "../components/OrderTopTab";
import store from "store-js";
import { useShowError } from "../components/hooks/useShowError";
import HelpPage from "../components/HelpPage";
import TopHeader from "../components/TopHeader";
import PackCreationPage from "../components/PackCreationPage";

function index(props) {
  const [orders, SetOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingd, setShowSelectedProduct] = useState(false);

  const [showOrderDetails, SetShowOrderDetails] = useState(false);
  const [orderid, SetOrderId] = useState(undefined);
  const [orderdetails, SetOrderDetails] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [dispatcherName, setDispatcherName] = useState("");
  const [courier, setCourier] = useState("");

  const [error, setError] = useState(false);
  const [errordata, setErrorData] = useState("");
  const [userData, setUserData] = useState(false);
  const [ordernumber, setOrderNumber] = useState(null);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [setting, setSettings] = useState(false);
  const [selected, setSelected] = useState(false);
  const [pageToLoad, setPageToLoad] = useState(false);
  const [options, setOptions] = useState([]);
  const [activehelp, setActiveHelp] = useState(false);
  const [activehome, setActiveHome] = useState(true);
  const[data,setdata]=useState(1)


  const [productdata,setProductData]=useState();
  const [userHistory,setuserHistoryData]=useState()
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  useEffect(() => {

    getdata()
  }, []);



  const getdata = async() => {
    var seeit="rr"
   
    console.log("getting data")
    try {
      const token = await getSessionToken(app);
      const res = await fetch("/getProrductsList", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "text/plain",
        },
      });

  
      const resp=await  res.json();
     
      
      
      // console.log('3434')
      if (resp.status == "OK") {
        // console.log(resp);
        setuserHistoryData(resp.data);
        store.set("orderdata",resp.data)
      }
    } catch (error) {
     console.log("error",error)
    }
  };

  var refreshpage = 0;
  var id;

  const handleSelectChange = useCallback(
    (value, label) => (console.log(label), setCourier(value)),
    []
  );

  const handleSettings = () => {
    setSettings(true);
  };

  const handleChangeDispatcher = (value) => {
    setDispatcherName(value);
  };

  const handleChangeCourier = (value) => {
    setCourier(value);
  };

  //submit dispatcher form
  const handleSubmitForm = (e) => {
    if (dispatcherName.length <= 0) {
      setError(true);
      setErrorData("Dispater Name is required");
    } else if (courier.length <= 0) {
      setError(true);
      setErrorData("Courier Name is required");
    } else {
      setError(false);
      setUserData(true);
      store.set("selectedCourier", courier);
      store.set("selectedDispatcher", dispatcherName);
      var ourcompanies = store.get("CarrierCompanies");
      ourcompanies.map((val) => {
        if (val.name == courier) {
          store.set("selectedUrl", val.url);
        }
      });
    }
  };

  



 const handleProductSelection=(item)=>{
   
    //setProductData(payload.selection[0])
    setSelected(false);
    setProductData(item)
    setPageToLoad(!pageToLoad);
    setShowSelectedProduct(true);
  }
  const handleChangeOrder = (value) => {
    setOrderNumber(value);
  };
  //submit order id to get orders details
  const handleOrderidSubmit = async (e) => {
    setLoading(true);
    const token = await getSessionToken(app);
    const res = await fetch("/ordersNumber", {
      method: "POST",
      body: JSON.stringify({ ordernumber }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "text/plain",
      },
    });
    const responseData = await res.json();
    if (responseData.status == "OK") {
      SetOrderDetails(responseData.data);
      if (responseData.data.fulfillment_status == "fulfilled") {
        playErrorSound("This Order is already Fullfilled");

        setLoading(false);
      } else {
        setOrderItems(responseData.data.line_items);
        SetShowOrderDetails(true);
        setUserData(false);
      }
    } else {
      playErrorSound("Invalid order Number");
    }

    setLoading(false);
    setOrderNumber("");


  };

  //loading screen for index page
  if (loading) {
    return (
      <Page>
        <div style={{ height: "100px" }}>
          <Frame>
            <Loading />
          </Frame>
        </div>
      </Page>
    );
  }

  //setting screen
  if (setting) {
    return (
      <SettingsPage
        setActiveHelp={setActiveHelp}
        setSettings={setSettings}
        setActiveHome={setActiveHome}
        activehome={activehome}
        activehelp={activehelp}
        setting={setting}
        userHistory={userHistory}
        
        
      ></SettingsPage>
    );
  }
  // order details screen like where main loading shows
  if (showOrderDetails) {
    return (
      <div className="orderdetails-container">
        {loadingOpen && <LoadingSpinner></LoadingSpinner>}
        <div className="button-div">
          <Button
            onClick={() => {
              SetShowOrderDetails(false);
              setUserData(true);
            }}
          >
            Back
          </Button>
        </div>

        <div className="product details div">
          <ProductDetails
            orderdetails={orderdetails}
            orderItems={orderItems}
            setOrderItems={setOrderItems}
            setLoadingOpen={setLoadingOpen}
            setUserData={setUserData}
            SetShowOrderDetails={SetShowOrderDetails}
            dispatcherName={dispatcherName}
            courier={courier}
          ></ProductDetails>
        </div>

        <ToastContainer></ToastContainer>
      </div>
    );
  }
  //settings for users
  if (activehelp) {
    return (
      <HelpPage
        setActiveHelp={setActiveHelp}
        setSettings={setSettings}
        setActiveHome={setActiveHome}
        activehome={activehome}
        activehelp={activehelp}
        setting={setting}
      ></HelpPage>
    );
  }
  if (loadingd) {
    return (
      <div>
         <TopHeader
          setActiveHelp={setActiveHelp}
          setSettings={setSettings}
          setActiveHome={setActiveHome}
          activehome={activehome}
          activehelp={activehelp}
          setting={setting}
        ></TopHeader>


        <PackCreationPage
        productdata={productdata}
        setShowSelectedProduct={setShowSelectedProduct}
        

        >
          
        </PackCreationPage>
       
        
       
      </div>
    );
  }

  // screen to scan order number

  //main screen to fetch tracking number and details
  return (
    <div>
      <TopHeader
        setActiveHelp={setActiveHelp}
        setSettings={setSettings}
        setActiveHome={setActiveHome}
        activehome={activehome}
        activehelp={activehelp}
        setting={setting}
      ></TopHeader>
      <div className="pageclass">
        <Page>
          <ResourcePicker

            resourceType="Product"
            open={selected}
            selectMultiple={false}
            onCancel={() => {
              setSelected(false);
            }}
            onSelection={(payload) => {
              console.log(payload.selection[0])
              // setProductSelected(true);
              handleProductSelection(payload.selection[0])
            
            }}
          ></ResourcePicker>
        </Page>
        <Card>
          <EmptyState
            heading="Start Creating Product Multipack "
            action={{
              content: "Select Product",
              onAction: () => {
                setSelected(true);
              },
            }}
            // secondaryAction={{
            //   content: "Learn more",
            //   url: "https://help.shopify.com",
            // }}
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <p>Click on the button below to select product you want to create multipack for. </p>
          </EmptyState>
        </Card>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default index;
