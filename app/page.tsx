'use client';

import Header from "@ui/header/Header";
import Button from "@mui/material/Button";
import { useAuthContext } from "@context/authProvider";
import PageLoading from "@ui/PageLoading";

export default function Home() {
  const {userDetails, isLoading, signOut} = useAuthContext();

  return (
    <>
      <Header />
      <div className="h-screen">
        {isLoading &&
          <PageLoading />
        }

        {!isLoading &&
          <>
            {userDetails && userDetails?.name &&
              <>
                <h1 className="text-black">{`Hello ${userDetails?.name}`}</h1>
                <Button
                  onClick={signOut}
                >
                  Log out
                </Button>
              </>
            }

            {!userDetails &&
              <Button
                href="/login"
              >
                Log in
              </Button>
            }
          </>
        }

      </div>
    </>
  );
}
