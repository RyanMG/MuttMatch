'use client';

import { useAuthContext } from "@context/authProvider";
import PageLoading from "@ui/common/PageLoading";
import WelcomePage from "@ui/WelcomePage";
import Sidebar from "@ui/sidebar/SidebarLayout";

export default function Home() {
  const {hasSession, isLoading} = useAuthContext();

  if (isLoading) return <PageLoading />;

  return (
    <div className="flex-1 w-screen flex flex-col md:flex-row overflow-hidden">
      {hasSession?.current &&
        <Sidebar />
      }
      <WelcomePage />
    </div>
  );
}
