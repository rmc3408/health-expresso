import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";

import Group from "./group";
import Paginate from './Paginate';
import FullPosts from './FullPosts';

export default function Home({ data }) {
  const perPage = 5;


  const [offset, setOffset] = useState(0);
  const [fullPosts, setFullPosts] = useState([]);
  const [paginatePosts, setPaginatePosts] = useState([]);
  const [groupedPosts, setGroupPosts] = useState([]);
  const [isAllpost, setAllPost] = useState(false);
  const [isGrouped, setIsGrouped] = useState(false);

  /**
   * Checks Fetched data and process data:
   * @variable {allPosts} all posts
   * @variable {pagData} Show pagination - 5 per page
   * @variable {group} Rearrange posts ordered by userId
   */
  const checkData = () => {
    
    const allPosts = data;
    
    const pagData = data.slice(offset, offset + perPage);
    
    /**
     * Formula get from this website
     * https://edisondevadoss.medium.com/javascript-group-an-array-of-objects-by-key-afc85c35d07e
     */
    let group = data.reduce((r, a) => {
      r[a.userId] = [...(r[a.userId] || []), a];
      return r;
    }, {});

    // Data saved in their state
    setGroupPosts(group);
    setFullPosts(allPosts);
    setPaginatePosts(pagData);
  };

  useEffect(() => {
    checkData();
  }, [offset]);

  /**
   * once click in the page number will calculate new OffSet.
   * @param {event} page selected number;
   */
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(Math.ceil(selectedPage * perPage));
  };

  /**
   * After click in a button change the state of isAllPost
   * and check 
   */
  const tooglePagination = () => {
    setAllPost(!isAllpost);
  };

  /**
   * Toogle to show between AllPosts and groupedPosts
   * and check 
   */
  const groupID = () => {
    setIsGrouped(!isGrouped);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Health Expresso in Next.JS App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>Health Expresso</h2>

        <label>Pagination or All Post: </label>
        <button onClick={() => tooglePagination()} className={isAllpost ? styles.btnInact : styles.btnAct}>
          {isAllpost ? "Show Pagination" : "Show All Post"}
        </button>
        
        
        {isAllpost ? (
          <button onClick={() => groupID()} className={isGrouped ? styles.btnInact : styles.btnAct}>
            {isGrouped ? "USER GROUPED" : "Group by ID"}
          </button>
        ) : "" }


        <div className={styles.grid}>
          {!isAllpost ? <Paginate screen={paginatePosts} handlePageClick={handlePageClick}/> : (
            isGrouped ? <Group groups={groupedPosts} /> : <FullPosts screen={fullPosts}/> )}
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
