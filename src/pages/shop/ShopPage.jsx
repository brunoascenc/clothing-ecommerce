import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import { createStructuredSelector } from "reselect";

import CollectionsOverview from "../../components/collections-overview/collections-overview";
import WithSpiner from "../../components/with-spinner/WithSpiner";
// import {
//   firestore,
//   converCollectionsSnapshotToMap,
// } from "../../firebase/firebase.utils";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop-actions";
import { selectIsCollectionFetching } from "../../redux/shop/shop-selector";
import Category from "../category/Category";

const CollectionsOverviewWithSpinner = WithSpiner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpiner(Category);

class ShopPage extends React.Component {
  // state = {
  //   loading: true,
  // };

  // unsubscribeFromSnapshot = null;

  componentDidMount() {
    const {fetchCollectionsStartAsync} = this.props
    fetchCollectionsStartAsync()
    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection("collections");

    // collectionRef.onSnapshot(async (snapshot) => {
    //   const collectionsMap = converCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
  }

  render() {
    const { match, isCollectionFetching } = this.props;
    // const { loading } = this.state;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching
})

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
