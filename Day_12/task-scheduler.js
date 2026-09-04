function runSynchronousDemo() {
  console.log("\n=== STEP 1: Synchronous Task Log ===");
  const tasks = ["Write report", "Review PR", "Team standup"];

  tasks.forEach((task, i) => {
    console.log(`[SYNC] Task ${i + 1} done: ${task}`);
  });
}

function scheduleTaskCallback(taskName, delayMs, callback) {
  console.log(`[CALLBACK] Scheduling "${taskName}" to run in ${delayMs}ms`);
  setTimeout(() => {
    console.log(`[CALLBACK] Running: ${taskName}`);
    callback(null, `${taskName} finished`);
  }, delayMs);
}

function runCallbackDemo() {
  console.log("\n=== STEP 2: Callback-based Scheduling ===");
  scheduleTaskCallback("Send email", 1000, (err, result) => {
    if (err) return console.error(err);
    console.log(`[CALLBACK] Result: ${result}`);
  });

  scheduleTaskCallback("Backup database", 500, (err, result) => {
    if (err) return console.error(err);
    console.log(`[CALLBACK] Result: ${result}`);
  });
}

(async function main() {
  runSynchronousDemo();
  runCallbackDemo();
})();