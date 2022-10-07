import { Link } from "solid-app-router";
import { For, Match, Show, Switch } from "solid-js";
import { useAuthState } from "../../context/auth";
import UserAvatar from "../ui/dataDisplay/UserAvatar";
import EditProfile from "./EditProfileDialog";
import { getRelativeTime } from "../../utils/dateTime";
export default function ProfileInfo(props) {
  const { currentUser } = useAuthState();
  return (
    <div
      className="absolute w-full flex flex-col items-center md:w-auto md:left-1/4 -bottom-48 text-center md:-bottom-28 md:text-left md:items-start"
      classList={{ " -bottom-56 md:-bottom-36": props.friendsCount }}
    >
      <div className="flex space-x-2">
        <h3 className="text-3xl dark:text-white font-medium text-center w-full">
          {`${props.firstName} ${props.lastName || ""}`}
        </h3>

        <Show when={currentUser.id === props.userId}>
          <EditProfile refetch={props.refetch} />
        </Show>
      </div>

      <div>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
          {props.friendsCount} Friends
        </p>
        <Switch>
          <Match when={props.status === "ACTIVE"}>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
              Active Now
            </p>
          </Match>
          <Match when={props.lastSeen}>
            Last Seen : {getRelativeTime(props.lastSeen)}
          </Match>
        </Switch>
      </div>

      <div class="-space-x-3 flex items-center mt-2">
        <For each={props.friends}>
          {(friend) => (
            <Link href={`/${friend.id}`}>
              <UserAvatar
                src={friend.profileImage}
                alt={friend.firstName}
                className="w-10 h-10 rounded-full border-white border-2"
              />
            </Link>
          )}
        </For>
        <Show when={props.friendsCount - props.friends.length > 0}>
          <div className="bg-gray-300 dark:bg-gray-900 w-10 h-10 rounded-full grid place-items-center font-bold">
            {props.friendsCount - props.friends.length}+
          </div>
        </Show>
      </div>
    </div>
  );
}
