import logo from "../logo.svg";

function Header() {
  return (
    <header className="flex flex-col items-center justify-center text-center">
      <img
        src={logo}
        className="w-56 h-56 animate-spinSlow"
        alt="logo" />
      <h1 className="text-4xl font-semibold">
        Welcome to React Query Example
      </h1>
      <p className="text-lg mt-2 text-gray-300">
        Here, I demonstrate the use of useQuery and useMutation in React
      </p>
      </header>
  )
}

export default Header;