const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
  const firstPage = await fetchData();

  let records = [...firstPage.releases];

  if (firstPage.pagination.pages > 1) {
    for (let i = 2; i <= firstPage.pagination.pages; i += 1) {
      const json = await fetchData(i);

      records = [...records, ...json.releases];
    }
  }

  return {
    records: records
      .map((record) => record.basic_information)
      .sort((a, b) => {
        if (a.artists[0].name > b.artists[0].name) return 1;
        if (a.artists[0].name < b.artists[0].name) return -1;

        return 0;
      }),
  };
};

async function fetchData(page = 1) {
  const url = `https://api.discogs.com/users/mgrsskls/collection/folders/0/releases?token=${process.env.DISCOGS_TOKEN}&per_page=100&page=${page}`;

  return await EleventyFetch(url, {
    duration: "1d",
    type: "json",
  });
}
