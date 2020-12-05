import useStickyState from './useStickyState'

export default defaultPanels => {
  const [panels, setPanels] = useStickyState(defaultPanels, 'panels-config')
  return {
    panels,
    toggleVisibility: id => {
      const newPanels = [...panels]
      const index = newPanels.findIndex(p => p.id === id)
      if (index > -1) {
        newPanels[index].isVisible = !panels[index].isVisible
      } else {
        newPanels.push({ id, isVisible: false })
      }
      setPanels(newPanels)
    },
    toggleSize: id => {
      const newPanels = [...panels]
      const index = newPanels.findIndex(p => p.id === id)
      if (index > -1) {
        newPanels[index].isSmall = !panels[index].isSmall
      } else {
        newPanels.push({ id, isSmall: true })
      }
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
