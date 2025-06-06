export default function TestPage() {
  console.log(import.meta.env.GITHUB_CLIENT_SECRET);
  console.log(import.meta.env.BETTER_AUTH_URL);


  return <div>This is the test page</div>;
}
