import { FC } from "react";

interface ExternalLinkProps {
  href: string;
}

const ExternalLink: FC<ExternalLinkProps> = ({ href, children }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export default ExternalLink;
