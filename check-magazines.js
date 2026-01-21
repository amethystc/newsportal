const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'meyoc37a',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-03-14',
});

client.fetch(`*[_type == "magazine"] | order(publishedAt desc) {
  title,
  slug,
  issueNumber,
  price,
  checkoutUrl,
  "coverImage": coverImage.asset->url,
  "magazinePdf": magazinePdf.asset->url,
  publishedAt
}`)
    .then(data => {
        console.log('Total magazines found:', data.length);
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(err => console.error('Error:', err));
