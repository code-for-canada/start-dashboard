import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const useRoles = () => {
  const [roles, setRoles] = useState([])
  const [isLoadingRoles, setLoadingRoles] = useState(true)
  const { user } = useAuth0()

  useEffect(() => {
    if (user) {
      if (user['https://streetartoronto.ca/role']) {
        setRoles(user['https://streetartoronto.ca/role'])
      }
      setLoadingRoles(false)
    }
  }, [user])

  if (isLoadingRoles) {
    return { isLoadingRoles }
  }

  return {
    isLoadingRoles,
    roles,
    isStaff: roles.includes('StART Staff'),
    isReviewer: roles.includes('Advisory Committee'),
    isCurator: roles.includes('Curator'),
    isArtist: roles.includes('Artist')
  }
}

export default useRoles
