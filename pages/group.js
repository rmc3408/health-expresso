import styled from 'styled-components';

export default function Group({ groups }) {
  
  /**
   * Transforming 1 Object with 10 multiples Arrays 
   * to 1 array with 10 Arrays 
  */
  const users = Object.values(groups);

  const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    flex-flow: row wrap;
  `;

  const Card = styled.div`
  background-color: white;
  display: inline-block;
  max-width: 500px;
  min-width: 250px;
  min-height: 200px;
  margin: 2rem 2rem 0 0;
  padding: 12px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  flex: 0 0 45%;
  align-items: flex-start;
  align-content: flex-start;
  border-radius: .3rem;
  &:hover {
    transition: all 0.2s linear;
    background-color: palevioletred;
    color: white;
  }
  `;

  const TitleCard = styled.h2`
    color: palevioletred;
  `;

  return (
    <FlexContainer>
      
        {users.map((user, idx) => <Card key={idx}>
          <h2> User Id {idx+1} </h2>
          {user.map(post => <p>{post.title}</p>)}
          </Card> )}

      
    </FlexContainer>
  );
}
