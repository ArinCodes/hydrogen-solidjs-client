import { IoNotifications } from "solid-icons/io";
export default function Notification() {
  return (
    <button className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600  text-black dark:text-white ">
      <IoNotifications className="text-xl" />
    </button>
  );
}
