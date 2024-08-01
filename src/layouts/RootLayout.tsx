import { Outlet, defer } from "react-router-dom";
import Footer from "../components/build/Footer";
import Header from "../components/build/Header";

export async function Loader() {
  // if (!user) {
  //   return json({user: null});
  // }
  const user = "Ayomide";
  return defer({ user: user });
}

export default function RootLayout({ children }: any) {
  // const user: any = useLoaderData()

  return (
    <main className=" font-inter">
      {/* <Header user={user.user} /> */}
      <Header user={true} />
      <Outlet />
      <Footer />
    </main>
  );
}
