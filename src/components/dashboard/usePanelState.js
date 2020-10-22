import useStickyState from './useStickyState'

export default defaultPanels => {
  const [panels, setPanels] = useStickyState(defaultPanels, 'panels-config')

  return {
    panels,
    toggleVisibility: index => {
      const newPanels = [...panels]
      newPanels[index].isVisible = !panels[index].isVisible
      setPanels(newPanels)
    },
    toggleSize: index => {
      const newPanels = [...panels]
      newPanels[index].isSmall = !panels[index].isSmall
      setPanels(newPanels)
    },
    moveUp: index => {
      const newPanels = [...panels]
      newPanels[index] = panels[index - 1]
      newPanels[index - 1] = panels[index]
      setPanels(newPanels)
    },
    moveDown: index => {
      const newPanels = [...panels]
      newPanels[index] = panels[index + 1]
      newPanels[index + 1] = panels[index]
      setPanels(newPanels)
    }
  }
}
