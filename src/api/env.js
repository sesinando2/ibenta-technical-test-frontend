const apiDomain = '';
const clientId = '';
const clientSecret = '';

const clientData = {
  grant_type: 'client_credentials',
  client_id: clientId,
  client_secret: clientSecret,
  scope: 'read write'
}

export { apiDomain, clientId, clientSecret, clientData }
