'use client';

import { useAuthContext } from "@context/authProvider";
import PageLoading from "@ui/common/PageLoading";
import WelcomePage from "@ui/WelcomePage";

export default function Home() {
  const {hasSession, isLoading} = useAuthContext();

  return (
    <div className="h-screen w-screen">
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
