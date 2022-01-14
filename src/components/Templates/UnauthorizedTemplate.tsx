import { FC } from "react";
import { Outlet } from "react-router-dom";
import UnauthorizedWrapper from "../Generic/Container/UnauthorizedContainer";

const UnauthorizedTemplate: FC = () => {
  return (
    <UnauthorizedWrapper>
      <Outlet />
    </UnauthorizedWrapper>
  );
};

export default UnauthorizedTemplate;
