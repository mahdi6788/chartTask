import data from "./assets/data.json";
import Chart from "./Chart";


function App() {
  return (
    <>
      <div style={{ padding: "20px" }}>
        {data.map((chart, idx) => (
          <Chart key={idx} chart={chart} />
        ))}
      </div>
    </>
  );
}

export default App;
