import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";


function getNodeList(tree, currentNode) {
  const nodeList = tree.getTreeAsList(currentNode);
  const nodelistData = nodeList.map((node) => ({
    parentId: node.parentId,
    leadText: node.leadText,
    leadId: node.leadId,
    leadImage: node.speciesImage || node.leadImage
  }));
  return nodelistData;
}
export default function KeyPrint({ tree, currentNode }) {
  const data = getNodeList(tree, currentNode);
  const itemsPerPage = 50; // number of items to render at a time
  const [page, setPage] = useState(1);
  console.log(page * itemsPerPage);
  console.log(currentNode);
  
  const items = data.slice(0, page * itemsPerPage);

  // Function to fetch the next set of items
  const fetchMoreItems = () => {
    setTimeout(() => {
      setPage(page + 1);
    }, 2000);
  };

  return (

      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreItems}
        hasMore={items.length < data.length}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          <div key={`a-${index}`}>
            {item.parentId}|{item.leadText}| {item.leadId}
            <div className="w-[100px] h-[50px] object-contain overflow-clip">
              <img src={`https://italic.units.it/flora/${item.leadImage}`} alt="" />
            </div>
       
          </div>
        ))}
      </InfiniteScroll>

  );
}
