import { FC } from "react";
import { ChevronsLeftIcon, ChevronsRightIcon } from "../../assets/svg-icons";
import Button from "./Button";
import "./Pagination.scss";

const Pagination: FC = () => {
  return (
    <div className="pagination">
      <Button
        text={
          <div className="pagination__row-icon">
            <ChevronsLeftIcon />
          </div>
        }
        className="pagination__row"
      />
      <div className="pagination__title">10 - 20</div>
      <Button
        text={
          <div className="pagination__row-icon">
            <ChevronsRightIcon />
          </div>
        }
        className="pagination__row"
      />
    </div>
  );
};

export default Pagination;
