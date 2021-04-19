import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import WithSpiner from "../../components/with-spinner/WithSpiner";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop-selector";
import Category from "./Category";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionsLoaded(state),
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpiner
)(Category);

export default CollectionPageContainer;
