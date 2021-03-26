import ReactPaginate from "react-paginate";

function Paginate({ screen, handlePageClick}) {
  const pageCount = 20;

  const fivePosts = screen.map((pd) => (
    <div key={pd.id}>
      <h4>
        {pd.id} - {pd.title}
      </h4>
      <p>{pd.body}</p>
    </div>
  ));

  return (
    <div>
      <div>{fivePosts}</div>
      <div>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={3}
          pageRangeDisplayed={20}
          onPageChange={handlePageClick}
          containerClassName={'styles.pagination'}
          subContainerClassName={'styles.pages'}
          activeClassName={'styles.active'}
        />
      </div>
    </div>
  );
}
export default Paginate;
