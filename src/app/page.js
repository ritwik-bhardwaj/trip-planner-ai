import HomePage from "./components/HomePage";

export const metadata = {
  alternates: {
    canonical: '/',
  }
}

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
