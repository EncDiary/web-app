import React from "react";

interface OpenItemProps {
  icon: any;
  name: string;
  onClick: () => void;
}

const BookActionItem: React.FC<OpenItemProps> = ({ icon, name, onClick }) => {
  return (
    <div className="open__icon" onClick={onClick}>
      <div className="open__icon-image">{icon}</div>
      <div className="open__icon-text">{name}</div>
    </div>
  );
};

export default BookActionItem;
