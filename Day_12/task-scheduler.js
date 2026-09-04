function runSynchronousDemo() {
  console.log("\n=== STEP 1: Synchronous Task Log ===");
  const tasks = ["Write report", "Review PR", "Team standup"];

  tasks.forEach((task, i) => {
    console.log(`[SYNC] Task ${i + 1} done: ${task}`);
  });
}