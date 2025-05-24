export default async function UserProfile({ params }: any) {
  const { id } = await params;
  return (
    <>
      <h1>Details About User {id}</h1>
      <h2>User {id} is well known</h2>
    </>
  );
}
