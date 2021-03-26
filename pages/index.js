import { useState, useEffect } from "react";
import Layout from "./Layout";
import styles from "../styles/Home.module.css";
import axios from "axios";

import Group from "./group";
import Paginate from './Paginate';
import FullPosts from './FullPosts';

export default function Home({ data }) {
  const [offset, setOffset] = useState(0);
  const [fullPosts, setFullPosts] = useState([]);
  const [paginatePosts, setPaginatePosts] = useState([]);
  const [groupedPosts, setGroupPosts] = useState([]);
  const [isAllpost, setAllPost] = useState(false);
  const [isGrouped, setIsGrouped] = useState(false);

  const perPage = 5;
  
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
   * @param {event} e event to selected number;
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
    <Layout>
      <main className={styles.main}>
        

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
    </Layout>
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
