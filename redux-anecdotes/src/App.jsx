import { useDispatch } from "react-redux";
import Anecdotes from "./components/Anecdotes";
import NewAnecdote from "./components/NewAnecdote";

const App = () => {
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
  };

  return (
    <div>
      <Anecdotes />
      <NewAnecdote />
    </div>
  );
};

export default App;
