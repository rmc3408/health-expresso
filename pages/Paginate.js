import ReactPaginate from "react-paginate";
import styles from "../styles/Paginate.module.css";

function Paginate({ screen, handlePageClick}) {
  const pageCount = 20;
  const marginPagesDisplayed = 3;
  const pageRangeDisplayed = 20;

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
          marginPagesDisplayed={marginPagesDisplayed}
          pageRangeDisplayed={pageRangeDisplayed}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          subContainerClassName={styles.pages}
          activeClassName={styles.active}
        />
      </div>
    </div>
  );
}
export default Paginate;
