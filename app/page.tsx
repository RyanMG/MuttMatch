'use client';

import Header from "@ui/header/Header";
import { useAuthContext } from "@context/authProvider";
import PageLoading from "@ui/PageLoading";
import SearchFPO from "@ui/dog-search/SearchFPO";

export default function Home() {
  const {userDetails, isLoading} = useAuthContext();

  return (
    <div className="h-screen w-screen">
      <Header />
      <div>
        {isLoading &&
          <PageLoading />
        }

        {!isLoading &&
          <>
            {userDetails && userDetails?.name &&
              <>
               <SearchFPO />
              </>
            }

            {!userDetails &&
              <p>Log in to access the app</p>
            }
          </>
        }

      </div>
    </div>
  );
}
