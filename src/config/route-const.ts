import { ROOT_ROUTE } from "core/config/consts";
import { join } from "path";

// Portal Route:
export const PORTAL_ROUTE = "/portal";
export const PORTAL_APP_CATALOG_ROUTE = "/app-catalog";
export const PORTAL_LANDING_PAGE_ROUTE = "/landing-page";
export const PORTAL_APP_USER_ROUTE = join(PORTAL_ROUTE, "/app-user");

export const APP_ROUTE = join(ROOT_ROUTE, PORTAL_ROUTE);

// Dashbroad Route:
export const DASHBROAD_ROUTE = join(APP_ROUTE, "/dashbroad");
// AppUser Route:
export const APP_USER_ROUTE = join(APP_ROUTE, "/app-user");
export const APP_USER_MASTER_ROUTE = join(APP_USER_ROUTE, "/app-user-master");
export const APP_USER_DETAIL_ROUTE = join(APP_USER_ROUTE, "/app-user-detail");
export const APP_USER_VIEW_ROUTE = join(APP_USER_DETAIL_ROUTE, "/view");
export const APP_USER_EDIT_ROUTE = join(APP_USER_DETAIL_ROUTE, "/edit");
// Organization Type Route:
export const ORGANIZATION_TYPE_ROUTE = join(APP_ROUTE, "/organization-type");
export const ORGANIZATION_TYPE_MASTER_ROUTE = join(
  ORGANIZATION_TYPE_ROUTE,
  "/organization-type-master"
);
// Overview Route:
export const APP_OVERVIEW = join(APP_ROUTE, "/overview");
export const APP_USER_ADMIN_TYPE_MASTER_ROUTE = join(
  APP_USER_ROUTE,
  "/app-user-admin-master"
);
