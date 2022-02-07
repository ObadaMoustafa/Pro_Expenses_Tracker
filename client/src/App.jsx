import "./style/App.css";
function App() {
  const serverSide = process.env.REACT_APP_SERVER_SIDE;
  console.log(serverSide);
  return (
    <>
      <form action={`${serverSide}/api/test`} method="GET">
        <button type="submit">connect with server</button>
      </form>
    </>
  );
}

export default App;
