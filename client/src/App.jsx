import "./style/App.css";
function App() {
  const serverSide = process.env.REACT_APP_SERVER_SIDE;
  console.log(serverSide);

  function connectToServer() {
    fetch(`${serverSide}/api/test`);
  }
  return (
    <>
      <form onSubmit={connectToServer}>
        <button type="submit">connect with server</button>
      </form>
    </>
  );
}

export default App;
