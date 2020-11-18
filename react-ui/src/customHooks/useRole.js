import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const useRole = () => {
  const [role, setRole] = useState('Artist')
  const [isLoadingRole, setLoadingRole] = useState(true)
  const { user } = useAuth0()

  useEffect(() => {
    if (user) {
      setRole(user['https://streetartoronto.ca/role'])
      setLoadingRole(false)
    }
  }, [user])

  if (isLoadingRole) {
    return { isLoadingRole }
  }

  return {
    isLoadingRole,
    role,
    isStaff: role === 'StART Staff',
    isReviewer: role === 'Advisory Committee',
    isCurator: role === 'Curator',
    isArtist: role === 'Artist',
    isGuest: role === 'Guest'
  }
}

export default useRole
