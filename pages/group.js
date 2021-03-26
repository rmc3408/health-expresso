export default function Group({ groups }) {
  
  /**
   * Transforming 1 Object with 10 multiples Arrays 
   * to 1 array with 10 Arrays 
  */
  const users = Object.values(groups);

  return (
    <div className="container">
      <div className="card">
        {users.map((user, idx) => <div key={idx}>
          <h2> User ID {idx+1} </h2>
          {user.map(post => <p>{post.title}</p>)}
          </div> )}

      </div>
    </div>
  );
}
