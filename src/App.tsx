import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUser, apiGetUsers, apiPostUser } from "./api/users";
import { v4 as uid } from "uuid";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const App = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => apiGetUsers(),
    initialData: [],
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

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "User Added Successfully",
        variant: "success",
      });
    }
  }, [isSuccess, toast]);

  if (isLoading) return <h2>Loading...!</h2>;
  if (isPending) return <h2>wait, user is adding...</h2>;
  if (error || isError) return <h2>Error Ocurred!</h2>;

  return (
    <>
      {data.map(({ id, name }: IUser) => (
        <h1 key={id}>{name}</h1>
      ))}
      <Button onClick={() => mutate({ id: uid(), name: "John Doe" })}>
        Add User
      </Button>
    </>
  );
};

export default App;
