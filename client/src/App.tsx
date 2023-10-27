import { useEffect, useState } from "react";
import "./App.css";

async function getSomeData() {
  const res = await fetch("/api");
}
const App = () => {
  const [data, setData] = useState();
  async function getSomeData() {
    const res = await fetch("/api");
    const data = await res.json()
    
    console.log(data);
    
  }
  useEffect(() => {
    getSomeData();
  });
  return (
    <div>
      <div>App</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default App;
