const dns = require('dns');

const domain = 'kargo.com'

dns.lookup(domain, (err, address) => {
  console.log(address);
});

dns.resolve4(domain, (err, address) => {
  console.log(address);
})

dns.resolve(domain, 'MX', (err, address) => {
  console.log(address);
})

dns.reverse('54.225.130.78', (err, hostname) => {
  console.log(hostname);
})