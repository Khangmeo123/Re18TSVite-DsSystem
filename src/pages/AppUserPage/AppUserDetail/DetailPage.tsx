import PageHeader from "components/PageHeader/PageHeader";
import "./DetailPage.scss";
import LayoutDetail from "components/LayoutDetail/LayoutDetail";
import { Col, Row, Switch as SwitchAntd } from "antd";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  APP_OVERVIEW,
  APP_USER_EDIT_ROUTE,
  APP_USER_MASTER_ROUTE,
  APP_USER_VIEW_ROUTE,
} from "config/route-const";
import EditPage from "./EditPage/EditPage";
import ViewPage from "./ViewPage/ViewPage";
import Alert from "components/Alert/Alert";
import { ArrowRight, Camera } from "@carbon/icons-react";
import {
  OverflowMenu,
  UPLOADTYPE_IMAGE,
  UploadImage,
} from "react-components-design-system";
import { useDetailHook } from "./DetailHook";
import { appUserRepository } from "../AppUserRepository";
import { AppUserSubSystemMapping } from "models/AppUserSubSystemMapping";

const AppUserDetail = () => {
  const {
    translate,
    path,
    appUser,
    adminType,
    menuOverflow,
    setAppUser,
    handleUpdateSubSystem,
    isEditable,
    handleUpdateAvatar,
    handleGoAppUserTypeAdmin,
  } = useDetailHook();

  return (
    <div className="page-detail__app-user">
      <PageHeader
        title={`${translate("appUsers.detail.title")} - ${appUser.displayName}`}
        breadcrumbs={[
          {
            name: translate("appUsers.master.breadcrumb1"),
            path: APP_OVERVIEW,
          },
          {
            name: translate("appUsers.master.breadcrumb2"),
            path: APP_USER_MASTER_ROUTE,
          },
        ]}
        theme="dark"
      />
      <div className="app-user__avatar">
        <UploadImage
          currentAvatar={appUser?.url}
          className="avatar__upload-image"
          type={UPLOADTYPE_IMAGE.AVATAR}
          uploadAvatar={appUserRepository.upload}
          updateAvatar={handleUpdateAvatar}
          icon={<Camera size={24} />}
        />
      </div>
      <LayoutDetail className="app-user__wrapper">
        <Row className="p-l--2xl p-r--lg p-t--sm">
          <Col span={7}>
            <Alert
              avatar={adminType.icon}
              title={adminType.name}
              content={translate(adminType.description)}
              bgColor={adminType.bgColor}
              action={
                <>
                  <span>{translate("appUsers.actions.goToAdmin")}</span>
                  <ArrowRight size={16} className="m-l--2xs" />
                </>
              }
              handleAction={handleGoAppUserTypeAdmin}
            />
            <div className="app-user__application m-t--sm p-l--sm">
              <div className="application__title">
                {translate("appUsers.applicationTitle")}
              </div>
              <div className="application__content m-t--sm">
                {translate(adminType.subSystemDescription)}
              </div>
              <div className="application__list m-t--sm">
                {appUser.appUserSubSystemMappings &&
                  appUser.appUserSubSystemMappings.length > 0 &&
                  appUser.appUserSubSystemMappings.map(
                    (mapping: AppUserSubSystemMapping) => {
                      return (
                        <div
                          className="list__item"
                          key={mapping?.subSystem?.id}
                        >
                          <div className="item__info p-x--2xs p-y--xs">
                            <div>{mapping?.subSystem?.name}</div>
                            {/* <div>{mapping?.subSystem.path}</div> */}
                          </div>
                          <SwitchAntd
                            size="small"
                            checked={mapping?.statusId === 1 ? true : false}
                            disabled={mapping?.subSystem?.disabled}
                            onChange={handleUpdateSubSystem(mapping.subSystem)}
                          />
                          {isEditable && (
                            <OverflowMenu
                              list={menuOverflow(mapping)}
                            ></OverflowMenu>
                          )}
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          </Col>
          <Col span={17}>
            <Switch>
              <Route path={APP_USER_EDIT_ROUTE}>
                <EditPage appUser={appUser} updateAppUser={setAppUser} />
              </Route>
              <Route path={APP_USER_VIEW_ROUTE}>
                <ViewPage appUser={appUser} isEditable={isEditable} />
              </Route>
              <Route exact path={path}>
                <Redirect to={APP_USER_VIEW_ROUTE} />
              </Route>
            </Switch>
          </Col>
        </Row>
      </LayoutDetail>
    </div>
  );
};

export default AppUserDetail;
