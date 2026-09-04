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

(async function main() {
  runSynchronousDemo();
})();