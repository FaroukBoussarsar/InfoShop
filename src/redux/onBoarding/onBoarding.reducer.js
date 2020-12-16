const INTIAL_STATE = {
  onBoarding: true
}
const onBoardingReducer = (state = INTIAL_STATE, actions) => {
  switch (actions.type) {
    case 'TOGGLE_ONBOARDING':
      return actions.payload

    default:
      return state
  }
}

const filterCategories = onBoarding => {
  return !onBoarding
}

export default onBoardingReducer
