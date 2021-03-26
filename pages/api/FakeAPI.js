// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default getStaticProps = async () => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  return {
    props: {
      data,
    },
  };
};