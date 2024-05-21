import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import Tree from "@/features/key/utils/key-builder";
import { Button } from "@/components/ui/button";
import KeyPrint from "@/features/key/components/key-print";
import SpeciesList from "@/features/key/components/species-list";

function TreeNavigationWrapper() {
  const router = useRouter();
  const [tree, setTree] = useState(null);
  let leadRecordIds = [];
    const result = localStorage.getItem('result');
    if (result) {
      leadRecordIds = JSON.parse(result);
      console.log(leadRecordIds);
    }

  useEffect(() => {


    axios.get("https://italic.units.it/api/v1/full-key").then((response) => {
      const data = response.data;
      const newTree = new Tree();
      newTree.buildTree(data);

      //let leadRecordIds = ["9999999999", "62929999", "867788888", "1774", "3206", "3281", '804', '2056', '4188', '689'];
      //let leadSpeciesIds = ["1774", "145"];

      //newTree.prune3(leadSpeciesIds);

        newTree.prune3(leadRecordIds);
      

      //console.log(newTree);

      setTree(newTree);

      /* setCurrentNode(newTree.root);
        setHistory([...history ,newTree.root]); */
    });
  }, []);
  if (!tree) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <TreeNavigation tree={tree} />
    </>
  );
}

function TreeNavigation({ tree }) {
  const [currentNode, setCurrentNode] = useState(tree.root);
  const [parentNode, setParentNode] = useState(null);
  const [info, setInfo] = useState({});
  const [history, setHistory] = useState([tree.root]);

  useEffect(() => {
    if (currentNode) {
      const child1HasSpecies = nodeHasSpecies(currentNode.children[0]);
      const child2HasSpecies = nodeHasSpecies(currentNode.children[1]);
      const numberOfLeaves = tree.getNumberOfUniqueLeaves(
        currentNode.data.leadId
      );
      const currentId = currentNode.data.leadId;
      const numberOfChildrenLeaves1 = tree.getNumberOfUniqueLeaves(
        currentNode.children[0]?.data.leadId
      );
      const numberOfChildrenLeaves2 = tree.getNumberOfUniqueLeaves(
        currentNode.children[1]?.data.leadId
      );
      const child1Text = currentNode.children[0]?.data.leadText || "N/A";
      const child2Text = currentNode.children[1]?.data.leadText || "N/A";
      const leadSpecies =
        currentNode.data.leadSpecies !== "no_species"
          ? currentNode.data.leadSpecies
          : "N/A";
      const child1Image = child1HasSpecies
        ? currentNode.children[0]?.data.speciesImage
        : currentNode.children[0]?.data.leadImage;
      const child2Image = child2HasSpecies
        ? currentNode.children[1]?.data.speciesImage
        : currentNode.children[1]?.data.leadImage;

      setInfo({
        currentId,
        numberOfLeaves,
        numberOfChildrenLeaves1,
        numberOfChildrenLeaves2,
        child1Text,
        child2Text,
        leadSpecies,
        child1Image,
        child2Image,
      });
    }
  }, [currentNode, tree]);

  const goToChild1 = () => {
    if (currentNode.children[0]) {
      setCurrentNode(currentNode.children[0]);
      setHistory([...history, currentNode.children[0]]);
    }
  };

  const goToChild2 = () => {
    if (currentNode.children[1]) {
      setCurrentNode(currentNode.children[1]);
      setHistory([...history, currentNode.children[1]]);
    }
  };

  const goToHistoryNode = (index) => {
    setCurrentNode(history[index]);
    setHistory(history.slice(0, index));
  };

  const goBack = () => {
    if (history.length > 1) {
      setCurrentNode(history[history.length - 2]);
      setHistory(history.slice(0, history.length - 1));
    }
  };
  return (
    <div>
      <div id="info">
        {info.currentId}
        <br />
        Number of leaves: {info.numberOfLeaves}
        <br />
        Number of leaves children: {info.numberOfChildrenLeaves1} ||{" "}
        {info.numberOfChildrenLeaves2}
        <br />
        Child 1 text: {info.child1Text}
        <br />
        Child 2 text: {info.child2Text}
        <br />
        Species: {info.leadSpecies}
        <br />
        Child 1 image:{" "}
        {info.child1Image && (
          <img
            key={info.child1Image}
            className="w-[200px]"
            src={`https://italic.units.it/flora/${info.child1Image}`}
            alt="Child 1"
          />
        )}
        <br />
        Child 2 image:{" "}
        <div className="w-[150px] h-[150px] object-contain">
          {info.child2Image && (
            <img
              key={info.child2Image}
              className="w-[200px]"
              src={`https://italic.units.it/flora/${info.child2Image}`}
              alt="Child 2"
            />
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <Button onClick={goToChild1}>Go to Child 1</Button>
        <Button onClick={goToChild2}>Go to Child 2</Button>
        <Button onClick={goBack}>Go Back</Button>
      </div>
      <div>
        <h2>History</h2>
        {history.map((node, index) => (
          <div key={index} onClick={() => goToHistoryNode(index)}>
            {node.data.leadId}: {node.data.leadText}
          </div>
        ))}
      </div>
      <SpeciesList
        key={`sp-${currentNode.data.leadId}`}
        tree={tree}
        currentNode={currentNode}
      />
      {/* <KeyPrint key={currentNode.data.leadId} tree={tree}  currentNode={currentNode} /> */}
    </div>
  );
}
export default TreeNavigationWrapper;

function nodeHasSpecies(node) {
  return node.children.length === 0;
}
