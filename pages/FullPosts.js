function FullPosts({ screen }) {
    const allPosts = screen.map((pd) => (
        <div key={pd.id}>
          <h4>
            {pd.id} - {pd.title}
          </h4>
          <p>{pd.body}</p>
        </div>
    ));
    
    return <div>{allPosts}</div>;
}
export default FullPosts;