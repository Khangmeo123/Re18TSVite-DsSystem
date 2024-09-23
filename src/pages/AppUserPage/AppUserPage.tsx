import { ProtectedRoute } from "core/pages/Authentication/ProtectedRoute";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import AppUserMasterPage from "./AppUserMaster/AppUserMasterPage";
import AppUserDetailPage from "./AppUserDetail/AppUserDetailPage";
import {
  APP_USER_DETAIL_ROUTE,
  APP_USER_MASTER_ROUTE,
} from "config/route-const";
import { Helmet } from "react-helmet";

function AppUserPage() {
  const { path } = useRouteMatch();

  return (
    <>
      <Helmet>
        <title>Portal | AppUserPage</title>
      </Helmet>
      <Switch>
        <ProtectedRoute
          path={APP_USER_MASTER_ROUTE}
          key={APP_USER_MASTER_ROUTE}
          component={AppUserMasterPage}
          auth={true}
        />
        <ProtectedRoute
          path={APP_USER_DETAIL_ROUTE}
          key={APP_USER_DETAIL_ROUTE}
          component={AppUserDetailPage}
          auth={true}
        />
        <Route exact path={path}>
          <Redirect to={APP_USER_MASTER_ROUTE} />
        </Route>
      </Switch>
    </>
  );
}

export { AppUserMasterPage, AppUserDetailPage };
export default AppUserPage;
