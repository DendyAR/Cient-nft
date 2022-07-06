//https://eth-mainnet.g.alchemy.com/v2/VY32KnpmPx2ieaHFrhaPIigqHM7Wfr4V

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/cWExzKUXsxOnPZmxHMuWVf41QHPd2ZVo",
      accounts: [
        "e9eebc6dd29bd416a11ff7b2603ca041b26ae246206cb6878bf8888431f8ab48",
      ],
    },
  },
};
