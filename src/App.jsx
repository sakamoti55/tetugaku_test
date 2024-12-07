import NetworkGraph1 from "./components/NetworkGraph1"
import NetworkGraph2 from "./components/NetworkGraph2"

function App() {
  return (
    <div>
      <header><h1>ヘッダー</h1></header>
      
      <div className="container">
        <div className="select-container">
        <h1>セレクトボタン</h1>
        </div>

        <div className="main-container">
          <div className="vis-container">
            <NetworkGraph1 />
          </div>
          <div className="book-container">
            <NetworkGraph2 />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;