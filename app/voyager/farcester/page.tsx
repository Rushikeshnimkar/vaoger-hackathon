"use client"
import "@farcaster/auth-kit/styles.css";
import { providers } from "ethers";
import { AuthKitProvider, SignInButton, useProfile } from "@farcaster/auth-kit";
import HomeNavbar from "@/app/components/reusable/HomeNavbar";
import { useEffect } from "react";
const config = {
  // For a production app, replace this with an Optimism Mainnet
  // RPC URL from a provider like Alchemy or Infura.
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  domain: "vaoger-hackathon.vercel.app",
  siweUri: "https://vaoger-hackathon.vercel.app/voyager/farcester",
  provider: new providers.JsonRpcProvider(undefined, 10)
};

function App() {
  return (
    <main className="font-inter h-screen">
      <HomeNavbar />
      <AuthKitProvider config={config}>
      <p className="text-3xl text-black mt-20 text-center">Authenticate using your farcester account to redirect</p>
      <div className="flex justify-center items-center mt-10">
        
          <SignInButton />
        </div>
      </AuthKitProvider>
    </main>
  );
}

function Profile() {
  const profile = useProfile();
  const {
    isAuthenticated,
    profile: { fid, displayName, custody },
  } = profile;

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/random_chat/new";
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <div>
          <p>
            Hello, {displayName}! Your FID is {fid}.
          </p>
          <p>
            Your custody address is: <pre>{custody}</pre>
          </p>
        </div>
      ) : (
        <p>
          Click the button above, then scan the QR code to sign in.
        </p>
   
      )}
    </>
  );
}

export default App;
