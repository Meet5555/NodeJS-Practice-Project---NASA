const API_BASE_URL = "http://localhost:8000";

// Load planets and return as JSON.
async function httpGetPlanets() {
  const res = await fetch(`${API_BASE_URL}/planets`);
  const planetsData = await res.json();
  console.log({ planetsData });
  return planetsData;
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const res = await fetch(`${API_BASE_URL}/launches`);
  const launchesData = await res.json();

  launchesData?.sort((a, b) => a?.flightNumber - b?.flightNumber);
  console.log({ launchesData });
  return launchesData;
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  console.log({ launch });
  try {
    return await fetch(`${API_BASE_URL}/launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_BASE_URL}/launches/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
