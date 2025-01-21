import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function Root({ children }) {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet>{children}</Outlet>
      </main>
    </>
  );
}
