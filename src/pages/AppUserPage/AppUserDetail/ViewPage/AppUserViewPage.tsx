import { Edit } from "@carbon/icons-react";
import { Col, Row, Tooltip } from "antd";
import { APP_USER_EDIT_ROUTE } from "config/route-const";
import { formatDate } from "core/helpers/date-time";
import { AppUser } from "models/AppUser";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { StatusLine } from "react-components-design-system";

interface AppUserViewPageProps {
  appUser?: AppUser;
  isEditable?: boolean;
}

const AppUserViewPage = (props: AppUserViewPageProps) => {
  const [translate] = useTranslation();
  const { appUser, isEditable } = props;
  const history = useHistory();
  const handleEdit = React.useCallback(() => {
    history.push({
      pathname: APP_USER_EDIT_ROUTE,
      search: `?appUserId=${appUser.id}`,
    });
  }, [appUser, history]);

  return (
    <div className="view-page__container m-l--lg">
      <div className="view-page__section p--sm">
        <div className="view-page__title">
          <div className="title">{translate("appUsers.title.general")}</div>
          {isEditable && (
            <div className="action" onClick={handleEdit}>
              {translate("appUsers.actions.editShort")}{" "}
              <Edit size={16} className="m-l--2xs"></Edit>
            </div>
          )}
        </div>
        <div className="view-page__content m-t--2xl">
          <Row className="m-b--lg">
            <Col span={8}>
              <div className="content__label">
                {translate("appUsers.displayName")}
              </div>
            </Col>
            <Col span={8}>
              <Tooltip title={appUser.displayName}>
                {" "}
                <div className="content__value">{appUser.displayName}</div>
              </Tooltip>
            </Col>
          </Row>
          <Row className="m-b--lg">
            <Col span={8}>
              <div className="content__label">
                {translate("appUsers.gender")}
              </div>
            </Col>
            <Col span={8}>
              <div className="content__value">{appUser.gender?.name}</div>
            </Col>
          </Row>
          <Row className="m-b--lg">
            <Col span={8}>
              <div className="content__label">
                {translate("appUsers.email")}
              </div>
            </Col>
            <Col span={8}>
              <div className="content__value">{appUser.email}</div>
            </Col>
          </Row>
          <Row className="m-b--lg">
            <Col span={8}>
              <div className="content__label">
                {translate("appUsers.birthday")}
              </div>
            </Col>
            <Col span={8}>
              <div className="content__value">
                {formatDate(appUser.birthday)}
              </div>
            </Col>
          </Row>
          <Row className="m-b--lg">
            <Col span={8}>
              <div className="content__label">
                {translate("appUsers.address")}
              </div>
            </Col>
            <Col span={8}>
              <div className="content__value">{appUser.address}</div>
            </Col>
          </Row>
          <Row className="m-b--lg">
            <Col span={8}>
              <div className="content__label">
                {translate("appUsers.phone")}
              </div>
            </Col>
            <Col span={8}>
              <div className="content__value">{appUser.phone}</div>
            </Col>
          </Row>
          <Row className="m-b--lg">
            <Col span={8}>
              <div className="content__label">
                {translate("appUsers.status")}
              </div>
            </Col>
            <Col span={8}>
              <StatusLine
                value={appUser.status?.name}
                color={appUser.status?.color}
              />
            </Col>
          </Row>
        </div>
      </div>
      <div className="view-page__section m-t--2xl p--sm">
        <div className="view-page__title">
          <div className="title">{translate("appUsers.title.loginInfo")}</div>
          {isEditable && (
            <div className="action" onClick={handleEdit}>
              {translate("appUsers.actions.editShort")}{" "}
              <Edit size={16} className="m-l--2xs"></Edit>
            </div>
          )}
        </div>
        <div className="view-page__content m-t--2xl">
          <Row className="m-b--lg">
            <Col span={8}>
              <div className="content__label">{translate("appUsers.code")}</div>
            </Col>
            <Col span={8}>
              <div className="content__value">{appUser.code}</div>
            </Col>
          </Row>
          <Row className="m-b--lg">
            <Col span={8}>
              <div className="content__label">Mật khẩu</div>
            </Col>
            <Col span={8}>
              <div className="content__value">******************</div>
            </Col>
          </Row>
          <Row className="m-b--lg">
            <Col span={8}></Col>
            <Col span={8}>
              <div className="content__value">
                {translate("appUsers.updatedAt")}{" "}
                {formatDate(appUser.updatedAt)}
              </div>
            </Col>
          </Row>
          <Row className="m-b--lg">
            <Col span={8}>
              <div className="content__label">
                {translate("appUsers.receivingSystemNotification")}
              </div>
            </Col>
            <Col span={8}>
              <div className="content__value">
                {appUser.receivingSystemNotification
                  ? translate("appUsers.yes")
                  : translate("appUsers.no")}
              </div>
            </Col>
          </Row>
          <Row className="m-b--lg">
            <Col span={8}>
              <div className="content__label">
                {translate("appUsers.receivingSystemEmail")}
              </div>
            </Col>
            <Col span={8}>
              <div className="content__value">
                {appUser.receivingSystemEmail
                  ? translate("appUsers.yes")
                  : translate("appUsers.no")}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default AppUserViewPage;
