import { AlarmIcon } from "../Icons";

export default function RemindersView() {
  return (
    <div className="absolute top-1/3 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
      <AlarmIcon size={130} className="fill-black/30 dark:fill-white/30" />
      <p className="mt-5 text-center text-2xl text-black/30 dark:text-white/30">
        Notes with upcoming reminders appear here
      </p>
    </div>
  );
}
