import cron from "node-cron";

// learn more about cron time here:
// https://www.npmjs.com/package/node-cron?activeTab=readme
const jobs = [
  {
    time: "0 6 * * *", // every day at 22:00 (10 PM)
    message: () => "Sáng rồi, mặt trời trới cu rồi dậy đê!!!!!",
  },
  {
    time: "0 22 * * *", // every day at 22:21 (10:21 PM)
    message: () => "Muộn rồi, ngủ đi không là mắt thâm cu teo đấy!",
    // targetIDs: [""], // list of ids that bot will send to, remove this to send to all group
  },
];

export default function autoSend() {
  const timezone = global.config?.timezone || "Asia/Ho_Chi_Minh";
  if (!timezone) return;

  for (const job of jobs) {
    cron.schedule(
      job.time,
      () => {
        let i = 0;
        for (const tid of job.targetIDs ||
          Array.from(global.data.threads.keys()) ||
          []) {
          setTimeout(() => {
            global.api.sendMessage(
              {
                body: job.message(),
              },
              tid
            );
          }, i++ * 300);
        }
      },
      {
        timezone: timezone,
      }
    );
  }
}
