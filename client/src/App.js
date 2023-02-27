import './App.css';
import createRoutes from './routes/routes';

function App() {
  const routes = createRoutes();
  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
