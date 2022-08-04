import Error from "./Error";

export default function NoAccess() {
  return (
    <Error
      error={{
        title: "Access denied",
        message: "you dont have access to this resource",
      }}
    />
  );
}
