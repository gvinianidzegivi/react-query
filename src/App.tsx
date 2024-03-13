import { useMutation, useQuery } from "@tanstack/react-query";

interface IUser {
  id: number;
  name: string;
}

const API_URL = "https://jsonplaceholder.typicode.com/";

const App = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetch(`${API_URL}/users`).then((res) => res.json()),
  });

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: (newUser: IUser) =>
      fetch(`${API_URL}/users`, {
        method: "POST",
        body: JSON.stringify(newUser),
      }).then((res) => res.json()),
  });

  if (isLoading) return <h2>Loading...!</h2>;
  if (isPending) return <h2>wait, user is adding...</h2>;
  if (error || isError) return <h2>Error Ocurred!</h2>;
  if (isSuccess) alert("user added successfully");

  return (
    <>
      {data.map(({ id, name }: IUser) => (
        <h1 key={id}>{name}</h1>
      ))}
      <button
        style={{ background: isSuccess ? "red" : "blue" }}
        onClick={() => mutate({ id: 113123, name: "John Doe" })}
      >
        add User
      </button>
    </>
  );
};

export default App;
