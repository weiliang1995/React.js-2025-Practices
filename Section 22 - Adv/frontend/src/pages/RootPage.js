import MainNavigation from "../components/MainNavigation";
import { Outlet, useNavigation } from "react-router-dom";

export default function RootPage({ children }) {

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet>{children}</Outlet>
      </main>
    </>
  );
}
