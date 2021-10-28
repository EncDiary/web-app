import { FC } from "react";
import { ChevronsLeft, ChevronsRight } from "../../assets/svg-icons";
import Button from "./Button";
import "./Pagination.scss";

const Pagination: FC = () => {
  return (
    <div className="pagination">
      <Button
        text={
          <div className="pagination__row-icon">
            <ChevronsLeft />
          </div>
        }
        className="pagination__row"
      />
      <div className="pagination__title">10 - 20</div>
      <Button
        text={
          <div className="pagination__row-icon">
            <ChevronsRight />
          </div>
        }
        className="pagination__row"
      />
    </div>
  );
};

export default Pagination;
