import { Close, Save, View, ViewOff } from "@carbon/icons-react";
import { Col, Row, Switch } from "antd";
import { AxiosError } from "axios";
import LayoutDetail from "components/LayoutDetail/LayoutDetail";
import { APP_USER_VIEW_ROUTE } from "config/route-const";
import { utilService } from "core/services/common-services/util-service";
import { detailService } from "core/services/page-services/detail-service";
import { fieldService } from "core/services/page-services/field-service";
import { AppUser } from "models/AppUser";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {
  Button,
  DatePicker,
  EnumSelect,
  FormItem,
  InputText,
  Checkbox,
} from "react-3layer-ui-components";
import { appUserRepository } from "pages/AppUserPage/AppUserRepository";
import { finalize } from "rxjs";
import { GeneralActionEnum } from "core/services/service-types";

interface EditPageProps {
  appUser?: AppUser;
  updateAppUser?: (appUser: AppUser) => void;
}

const EditPage = (props: EditPageProps) => {
  const { appUser, updateAppUser } = props;
  const [translate] = useTranslation();
  const { model, dispatch, getModel } = detailService.useModel(
    AppUser,
    appUser
  );
  const history = useHistory();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showLoading, setShowLoading] = React.useState<boolean>(false);
  const {
    handleChangeSingleField,
    handleChangeSelectField,
    handleChangeDateField,
    handleChangeBoolField,
    handleChangeAllField,
  } = fieldService.useField(model, dispatch);

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

  const handleSave = React.useCallback(() => {
    const currentAppUser = getModel();
    setShowLoading(true);
    appUserRepository
      .save(currentAppUser)
      .pipe(
        finalize(() => {
          setShowLoading(false);
        })
      )
      .subscribe({
        next: (res: AppUser) => {
          if (res) {
            updateAppUser(res);
            history.push({
              pathname: APP_USER_VIEW_ROUTE,
              search: `?appUserId=${res.id}`,
            });
          }
        },
        error: (error: AxiosError<AppUser>) => {
          if (error.response && error.response.status === 400)
            handleChangeAllField(error.response?.data);
        },
      });
  }, [getModel, handleChangeAllField, history, updateAppUser]);

  const handleClose = React.useCallback(() => {
    handleChangeAllField(appUser);
    history.push({
      pathname: APP_USER_VIEW_ROUTE,
      search: `?appUserId=${appUser.id}`,
    });
  }, [appUser, handleChangeAllField, history]);

  React.useEffect(() => {
    dispatch({
      type: GeneralActionEnum.SET,
      payload: appUser,
    });
  }, [dispatch, appUser]);

  return (
    <>
      <div className="edit-page__container m-l--lg">
        <div className="edit-page__section edit-page__section--up p--sm">
          <div className="section__title">Thông tin chung</div>
          <Row className="m-t--2xl">
            <Col span={24} className="m-b--md">
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
                  value={model.displayName}
                  placeHolder={translate("appUsers.placeholder.displayName")}
                  onChange={handleChangeSingleField({
                    fieldName: "displayName",
                  })}
                />
              </FormItem>
            </Col>
            <Col span={24} className="m-b--md">
              <FormItem
                validateObject={utilService.getValidateObj(model, "gender")}
              >
                <EnumSelect
                  placeHolder={translate("appUsers.placeholder.gender")}
                  onChange={handleChangeSelectField({ fieldName: "gender" })}
                  getList={appUserRepository.singleListGender}
                  type={0}
                  label={translate("appUsers.gender")}
                  value={model.gender}
                />
              </FormItem>
            </Col>
            <Col span={24} className="m-b--md">
              <FormItem
                validateObject={utilService.getValidateObj(model, "birthday")}
              >
                <DatePicker
                  label={translate("appUsers.birthday")}
                  value={model.birthday}
                  type={0}
                  placeholder={translate("appUsers.placeholder.birthday")}
                  onChange={handleChangeDateField({
                    fieldName: "birthday",
                  })}
                />
              </FormItem>
            </Col>
            <Col span={24} className="m-b--md">
              <FormItem
                validateObject={utilService.getValidateObj(model, "address")}
              >
                <InputText
                  label={translate("appUsers.address")}
                  type={0}
                  value={model.address}
                  placeHolder={translate("appUsers.placeholder.address")}
                  onChange={handleChangeSingleField({ fieldName: "address" })}
                />
              </FormItem>
            </Col>
            <Col span={24} className="m-b--md">
              <FormItem
                validateObject={utilService.getValidateObj(model, "email")}
              >
                <InputText
                  isRequired
                  label={translate("appUsers.email")}
                  type={0}
                  value={model.email}
                  placeHolder={translate("appUsers.placeholder.email")}
                  onChange={handleChangeSingleField({ fieldName: "email" })}
                />
              </FormItem>
              <div className="warning-password-rule m-t--3xs">
                <span>{translate("appUsers.warning.email")}</span>
              </div>
            </Col>
            <Col span={24} className="m-b--md">
              <FormItem
                validateObject={utilService.getValidateObj(model, "phone")}
              >
                <InputText
                  label={translate("appUsers.phone")}
                  type={0}
                  value={model.phone}
                  placeHolder={translate("appUsers.placeholder.phone")}
                  onChange={handleChangeSingleField({ fieldName: "phone" })}
                  maxLength={20}
                />
              </FormItem>
            </Col>
            <Col span={24} className="m-b--md">
              <div>
                <div className={"label-form"}>
                  {translate("appUsers.status")}
                </div>
                <Switch
                  checked={model?.statusId === 1 ? true : false}
                  onChange={handleChangeBoolField({
                    fieldName: "statusId",
                  })}
                  className={"switch_status"}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="edit-page__section p--sm">
          <div className="section__title">Đăng nhập và mật khẩu</div>
          <Row className="m-t--2xl">
            <Col span={24} className="m-b--md">
              <FormItem
                validateObject={utilService.getValidateObj(model, "code")}
              >
                <InputText
                  isRequired
                  label={translate("appUsers.code")}
                  type={0}
                  value={model.code}
                  placeHolder={translate("appUsers.placeholder.code")}
                  onChange={handleChangeSingleField({ fieldName: "code" })}
                />
              </FormItem>
              <div className="warning-password-rule m-t--3xs">
                <span>{translate("appUsers.warning.code")}</span>
              </div>
            </Col>
            <Col span={24} className="m-b--md">
              <FormItem
                validateObject={utilService.getValidateObj(model, "password")}
              >
                <InputText
                  isRequired
                  label={translate("appUsers.password")}
                  type={0}
                  value={model.password}
                  placeHolder={translate("appUsers.placeholder.password")}
                  onChange={handleChangeSingleField({
                    fieldName: "password",
                  })}
                  action={{
                    name: translate("appUsers.password.random"),
                    action: handleRandomPassword,
                  }}
                  typeInput={showPassword ? "text" : "password"}
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
                <span>{translate("appUsers.warning.password")}</span>
              </div>
            </Col>
            <Col span={24} className="m-b--md">
              <div className="d-flex flex-column">
                <Checkbox
                  label={translate("appUsers.receivingSystemNotification")}
                  checked={model.receivingSystemNotification}
                  onChange={
                    handleChangeSingleField({
                      fieldName: "receivingSystemNotification",
                    }) as () => (value: boolean) => void
                  }
                />
                <Checkbox
                  label={translate("appUsers.receivingSystemEmail")}
                  checked={model.receivingSystemEmail}
                  onChange={
                    handleChangeSingleField({
                      fieldName: "receivingSystemEmail",
                    }) as () => (value: boolean) => void
                  }
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <LayoutDetail.Footer>
        <div className="d-flex justify-content-end">
          <Button
            type="secondary"
            className="btn--lg"
            icon={<Close size={16} />}
            onClick={handleClose}
          >
            {translate("appUsers.actions.close")}
          </Button>
          <Button
            type="primary"
            className="btn--lg"
            icon={<Save size={16} />}
            onClick={handleSave}
            loading={showLoading}
          >
            {translate("appUsers.actions.save")}
          </Button>
        </div>
      </LayoutDetail.Footer>
    </>
  );
};

export default EditPage;
