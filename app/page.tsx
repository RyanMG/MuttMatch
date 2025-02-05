'use client';

import Header from "@ui/header/Header";
import { useAuthContext } from "@context/authProvider";
import PageLoading from "@ui/PageLoading";
import WelcomePage from "@ui/WelcomePage";

export default function Home() {
  const {hasSession, isLoading} = useAuthContext();

  return (
    <div className="h-screen w-screen">
      <Header />
      <div>
        {isLoading &&
          <PageLoading />
        }

        {!isLoading &&
          <>
            {hasSession &&
              <>
              </>
            }
            <WelcomePage />
          </>
        }

      </div>
    </div>
  );
}
