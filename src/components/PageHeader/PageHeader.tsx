import React, { ReactNode } from "react";
import classNames from "classnames";
import "./PageHeader.scss";
import { NavLink } from "react-router-dom";

interface BreadcrumbInterface {
  name?: string;
  path?: string;
}

export interface PageHeaderProps {
  title?: string;
  breadcrumbs?: BreadcrumbInterface[];
  children?: ReactNode;
  className?: string;
  theme?: "dark" | "light";
}

const PageHeader = (props: PageHeaderProps) => {
  const { title, breadcrumbs, theme, children } = props;

  return (
    <div
      className={classNames(
        "page-header",
        { "page-header--dark": theme === "dark" },
        props.className
      )}
    >
      <div>
        <div className="p-x--sm p-t--sm p-b--2xs">
          {breadcrumbs && breadcrumbs?.length > 0 && (
            <div className="page-header__breadcrumb m-b--3xs p-t--2xs p-l--2xs">
              <ul className="breadcrumb">
                {breadcrumbs.map((item: BreadcrumbInterface, index) => (
                  <li
                    key={index}
                    className={classNames({
                      "breadcrumb-active": index === breadcrumbs.length - 1,
                    })}
                  >
                    {item.path ? (
                      <NavLink to={item.path}>{item.name}</NavLink>
                    ) : (
                      <span className="text-link">{item.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="page-header__title p-l--2xs">{title}</div>
        </div>
      </div>
      <div className="button-place">{children}</div>
    </div>
  );
};

export default PageHeader;
