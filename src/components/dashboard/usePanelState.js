import { useState } from 'react'

export default defaultPanels => {
  const [panels, setPanels] = useState(defaultPanels)

  return {
    panels,
    toggleVisibility: (index) => {
      const newPanels = [...panels]
      newPanels[index].isVisible = !panels[index].isVisible
      setPanels(newPanels)
    },
    moveUp: (index) => {
      const newPanels = [...panels]
      newPanels[index] = panels[index-1]
      newPanels[index-1] = panels[index]
      setPanels(newPanels)
    },
    moveDown: (index) => {
      const newPanels = [...panels]
      newPanels[index] = panels[index+1]
      newPanels[index+1] = panels[index]
      setPanels(newPanels)
    },
  }
}
