import { FC, ReactElement } from "react";
import { ChevronsLeftIcon, ChevronsRightIcon } from "../../assets/svg-icons";
import Button from "./Button";
import "./Pagination.scss";

interface PaginationProps {
  content: string;
  isBackDisabled?: boolean;
  isNextDisabled?: boolean;
  onClickBack: () => void;
  onClickNext: () => void;
}

interface PaginationRowProps {
  content: ReactElement;
  onClick: () => void;
  disabled?: boolean;
}

const Pagination: FC<PaginationProps> = ({
  content,
  onClickBack,
  onClickNext,
  isBackDisabled = false,
  isNextDisabled = false,
}) => {
  return (
    <div className="pagination">
      <PaginationRow
        content={<ChevronsLeftIcon />}
        onClick={onClickBack}
        disabled={isBackDisabled}
      />
      <div className="pagination__title">{content}</div>
      <PaginationRow
        content={<ChevronsRightIcon />}
        onClick={onClickNext}
        disabled={isNextDisabled}
      />
    </div>
  );
};

const PaginationRow: FC<PaginationRowProps> = ({
  content,
  onClick,
  disabled = false,
}) => {
  return (
    <Button
      text={<div className="pagination__row-icon">{content}</div>}
      className="pagination__row"
      onClick={onClick}
      disabled={disabled}
    />
  );
};

export default Pagination;
