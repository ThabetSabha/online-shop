import React, { useEffect, lazy, Suspense } from 'react';
//Router
import { Route, Switch, useRouteMatch } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { selectIsCollectionLoading } from '../../redux/shop/shop.selectors';

//Components
import Spinner from '../../Components/spinner/spinner.component';
import NotFoundPage from '../not-found-page/not-found-page.component';

const ProductPage = lazy(() => import('../../Components/product-page/product-page.component'));
const CollectionOverview = lazy(() => import('../../Components/collection-overview/collection-overview.component'));
const CollectionPage = lazy(() => import('../collection/collection.component'));



const ShopPage = () => {
    const dispatch = useDispatch();
    const IsCollectionLoading = useSelector(selectIsCollectionLoading);
    const match = useRouteMatch();

    useEffect(() => {
        dispatch(fetchCollectionsStart());
    }, [dispatch])

    return (
        <div>
            <Suspense fallback={<Spinner />}>
                <Switch>
                    <Route exact path={`${match.path}/`} >
                        {
                            IsCollectionLoading ?
                                <Spinner /> :
                                <CollectionOverview />
                        }
                    </Route>
                    <Route exact path={`${match.path}/:collectionId`} >
                        {
                            IsCollectionLoading ?
                                <Spinner /> :
                                <CollectionPage />
                        }
                    </Route>
                    <Route exact path={`${match.path}/:collectionId/:itemId`}>
                        {
                            IsCollectionLoading ?
                                <Spinner /> :
                                <ProductPage />
                        }
                    </Route>
                    <Route path="*">
                        <NotFoundPage/>
                    </Route>
                </Switch>
            </Suspense>

        </div>
    )
}

export default ShopPage;









/* The Spinner can be an HOC :
    //We can also just export default WithSpinner(...) in their respective files.
        const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
        const CollectionPageWithSpinner = WithSpinner(CollectionPage);


        <div>
            <Route exact path={`${match.path}/`} >
                <CollectionOverviewWithSpinner isLoading={IsCollectionLoading} />
            </Route>

        //Here we need render in Route to pass the props, and to render a components (component = {} won't work)
            <Route
                exact
                path={`${match.path}/:collectionId`}
                render={(props) => <CollectionPageWithSpinner isLoading={IsCollectionLoading}  {...props} />}
            />
        </div>
*/

