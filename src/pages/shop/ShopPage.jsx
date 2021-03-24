import React from "react";
import { Route } from "react-router";
import CollectionsOverview from "../../components/collections-overview/collections-overview";
import Category from "../category/Category";
// import CollectionsOverview from "../../components/collections-overview/collections-overview";

const ShopPage = ({match}) => {
  return (
    <div className="shop-page">
       <Route exact path ={`${match.path}`} component={CollectionsOverview}/>
       <Route path={`${match.path}/:collectionId`} component={Category}/>
    </div>
  );
};

export default ShopPage;
