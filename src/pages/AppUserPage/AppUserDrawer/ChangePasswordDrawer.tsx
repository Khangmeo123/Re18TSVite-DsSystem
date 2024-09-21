import { View, ViewOff } from "@carbon/icons-react";
import { useSetState } from "ahooks";
import { Col, Row } from "antd";
import { AxiosError } from "axios";
import appMessageService from "core/services/common-services/app-message-service";
import { utilService } from "core/services/common-services/util-service";
import { AppUser, User } from "models/AppUser";
import React, { useContext, useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";
import { Drawer, FormItem, InputText } from "react-components-design-system";
import { appUserRepository } from "pages/AppUserPage/AppUserRepository";
import type { KeyType } from "core/services/service-types";
import {
  AppUserMaster,
  AppUserMasterContext,
} from "../AppUserMaster/MasterHook";

export interface AppUserChangePasswordDrawerType {
  handleOpen: (appUser?: AppUser | KeyType[]) => void;
}

const ChangePasswordDrawer = React.forwardRef<
  AppUserChangePasswordDrawerType,
  unknown
>(function ChangePasswordDrawer(props, ref) {
  const [translate] = useTranslation();
  const appUserMaster = useContext<AppUserMaster>(AppUserMasterContext);
  const { handleLoadList } = appUserMaster;
  const [currentAppUser, setCurrentAppUser] = React.useState<AppUser>();
  const [user, setUser] = useSetState<User>(new User());
  const [userIds, setUserIds] = React.useState<KeyType[]>();
  const [isShowDrawer, setIsShowDrawer] = React.useState<boolean>();
  const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);
  const [showVerfyNewPassword, setShowVerifyNewPassword] =
    React.useState<boolean>(false);
  const { notifyUpdateItemSuccess, notifyUpdateItemError } =
    appMessageService.useCRUDMessage();

  const handleOpenDrawer = React.useCallback((value?: AppUser | KeyType[]) => {
    if (value instanceof AppUser) {
      setCurrentAppUser(value);
    } else {
      setUserIds(value);
    }
    setIsShowDrawer(true);
  }, []);

  const handleCloseDrawer = React.useCallback(() => {
    setCurrentAppUser(null);
    setUserIds(null);
    setUser({ ...new User(), errors: null });
    setIsShowDrawer(false);
  }, [setUser]);

  const handleSaveDrawer = React.useCallback(() => {
    const userValue = { ...user };
    if (currentAppUser) {
      userValue.userId = currentAppUser.id;
      appUserRepository.changePassword(userValue).subscribe({
        next: () => {
          notifyUpdateItemSuccess({
            message: "Cập nhật thành công",
            className: "antd-notification-drawer",
          });
          handleLoadList();
          handleCloseDrawer();
        },
        error: (error: AxiosError<User>) => {
          if (error.response && error.response.status === 400)
            setUser(error.response?.data);
          notifyUpdateItemError({
            message: "Cập nhật thất bại",
            className: "antd-notification-drawer",
          });
        },
      });
    } else {
      userValue.userIds = [...(userIds as number[])];
      appUserRepository.bulkChangePassword(userValue).subscribe({
        next: () => {
          notifyUpdateItemSuccess({
            message: "Cập nhật thành công",
            className: "antd-notification-drawer",
          });
          handleLoadList();
          handleCloseDrawer();
        },
        error: (error: AxiosError<User>) => {
          if (error.response && error.response.status === 400)
            setUser(error.response?.data);
          notifyUpdateItemError({
            message: "Cập nhật thất bại",
            className: "antd-notification-drawer",
          });
        },
      });
    }
  }, [
    currentAppUser,
    handleCloseDrawer,
    handleLoadList,
    notifyUpdateItemError,
    notifyUpdateItemSuccess,
    setUser,
    user,
    userIds,
  ]);

  const handleRandomPassword = React.useCallback(() => {
    appUserRepository.randomPassword().subscribe({
      next: (res: string) => {
        if (res) {
          setUser({
            newPassword: res,
          });
          setShowNewPassword(true);
        }
      },
    });
  }, [setUser]);

  const handleChangeField = React.useCallback(
    (fieldName: string) => (value: string) => {
      setUser({ [fieldName]: value });
    },
    [setUser]
  );

  useImperativeHandle(ref, () => ({
    handleOpen: handleOpenDrawer,
  }));

  return (
    <Drawer
      loading={false}
      visible={isShowDrawer}
      handleSave={handleSaveDrawer}
      handleCancel={handleCloseDrawer}
      handleClose={handleCloseDrawer}
      visibleFooter={true}
      title={translate("appUsers.title.changePassword")}
      titleButtonCancel={translate("general.actions.close")}
      titleButtonApply={translate("general.actions.save")}
    >
      <div className="page page__detail">
        <div className="w-100 page__detail-tabs">
          <Row className="d-flex" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {currentAppUser && (
              <Col lg={24}>
                <InputText
                  label={translate("appUsers.changePassword.code")}
                  type={0}
                  value={currentAppUser.code}
                  disabled
                />
              </Col>
            )}
            <Col lg={24} className="m-b--xs m-t--xs">
              <FormItem
                validateObject={utilService.getValidateObj(user, "newPassword")}
              >
                <InputText
                  isRequired
                  label={translate("appUsers.changePassword.newPassword")}
                  type={0}
                  value={user.newPassword}
                  placeHolder={translate(
                    "appUsers.changePassword.placeholder.newPassword"
                  )}
                  className={"tio-account_square_outlined"}
                  onChange={handleChangeField("newPassword")}
                  // action={{
                  //   name: translate("appUsers.password.random"),
                  //   action: handleRandomPassword,
                  // }}
                  typeInput={showNewPassword ? "text" : "password"}
                  suffix={
                    <>
                      {showNewPassword ? (
                        <ViewOff
                          size={16}
                          onClick={(event) => {
                            setShowNewPassword(false);
                            event.stopPropagation();
                          }}
                        />
                      ) : (
                        <View
                          size={16}
                          onClick={(event) => {
                            setShowNewPassword(true);
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
            <Col lg={24} className="m-b--xs m-t--xs">
              <FormItem
                validateObject={utilService.getValidateObj(
                  user,
                  "verifyNewPassword"
                )}
              >
                <InputText
                  isRequired
                  label={translate("appUsers.changePassword.verifyNewPassword")}
                  type={0}
                  value={user.verifyNewPassword}
                  placeHolder={translate(
                    "appUsers.changePassword.placeholder.verifyNewPassword"
                  )}
                  className={"tio-account_square_outlined"}
                  onChange={handleChangeField("verifyNewPassword")}
                  typeInput={showVerfyNewPassword ? "text" : "password"}
                  suffix={
                    <>
                      {showVerfyNewPassword ? (
                        <ViewOff
                          size={16}
                          onClick={(event) => {
                            setShowVerifyNewPassword(false);
                            event.stopPropagation();
                          }}
                        />
                      ) : (
                        <View
                          size={16}
                          onClick={(event) => {
                            setShowVerifyNewPassword(true);
                            event.stopPropagation();
                          }}
                        />
                      )}
                    </>
                  }
                />
              </FormItem>
            </Col>
          </Row>
        </div>
      </div>
    </Drawer>
  );
});

export default ChangePasswordDrawer;
