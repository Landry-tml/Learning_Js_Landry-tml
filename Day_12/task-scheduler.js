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

function scheduleTaskPromise(taskName, delayMs, shouldFail = false) {
  return new Promise((resolve, reject) => {
    console.log(`[PROMISE] Scheduling "${taskName}" to run in ${delayMs}ms`);
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`${taskName} failed to complete`));
      } else {
        resolve(`${taskName} finished`);
      }
    }, delayMs);
  });
}

function runPromiseDemo() {
  console.log("\n=== STEP 3: Promise-based Scheduling ===");

  scheduleTaskPromise("Compile assets", 700)
    .then((result) => {
      console.log(`[PROMISE] ${result}`);
      return scheduleTaskPromise("Deploy to staging", 400);
    })
    .then((result) => console.log(`[PROMISE] ${result}`))
    .catch((err) => console.error(`[PROMISE] Error: ${err.message}`));
}

  Promise.all([
    scheduleTaskPromise("Link code", 300),
    scheduleTaskPromise("Run unit tests", 600),
    scheduleTaskPromise("Check types", 200),
  ])
    .then((results) => {
      console.log("[PROMISE] All parallel tasks complete:");
      results.forEach((r) => console.log(`   - ${r}`));
    })
    .catch((err) => console.error(`[PROMISE] Error: ${err.message}`));

    async function runAsyncAwaitDemo() {
  console.log("\n=== STEP 4: async/await Scheduling ===");
  try {
    const r1 = await scheduleTaskPromise("Fetch config", 300);
    console.log(`[ASYNC] ${r1}`);

    const r2 = await scheduleTaskPromise("Warm cache", 300);
    console.log(`[ASYNC] ${r2}`);

    const [r3, r4] = await Promise.all([
      scheduleTaskPromise("Notify team A", 400),
      scheduleTaskPromise("Notify team B", 250),
    ]);
    console.log(`[ASYNC] ${r3}`);
    console.log(`[ASYNC] ${r4}`);

    const r5 = await scheduleTaskPromise("Push to production", 300, true);
    console.log(`[ASYNC] ${r5}`); // never reached
  } catch (err) {
    console.error(`[ASYNC] Caught error: ${err.message}`);
  } finally {
    console.log("[ASYNC] Scheduler run complete.");
  }
}

function eventLoopOrderDemo() {
  console.log("\n=== BONUS: Event Loop Ordering ===");
  console.log("1. Synchronous line");
  setTimeout(() => console.log("4. setTimeout (macrotask)"), 0);
  Promise.resolve().then(() => console.log("3. Promise.then (microtask)"));
  console.log("2. Another synchronous line");
}

(async function main() {
  runSynchronousDemo();
  eventLoopOrderDemo();
  runCallbackDemo();
  runPromiseDemo;
})();