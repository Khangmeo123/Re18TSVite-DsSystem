import { Col, Row, Switch } from "antd";
import LayoutDetail from "components/LayoutDetail/LayoutDetail";
import PageHeader from "components/PageHeader/PageHeader";
import { APP_OVERVIEW } from "config/route-const";
import "./AppUserDetail.scss";

import { View, ViewOff } from "@carbon/icons-react";
import { utilService } from "core/services/common-services/util-service";
import {
  Button,
  Checkbox,
  DatePicker,
  EnumSelect,
  FormItem,
  InputText,
} from "react-components-design-system";
import CaretDown from "../../../assets/images/CaretDown.png";
import { appUserRepository } from "../AppUserRepository";
import { useDetailHook } from "./AppUserDetailHook";

const AppUserDetail = () => {
  const {
    translate,
    model,
    handleChangeSingleField,
    handleChangeSelectField,
    handleChangeDateField,
    handleChangeBoolField,
    showPassword,
    setShowPassword,
  } = useDetailHook();

  return (
    <div className="page-content">
      <PageHeader
        title={`${translate("tenants.detail.title")}`}
        breadcrumbs={[
          {
            name: translate("Trang chủ"),
            path: APP_OVERVIEW,
          },
          {
            name: translate("Ngân sách"),
            path: APP_OVERVIEW,
          },
        ]}
      >
        <>
          <Button
            icon={<img src={CaretDown} alt="img" />}
            iconPlace="left"
            type="secondary"
            size="lg"
            className="m-r--2xs"
          >
            Lưu nháp
          </Button>
          <Button
            icon={<img src={CaretDown} alt="img" />}
            iconPlace="left"
            type="primary"
            size="lg"
          >
            Lưu và gửi duyệt
          </Button>
        </>
      </PageHeader>

      <LayoutDetail className="">
        <Row className="p-l--2xl p-r--lg p-t--sm">
          <Col span={24}>
            <div className="section__title">Thông tin chung</div>
            <Row className="m-t--2xl">
              <Col span={6} className="m-b--md">
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
              <Col span={6} className="m-b--md">
                <FormItem
                  validateObject={utilService.getValidateObj(model, "gender")}
                >
                  <EnumSelect
                    placeHolder={translate("appUsers.placeholder.gender")}
                    onChange={handleChangeSelectField({
                      fieldName: "gender",
                    })}
                    getList={appUserRepository.singleListGender}
                    type={0}
                    label={translate("appUsers.gender")}
                    value={model.gender}
                  />
                </FormItem>
              </Col>
              <Col span={6} className="m-b--md">
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
              <Col span={6} className="m-b--md">
                <FormItem
                  validateObject={utilService.getValidateObj(model, "address")}
                >
                  <InputText
                    label={translate("appUsers.address")}
                    type={0}
                    value={model.address}
                    placeHolder={translate("appUsers.placeholder.address")}
                    onChange={handleChangeSingleField({
                      fieldName: "address",
                    })}
                  />
                </FormItem>
              </Col>
              <Col span={6} className="m-b--md">
                <FormItem
                  validateObject={utilService.getValidateObj(model, "email")}
                >
                  <InputText
                    isRequired
                    label={translate("appUsers.email")}
                    type={0}
                    value={model.email}
                    placeHolder={translate("appUsers.placeholder.email")}
                    onChange={handleChangeSingleField({
                      fieldName: "email",
                    })}
                  />
                </FormItem>
                <div className="warning-password-rule m-t--3xs">
                  <span>{translate("appUsers.warning.email")}</span>
                </div>
              </Col>
              <Col span={6} className="m-b--md">
                <FormItem
                  validateObject={utilService.getValidateObj(model, "phone")}
                >
                  <InputText
                    label={translate("appUsers.phone")}
                    type={0}
                    value={model.phone}
                    placeHolder={translate("appUsers.placeholder.phone")}
                    onChange={handleChangeSingleField({
                      fieldName: "phone",
                    })}
                    maxLength={20}
                  />
                </FormItem>
              </Col>
              <Col span={6} className="m-b--md">
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

            <div className="section__title">Đăng nhập và mật khẩu</div>
            <Row className="m-t--2xl">
              <Col span={6} className="m-b--md">
                <FormItem
                  validateObject={utilService.getValidateObj(model, "code")}
                >
                  <InputText
                    isRequired
                    label={translate("appUsers.code")}
                    type={0}
                    value={model.code}
                    placeHolder={translate("appUsers.placeholder.code")}
                    onChange={handleChangeSingleField({
                      fieldName: "code",
                    })}
                  />
                </FormItem>
                <div className="warning-password-rule m-t--3xs">
                  <span>{translate("appUsers.warning.code")}</span>
                </div>
              </Col>
              <Col span={6} className="m-b--md">
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
                    //   action={{
                    //     name: translate("appUsers.password.random"),
                    //     action: handleRandomPassword,
                    //   }}
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
              <Col span={6} className="m-b--md">
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
          </Col>
        </Row>
      </LayoutDetail>
    </div>
  );
};

export default AppUserDetail;
