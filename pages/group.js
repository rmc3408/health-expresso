export default function Group({ groups }) {


    const printGrpTitle = (n) => {
        let print = [];
          for (let num in groups) {
            print[num - 1] = groups[num].map(c => (<div>
              <p>{c.title}</p>
              </div>))
          }
        return print[n];
    }
    
    return <div>
        <h1> User ID 1 </h1>
        {printGrpTitle(1)}
    </div>;
}
