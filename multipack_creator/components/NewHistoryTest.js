import {
  IndexTable,
  TextStyle,
  Card,
  useIndexResourceState,
  Thumbnail,
} from "@shopify/polaris";
import React from "react";

function NewHistoryTest({setisShowEdit,dataArray}) {
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

  const customers = [
    {
      id: "3413",
      url: "customers/341",
      name: "Mae Jemison",
      location: "Decatur, USA",
      orders: 20,
      amountSpent: "$2,400",
      multipack_img:
        "https://cdn.shopify.com/s/files/1/0553/1690/6057/products/ESRTG93022.jpg",
    },
    {
      id: "2563",
      url: "customers/256",
      name: "Ellen Ochoa",
      location: "Los Angeles, USA",
      orders: 30,
      amountSpent: "$140",
      multipack_img:
        "https://cdn.shopify.com/s/files/1/0553/1690/6057/products/ESRTG93022.jpg",
    },
  ];
  const resourceName = {
    singular: "Multipack",
    plural: "Multipacks",
  };

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
  } = useIndexResourceState(customers);

  const promotedBulkActions = [
    {
     
    }
  ];
  const bulkActions = [
   
  ];

  const rowMarkup = dataArray.map((value, index) => (
    <IndexTable.Row
      id={value.id}
      key={value.id}
      selected={selectedResources.includes(value.id)}
      position={value.id}
    >
      <IndexTable.Cell>
        <div
            
          role="button"
          onClick={() => {
            console.log("hello jan");
          }}
        >
          <Thumbnail source={value.multipack_img} size="large" alt="Small document" />
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <div
        className="Multipack-table-list-name"
          role="button"
          onClick={(input) => {
            console.log("hello jan",);
          }}
        >
          <TextStyle className="" variation="strong">{value.multipack_name}</TextStyle>
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell>{value.multipack_price}</IndexTable.Cell>
      <IndexTable.Cell>{value.newtotal_qty}</IndexTable.Cell>
     
    </IndexTable.Row>
  ));

  return (
    <Card>
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        bulkActions={bulkActions}
        promotedBulkActions={promotedBulkActions}
        headings={[
          {title: ""},
          { title: "Name" },
          { title: "Multipack Price" },
          { title: "Multipack Quantity" },
        
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}
export default NewHistoryTest;
