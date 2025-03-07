const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration x I,",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 bl",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  // launches.set(latestFlightNumber, { ...launch, flightNumber: latestFlightNumber });
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customer: ["ZTM", "NASA"],
      upcoming: true,
      success: true,
    })
  );
}

function abortLaunchById(launchId) {
  console.log({ launches });
  console.log({ launchId });
  const aborted = launches.get(Number(launchId));
  if (!aborted) {
    return false;
  }
  console.log({ aborted });
  aborted.upcoming = false;
  aborted.success = false;
  launches.set(aborted.flightNumber, aborted);
  return aborted;
}

module.exports = {
  getAllLaunches,
  existsLaunchWithId,
  addNewLaunch,
  abortLaunchById,
};
