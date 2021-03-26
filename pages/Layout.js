import Head from "next/head";
import styled from 'styled-components';


const StyledContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin: 50px 0;
  line-height: 4rem;
  font-size: 3rem;
  text-align: center;
`;

function Layout(props) {
  return (
    <StyledContainer>
      <Head>
        <title>Health Expresso</title>
      </Head>

      <Title>Health Expresso</Title>
      {props.children}
    </StyledContainer>
  );
}
export default Layout;
