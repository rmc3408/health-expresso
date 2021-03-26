import Head from "next/head";
import styled from 'styled-components';

//style components
const StyledContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin: 80px 0 30px 0;
  line-height: 4rem;
  font-size: 6rem;
  color: palevioletred;
  font-family: 'Satisfy', cursive;
  text-align: center;
`;

function Layout(props) {
  return (
    <StyledContainer>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet"/>
        <title>Health Expresso</title>
      </Head>

      <Title>Health Expresso</Title>
      {props.children}
    </StyledContainer>
  );
}
export default Layout;
