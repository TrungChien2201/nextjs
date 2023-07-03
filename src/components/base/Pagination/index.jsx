import ReactPaginate from 'react-paginate'

export function PaginationCustom({ totalPage, setPage, page = '1' }) {
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setPage(event.selected + 1)
  }

  const pageCount = totalPage

  return (
    <div className="d-flex justify-content-end pt-2">
      <ReactPaginate
        nextLabel=">"
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        onPageChange={handlePageClick}
        forcePage={page - 1}
      />
    </div>
  )
}
