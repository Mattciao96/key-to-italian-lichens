import InfiniteScroll from "react-infinite-scroll-component";
import React, { useState } from "react";


export default function SpeciesList({ tree, currentNode }) {
  const itemsPerPage = 50; // number of items to render at a time
  const [page, setPage] = useState(1);

  let currentTaxa = tree.getLeaves(currentNode.data.leadId).map((leaf) => leaf.data.leadSpecies)
  currentTaxa = sortAndRemoveDuplicates(currentTaxa);
  let allTaxa = tree.getLeaves(tree.getRootNodeLeadId()).map((leaf) => leaf.data.leadSpecies)
  allTaxa = sortAndRemoveDuplicates(allTaxa);

  const taxaDiff = compareArrays(allTaxa, currentTaxa);

 
  const items = taxaDiff.slice(0, page * itemsPerPage);

  const fetchMoreItems = () => {
    setTimeout(() => {
      setPage(page + 1);
    }, 2000);
  };
  
  //const remainingTaxa = 
  
  
  return (
    <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreItems}
        hasMore={items.length < taxaDiff.length}
        loader={<h4>Loading...</h4>}
      >
      {items.map((taxa, index) => <li key={index} className={taxa.visible ? 'text-green-300': 'text-red-500'}>{ taxa.name}</li>
        
      )}
    </InfiniteScroll>
  );
}

function sortAndRemoveDuplicates(array) {
  return Array.from(new Set(array)).sort();
}

function compareArrays(mother, children) {
  let i = 0;
  let j = 0;
  const result = [];

  while (i < mother.length) {
    if (mother[i] === children[j]) {
      result.push({ name: mother[i], visible: true });
      i++;
      j++;
    } else if (mother[i] < children[j] || j === children.length) {
      result.push({ name: mother[i], visible: false });
      i++;
    } else if (mother[i] > children[j]) {
      j++;
    }
  }

  return result;
}



export function CurrentSpeciesList({ tree, currentNode }) {
  const itemsPerPage = 50; // number of items to render at a time
  const [page, setPage] = useState(1);

  let currentTaxa = tree.getLeaves(currentNode.data.leadId).map((leaf) => leaf.data.leadSpecies)
  currentTaxa = sortAndRemoveDuplicates(currentTaxa);

  const items = currentTaxa.slice(0, page * itemsPerPage);

  const fetchMoreItems = () => {
    setTimeout(() => {
      setPage(page + 1);
    }, 1000);
  };

  return (
    <>
      <div className="my-4">List of species:</div>
    <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreItems}
        hasMore={items.length < currentTaxa.length}
        loader={<h4>Loading...</h4>}
      >
      {items.map((taxa, index) => <li key={index}>{taxa}</li>)}
      </InfiniteScroll>
      </>
  );
}