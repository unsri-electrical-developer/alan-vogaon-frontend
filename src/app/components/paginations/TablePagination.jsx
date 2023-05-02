import React from "react";
import { Pagination } from "react-bootstrap";

const TablePagination = ({ total, page, params, href }) => {
  return (
    <Pagination className="m-0 ml-3 mb-3">
      <Pagination.First
        title="halaman pertama"
        href={`${href}?hal=${1}${params}`}
      />
      <Pagination.Prev
        title="halaman sebelumnya"
        href={`${href}?hal=${parseInt(page) - 1}${params}`}
        disabled={parseInt(page) === 1}
      />
      {parseInt(page) > 5 ? <Pagination.Ellipsis /> : null}
      {Array.from(Array(total), (e, i) => (
        <Pagination.Item
          key={i + 1}
          href={`${href}?hal=${i + 1}${params}`}
          active={i + 1 === page}
        >
          {i + 1}
        </Pagination.Item>
      ))?.slice(
        parseInt(page) - 1 >= 4 ? parseInt(page) - 4 : 0,
        parseInt(page) - 1 + 4
      )}
      {parseInt(page) + 4 < total ? <Pagination.Ellipsis /> : null}
      <Pagination.Next
        title="halaman selanjutnya"
        href={`${href}?hal=${parseInt(page) + 1}${params}`}
        disabled={parseInt(page) === total}
      />
      <Pagination.Last
        title="halaman terakhir"
        href={`${href}?hal=${total}${params}`}
      />
    </Pagination>
  );
};

export default TablePagination;
