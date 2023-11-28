import React from "react";
import { Pagination } from "react-bootstrap";
import { motion } from "framer-motion";

export interface PaginationProps {
  page: number;
  hasNextPage: boolean;
  setPage: (setPgArg: number | ((p: number) => number)) => void;
}

const JobsPagination: React.FC<PaginationProps> = ({
  page,
  hasNextPage,
  setPage,
}) => {
  const adjustPage = (amount: number) => {
    setPage((prevPage) => prevPage + amount);
  };

  return (
    <Pagination>
      {page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
      {page !== 1 && (
        <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>
      )}
      {page > 2 && <Pagination.Ellipsis />}
      {page > 2 && (
        <Pagination.Item onClick={() => adjustPage(-1)}>
          {page - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{page}</Pagination.Item>
      {hasNextPage && (
        <Pagination.Item onClick={() => adjustPage(1)}>
          {page + 1}
        </Pagination.Item>
      )}
      {hasNextPage && <Pagination.Next onClick={() => adjustPage(1)} />}
    </Pagination>
  );
};

export default JobsPagination;
