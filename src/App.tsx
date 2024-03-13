import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUser, apiGetUsers, apiPostUser } from "./api/users";
import { v4 as uid } from "uuid";

const App = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => apiGetUsers(),
  });

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: (newUser: IUser) => apiPostUser(newUser),
    // onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
    onSuccess: (newUser) =>
      queryClient.setQueryData(["user"], (oldUsers: IUser[]) => [
        ...oldUsers,
        newUser,
      ]),
  });

  if (isLoading) return <h2>Loading...!</h2>;
  if (isPending) return <h2>wait, user is adding...</h2>;
  if (error || isError) return <h2>Error Ocurred!</h2>;
  if (isSuccess) console.log("user added successfully");

  return (
    <>
      {data && data?.map(({ id, name }: IUser) => <h1 key={id}>{name}</h1>)}
      <button onClick={() => mutate({ id: uid(), name: "John Doe" })}>
        add User
      </button>
    </>
  );
};

export default App;
