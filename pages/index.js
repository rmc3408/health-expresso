import { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import styled from 'styled-components';
import Group from "./group";
import Paginate from './Paginate';
import FullPosts from './FullPosts';

export default function Home({ data }) {
  const [offset, setOffset] = useState(0);
  const [fullPosts, setFullPosts] = useState([]);
  const [paginatePosts, setPaginatePosts] = useState([]);
  const [groupedPosts, setGroupPosts] = useState([]);
  const [isAllpost, setAllPost] = useState(true);
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

  const MainBoard = styled.main`
    padding: 20px;
    min-width: 100%;
`;
  const Button = styled.button`
    color: palevioletred;
    font-size: 1em;
    background-color: white;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;

    &:hover {
      background-color: palevioletred;
      color: white;
    }
  `;
  const GroupedButton = styled(Button)`
    color: lightred;
    border-color: violetred;
  `;
  const Grid = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 100%;
    margin-top: 3rem;
  `;

  return (
    <Layout>
      <MainBoard>
        

        <label>Filter by: </label>
        <Button onClick={() => tooglePagination()}>
          {isAllpost ? "5 per Page" : "All"}
        </Button>
        
        
        {isAllpost ? (
          <GroupedButton onClick={() => groupID()}>
            {isGrouped ? "Grouped" : "UserID"}
          </GroupedButton>
        ) : "" }


        <Grid>
          {!isAllpost ? <Paginate screen={paginatePosts} handlePageClick={handlePageClick}/> : (
            isGrouped ? <Group groups={groupedPosts} /> : <FullPosts screen={fullPosts}/> )}
        </Grid>

      </MainBoard>
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
