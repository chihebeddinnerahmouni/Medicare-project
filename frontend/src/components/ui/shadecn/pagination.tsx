// not used
import React from "react";

interface PaginationProps {
    children: React.ReactNode;
}
export const Pagination: React.FC<PaginationProps> = ({ children }) => {
    return <nav className="pagination">{children}</nav>;
};

export const PaginationContent: React.FC<PaginationProps> = ({ children }) => {
    return <ul className="pagination-content">{children}</ul>;
};

interface PaginationItemProps {
    children: React.ReactNode;
}

export const PaginationItem: React.FC<PaginationItemProps> = ({ children }) => {
    return <li className="pagination-item">{children}</li>;
};

interface PaginationLinkProps {
    href: string;
    isActive?: boolean;
    children: React.ReactNode;
}

export const PaginationLink: React.FC<PaginationLinkProps> = ({ href, isActive, children }) => {
    return (
        <a
            href={href}
            className={`pagination-link ${isActive ? "active" : ""}`}
        >
            {children}
        </a>
    );
};

interface PaginationPreviousProps {
    href: string;
}

export const PaginationPrevious: React.FC<PaginationPreviousProps> = ({ href }) => {
    return (
        <a href={href} className="pagination-previous">
            Previous
        </a>
    );
};

interface PaginationNextProps {
    href: string;
}

export const PaginationNext: React.FC<PaginationNextProps> = ({ href }) => {
    return (
        <a href={href} className="pagination-next">
            Next
        </a>
    );
};

export const PaginationEllipsis: React.FC = () => {
    return <span className="pagination-ellipsis">...</span>;
};