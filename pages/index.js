import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Group from './group';

export default function Home({ data }) {
  const [offset, setOffset] = useState(0);
  const [fullPosts, setFullPosts] = useState([]);
  const [paginatePosts, setPaginatePosts] = useState([]);
  const [groupedPosts, setGroupPosts] = useState([]);
  const [perPage, setperPage] = useState(5);
  const [pageCount, setPageCount] = useState(20);
  const [isAllpost, setAllPost] = useState(false);
  const [isGrouped, setIsGrouped] = useState(false);

  const checkData = () => {
    const allPosts = data.map((pd) => (
      <div key={pd.id}>
        <h4>
          {pd.id} - {pd.title}
        </h4>
        <p>{pd.body}</p>
      </div>
    ));

    const slice = data.slice(offset, offset + perPage);
    const pagData = slice.map((pd) => (
      <div key={pd.id}>
        <h4>
          {pd.id} - {pd.title}
        </h4>
        <p>{pd.body}</p>
      </div>
    ));

    /**
     * https://edisondevadoss.medium.com/javascript-group-an-array-of-objects-by-key-afc85c35d07e
     */
    let group = data.reduce((r, a) => {
      r[a.userId] = [...r[a.userId] || [], a];
      return r;
    }, {});
    
    //console.log("group", group);
    setGroupPosts(group);
    setFullPosts(allPosts);
    setPaginatePosts(pagData);
  };

  useEffect(() => {
    checkData();
  }, [offset]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(Math.ceil(selectedPage * perPage));
  };

  const tooglePagination = () => {
    setAllPost(!isAllpost);
    checkData();
  };

  const groupID = () => {
    setIsGrouped(!isGrouped);
    checkData();
  }
  

  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Pagination in Next.JS App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Health Expresso</h1>
        
        <button
          onClick={() => tooglePagination()}
          className={isAllpost ? styles.btnInact : styles.btnAct}
        >
          {isAllpost ? "Show Pagination" : "Show All Post"}
        </button>


        {isAllpost ? <button
          onClick={() => groupID()}
          className={isGrouped ? styles.btnInact : styles.btnAct}>
          {isGrouped ? "USER GROUPED" : "Group by ID"}
        </button>: ''}
        <div className={styles.pagination}>
          {isAllpost ? (
            ""
          ) : (
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={3}
              pageRangeDisplayed={20}
              onPageChange={handlePageClick}
              containerClassName={styles.pagination}
              subContainerClassName={styles.pages}
              activeClassName={styles.active}
            />
          )}
        </div>
        {paginatePosts.length === 0 ? <h1>Click in toogle button</h1> : ""}
        <div className={styles.grid}>
          {isAllpost ? (isGrouped ? <Group groups={groupedPosts} /> : fullPosts) : paginatePosts}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  return {
    props: {
      data,
    },
  };
};
