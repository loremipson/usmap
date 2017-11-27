export const setHoveringState = i => {
  return {
    type: 'SET_HOVERING_STATE',
    i,
  }
};

export const setActiveTooltip = (stateName, tooltip) => {
  return {
    type: 'SET_ACTIVE_TOOLTIP',
    stateName,
    tooltip,
  }
};