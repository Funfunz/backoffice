export const API_ADDRESS = process.env.REACT_APP_API_URL || (
  process.env.NODE_ENV === 'production' 
    ? '/api'
    : 'http://localhost:3004/'
)

export const API_MOCK_ENABLED: boolean = true //process.env.NODE_ENV === 'test'