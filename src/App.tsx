import { useQuery } from "@tanstack/react-query";

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const App = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: () => fetch(API_URL).then((res) => res.json()),
  });

  if (isLoading) return <h2>Loading...!</h2>;
  if (error) return <h2>Error Ocurred!</h2>;

  return (
    <>
      {data.map((todo: ITodo) => (
        <h1 key={todo.id}>{todo.id}</h1>
      ))}
    </>
  );
};

export default App;
