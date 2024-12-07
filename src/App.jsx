import NetworkGraph1 from "./components/NetworkGraph1"
import NetworkGraph2 from "./components/NetworkGraph2"

function App() {
  return (
    <div>
      <header><h1>アプリケーションヘッダー</h1></header>
      
      <div className="container">
        <div className="select-container">
        <h1>selectbutton作成予定</h1>
        </div>

        <div className="main-container">
          <div>
            <NetworkGraph1 />
          </div>
          <div>
            <NetworkGraph2 />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;