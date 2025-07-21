export const isTokenValid = () => {
  const token = localStorage.getItem('token')
  const tokenTime = localStorage.getItem('tokenTime')

  if (!token || !tokenTime) return false

  const currentTime = Date.now()
  const tokenAge = currentTime - parseInt(tokenTime, 10)

  // 1 hour = 3600000 ms
  return tokenAge <= 3600000
}

export const clearToken = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('tokenTime')
}
