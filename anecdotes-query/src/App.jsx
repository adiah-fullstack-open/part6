import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./requests";

const App = () => {
  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data ...</div>;
  }

  if (result.isError) {
    // return <span>Error: {result.error.message}</span>;
    return <span>anecdote service not available to problems in server</span>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
