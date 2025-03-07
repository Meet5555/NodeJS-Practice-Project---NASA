const { getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const newLaunch = req.body;
  console.log({ newLaunch });
  if (!newLaunch.mission || !newLaunch.rocket || !newLaunch.launchDate || !newLaunch.target) {
    return res.status(400).json({
      error: "Missing Required launch property",
    });
  }

  newLaunch.launchDate = new Date(newLaunch.launchDate);
  // if (newLaunch?.launchDate.toString() === "Invalid Date") {
  //   return res.status(400).json({
  //     error: "Invalid Launch Date",
  //   });
  // }

  if (isNaN(newLaunch?.launchDate)) {
    return res.status(400).json({
      error: "Invalid Launch Date",
    });
  }

  addNewLaunch(newLaunch);
  return res.status(201).json(newLaunch);
}

function httpAbortLaunch(req, res) {
  const launchId = req.params.id;

  // if launch doesn't exists then return 404
  if (!existsLaunchWithId) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const abortedLaunch = abortLaunchById(launchId);
  if (!abortedLaunch) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }

  return res.status(200).json({
    message: "Launch aborted successfully",
    launch: abortedLaunch,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
