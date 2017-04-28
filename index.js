const perfectCity = (departure, destination) => {

  let diffX = Math.abs(departure[0] - destination[0]) // The global X offset between given points
  let diffY = Math.abs(departure[1] - destination[1]) // The global Y offset between given points

  // If the points are close enough (<1 unit offset on X axis) to each other,
  // diffX will be 0, this value will be used instead
  let routeXSummary = 0

  // If the points are close enough (<1 unit offset on Y axis) to each other,
  // diffY will be 0, this value will be used instead
  let routeYSummary = 0

  if(diffX < 1) {
    // There are 2 possible ways to go (stick to the left or right), one of them might be shorter

    diffX = 0 // We don't need this as long as we're going to use slightly different algorithm here

    //Let's calculate the total distance we go along the X axis (for going left)
    const leftRoute = {
      startToIntersectionLength: departure[0] - Math.floor(departure[0]),
      finishToIntersectionLength: destination[0] - Math.floor(departure[0]),
    }

    //Let's calculate the total distance we go along the X axis (for going right)
    const rightRoute = {
      startToIntersectionLength: Math.ceil(departure[0]) - departure[0],
      finishToIntersectionLength: Math.ceil(destination[0]) - destination[0],
    }

    // Summing everything up
    const leftRouteSummary = leftRoute.startToIntersectionLength + leftRoute.finishToIntersectionLength
    const rightRouteSummary = rightRoute.startToIntersectionLength + rightRoute.finishToIntersectionLength

    // Pick the least of 2 values and stick with it
    routeXSummary = Math.min(leftRouteSummary, rightRouteSummary)
  }
  else if(diffY < 1) {
    // There are 2 possible ways to go (stick to the top or bottom), one of them might be shorter
    diffY = 0 // We don't need this as long as we're going to use slightly different algorithm here

    //Let's calculate the total distance we go along the Y axis (for going bottom)
    const bottomRoute = {
      startToIntersectionLength: departure[1] - Math.floor(departure[1]),
      finishToIntersectionLength: destination[1] - Math.floor(destination[1]),
    }
    //Let's calculate the total distance we go along the Y axis (for going top)
    const topRoute = {
      startToIntersectionLength: Math.ceil(departure[1]) - departure[1],
      finishToIntersectionLength: Math.ceil(destination[1]) - destination[1],
    }

    // Summing everything up
    const bottomRouteSummary = bottomRoute.startToIntersectionLength + bottomRoute.finishToIntersectionLength
    const topRouteSummary = topRoute.startToIntersectionLength + topRoute.finishToIntersectionLength

    // Pick the least of 2 values and stick with it
    routeYSummary = Math.min(bottomRouteSummary, topRouteSummary)
  }
  else { // A common case
    // The result is rounded in order to prevent the "float point madness"
    return (diffX + diffY).toFixed(1)
  }

  // diffX/diffY will equal 0 if routeXSummary/routeYSummary is set
  // The result is rounded in order to prevent the "float point madness"
  return (diffX + diffY + routeXSummary + routeYSummary).toFixed(1)
}

console.log(perfectCity([0.4, 1], [0.9, 3]))
