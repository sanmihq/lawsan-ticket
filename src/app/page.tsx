import GuestForm from "./components/ui/GuestForm";
import { spaceMono } from "./fonts";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center">
        <span>You have been invited to</span> <br />
        <span
          className={`${spaceMono.className} text-xl font-bold text-center`}
        >
          🎉 The Traditional Wedding 🎉
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-6 mb-10">Get your tickets here.</p>
      <GuestForm />
    </div>
  );
}
