const ConfigDrawer = props => {
  const [open, setOpen] = useState(false)
  const { children } = props

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setOpen(open)
  }

  return (
    <>
      <button className="btn btn-light btn-block" onClick={toggleDrawer(true)}>
        <SettingsIcon />
      </button>
      <Drawer anchor="right" open={open}>
        <div className="mx-3 pt-2">
          <button
            className="btn btn-light"
            type="button"
            onClick={toggleDrawer(false)}>
            <CloseIcon />
          </button>
          {children}
        </div>
      </Drawer>
    </>
  )
}
ConfigDrawer.propTypes = {
  children: PropTypes.node
}
