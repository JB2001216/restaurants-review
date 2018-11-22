import React, { useEffect } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loadPlaces } from "../actions/placeListActions";
import { List } from "../components/List";
import { Loading } from "../components/Loading";
import { PaginationControls } from "../components/PaginationControls";
import { LoadPlacesDto } from "../models/LoadPlacesDto";
import { Page } from "../models/Page";
import { RequestStatus } from "../models/RequestStatus";
import { State } from "../reducers";
import {
  makeGetPlaceListPage,
  makeGetPlaceListRequestStatus
} from "../selectors/placeListSelectors";

/**
 * External props
 */
interface OwnProps {
  /**
   * Load user's own places
   */
  own?: boolean;

  /**
   * Filter places by rating
   */
  ratingFilter?: number;

  /**
   * Current page
   */
  currentPage: number;

  /**
   * Item renderer
   */
  renderItem: (id: string) => React.ReactNode;

  /**
   * Next page callback
   */
  onNext: () => void;

  /**
   * Previous page callback
   */
  onPrev: () => void;
}

/**
 * Connected State Props
 */
interface StateProps {
  /**
   * Page entity containing place ids
   */
  page?: Page<string>;

  /**
   * Request status for the current page
   */
  requestStatus: RequestStatus<LoadPlacesDto>;
}

/**
 * Connected dispatch props
 */
interface DispatchProps {
  /**
   * Request places to be loaded
   */
  onLoadPlaces: (criteria: LoadPlacesDto) => void;
}

/**
 * Combined component props
 */
interface Props extends OwnProps, StateProps, DispatchProps {}

/**
 * State mapping
 */
const makeMapStateToProps = (): Selector<State, StateProps, OwnProps> =>
  createStructuredSelector({
    page: makeGetPlaceListPage(),
    requestStatus: makeGetPlaceListRequestStatus()
  });

/**
 * Component enhancer
 */
const enhance = connect(
  makeMapStateToProps,
  { onLoadPlaces: loadPlaces.request }
);

/**
 * Place List Container
 */
const BasePlaceListContainer = ({
  own,
  ratingFilter,
  currentPage,
  page,
  requestStatus,
  onLoadPlaces,
  renderItem,
  onPrev,
  onNext
}: Props) => {
  useEffect(
    () => {
      onLoadPlaces(
        own
          ? {
              own: true,
              page: currentPage
            }
          : {
              rating: ratingFilter,
              page: currentPage
            }
      );
    },
    [own, ratingFilter, currentPage]
  );

  if (page === undefined) {
    return <Loading />;
  }

  if (page.items.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <List items={page.items} renderItem={renderItem} />
      <PaginationControls
        hasPrev={page.prevPageExists}
        hasNext={page.nextPageExists}
        onPrev={onPrev}
        onNext={onNext}
      />
    </React.Fragment>
  );
};

/**
 * Export enhanced component
 */
export const PlaceListContainer = enhance(BasePlaceListContainer);
