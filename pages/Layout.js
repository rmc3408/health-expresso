import Head from "next/head";

const Link = ({ className, children }) => (
    <a className={className}>
      {children}
    </a>
  );

function Layout(props) {
    return <div className={'styles.container'}>
        <Head>
        <title>Health Expresso</title>
        <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <h2 className={'styles.title'}>Health Expresso</h2>
        {props.children}</div>;
}
export default Layout;