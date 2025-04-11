import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CategoriesMainSection from "./CategoriesMainSection/CategoriesMainSection";

function Category() {
  const { id: sectionId } = useParams();
  console.log("sectionId", sectionId);
  console.log("sectionId", sectionId);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  console.log("sectionId from footer", sectionId);
  return (
    <>
      <CategoriesMainSection sectionId={sectionId} />
    </>
  );
}

export default Category;
