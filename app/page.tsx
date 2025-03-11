import LoginCard from "@/components/fragments/login";
import SignUpCard from "@/components/fragments/sign-up";

export default function Home() {
  return (
    <div className="justify-center items-center flex h-screen">
      {/* <SignUpCard /> */}
      <LoginCard />
    </div>
  );
}
