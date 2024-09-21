import { View, ViewOff } from "@carbon/icons-react";
import { Col, Row } from "antd";
import { APP_USER_VIEW_ROUTE } from "config/route-const";
import { utilService } from "core/services/common-services/util-service";
import { detailService } from "core/services/page-services/detail-service";
import { AppUser } from "models/AppUser";
import React, { useContext, useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {
  Drawer,
  FormItem,
  InputText,
  NUMBER_BUTTON,
} from "react-components-design-system";
import { appUserRepository } from "pages/AppUserPage/AppUserRepository";
import {
  AppUserMaster,
  AppUserMasterContext,
} from "../AppUserMaster/MasterHook";

export interface AppUserCreateDrawerType {
  handleOpen: () => void;
}

const CreateDrawer = React.forwardRef<AppUserCreateDrawerType, unknown>(
  function CreateDrawer(props, ref) {
    const [translate] = useTranslation();
    const history = useHistory();
    const appUserMaster = useContext<AppUserMaster>(AppUserMasterContext);
    const { handleLoadList } = appUserMaster;

    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const defaultModel: AppUser = React.useMemo<AppUser>(() => {
      return new AppUser();
    }, []);

    const {
      model,
      isOpenDrawer,
      loadingDrawer,
      handleOpenDrawer,
      handleSaveModel,
      handleSaveModelPromise,
      handleCloseDrawer,
      handleChangeSingleField,
    } = detailService.useDrawer<AppUser>(
      AppUser,
      appUserRepository.get,
      appUserRepository.save,
      handleLoadList,
      defaultModel
    );

    const handleRandomPassword = React.useCallback(() => {
      appUserRepository.randomPassword().subscribe({
        next: (res: string) => {
          if (res) {
            handleChangeSingleField({ fieldName: "password" })(res);
            setShowPassword(true);
          }
        },
      });
    }, [handleChangeSingleField]);

    const handleSaveThenGoDetail = React.useCallback(() => {
      handleSaveModelPromise().then((res: AppUser) => {
        history.push({
          pathname: APP_USER_VIEW_ROUTE,
          search: `?appUserId=${res.id}`,
        });
      });
    }, [handleSaveModelPromise, history]);

    useImperativeHandle(ref, () => ({
      handleOpen: handleOpenDrawer,
    }));

    return (
      <Drawer
        loading={loadingDrawer}
        visible={isOpenDrawer}
        handleApplyNext={handleSaveThenGoDetail}
        handleSave={handleSaveModel}
        handleCancel={handleCloseDrawer}
        handleClose={handleCloseDrawer}
        visibleFooter={true}
        title={translate("general.actions.create")}
        titleButtonCancel={translate("general.actions.close")}
        titleButtonApply={translate("general.actions.save")}
        titleButtonApplyNext={translate("general.actions.saveAndView")}
        numberButton={NUMBER_BUTTON.THREE}
        size={"lg"}
      >
        <div className="page page__detail">
          <div className="w-100 page__detail-tabs">
            <Row className="d-flex" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <form autoComplete="off"></form>
              <Col lg={24} className="m-b--xs m-t--xs">
                <FormItem
                  validateObject={utilService.getValidateObj(model, "code")}
                >
                  <InputText
                    isRequired
                    label={translate("appUsers.code")}
                    type={0}
                    value={model?.code}
                    placeHolder={translate("appUsers.placeholder.code")}
                    className={"tio-account_square_outlined"}
                    onChange={handleChangeSingleField({
                      fieldName: "code",
                    })}
                  />
                </FormItem>
              </Col>

              <Col lg={24} className="m-b--xs m-t--xs">
                <FormItem
                  validateObject={utilService.getValidateObj(
                    model,
                    "displayName"
                  )}
                >
                  <InputText
                    isRequired
                    label={translate("appUsers.displayName")}
                    type={0}
                    value={model?.displayName}
                    placeHolder={translate("appUsers.placeholder.displayName")}
                    className={"tio-account_square_outlined"}
                    onChange={handleChangeSingleField({
                      fieldName: "displayName",
                    })}
                  />
                </FormItem>
              </Col>

              <Col lg={24} className="m-b--xs m-t--xs">
                <FormItem
                  validateObject={utilService.getValidateObj(model, "email")}
                >
                  <InputText
                    isRequired
                    label={translate("appUsers.email")}
                    type={0}
                    value={model?.email}
                    placeHolder={translate("appUsers.placeholder.email")}
                    className={"tio-account_square_outlined"}
                    onChange={handleChangeSingleField({
                      fieldName: "email",
                    })}
                  />
                </FormItem>
              </Col>

              <Col lg={24} className="m-b--sm m-t--sm">
                <FormItem
                  validateObject={utilService.getValidateObj(model, "password")}
                >
                  <InputText
                    isRequired
                    typeInput={showPassword ? "text" : "password"}
                    label={translate("appUsers.password")}
                    type={0}
                    value={model?.password}
                    placeHolder={translate("appUsers.placeholder.password")}
                    className={"tio-account_square_outlined"}
                    onChange={handleChangeSingleField({
                      fieldName: "password",
                    })}
                    // action={{
                    //   name: translate("appUsers.password.random"),
                    //   action: handleRandomPassword,
                    // }}
                    suffix={
                      <>
                        {showPassword ? (
                          <ViewOff
                            size={16}
                            onClick={(event) => {
                              setShowPassword(false);
                              event.stopPropagation();
                            }}
                          />
                        ) : (
                          <View
                            size={16}
                            onClick={(event) => {
                              setShowPassword(true);
                              event.stopPropagation();
                            }}
                          />
                        )}
                      </>
                    }
                  />
                </FormItem>
                <div className="warning-password-rule m-t--3xs">
                  <span>
                    {translate("profile.changePasswordPage.ruleOfPassword")}
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Drawer>
    );
  }
);

export default CreateDrawer;
