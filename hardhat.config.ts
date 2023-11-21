import 'hardhat-deploy'
import 'hardhat-typechain'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import "@nomicfoundation/hardhat-foundry";
import dotenv from 'dotenv'
dotenv.config()

const DEFAULT_COMPILER_SETTINGS = {
  version: '0.8.9',
  settings: {
    optimizer: {
      enabled: false,
    },
    metadata: {
      // do not include the metadata hash, since this is machine dependent
      // and we want all generated code to be deterministic
      // https://docs.soliditylang.org/en/v0.7.6/metadata.html
      bytecodeHash: 'none',
    },
  },
}

const OPTIMIZED_COMPILER_SETTINGS = {
  version: '0.8.9',
  settings: {
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      // do not include the metadata hash, since this is machine dependent
      // and we want all generated code to be deterministic
      // https://docs.soliditylang.org/en/v0.7.6/metadata.html
      bytecodeHash: 'none',
    },
  },
}

export default {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.DEPLOYER!].filter(Boolean),
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.DEPLOYER!].filter(Boolean),
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.DEPLOYER!].filter(Boolean),
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    zora: {
      url: `https://rpc.zora.energy/`,
      accounts: [process.env.DEPLOYER!].filter(Boolean),
    },
    "zora-goerli": {
      url: `https://testnet.rpc.zora.energy/`,
      accounts: [process.env.DEPLOYER!].filter(Boolean),
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: {
      zora: process.env.ZORA_BLOCKSCOUT_KEY!,
      "zora-goerli": "",
     },
    customChains: [
      {
        network: "zora",
        chainId: 7777777,
        urls: {
         apiURL: 'https://explorer.zora.energy/api',
         browserURL: "https://explorer.zora.energy/"
        }
      },
      {
        network: "zora-goerli",
        chainId: 999,
        urls: {
         apiURL: 'https://testnet.explorer.zora.energy/',
         browserURL: "https://explorer.zora.energy/testnet"
        }
      },
    ]
  },
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
    overrides: {
      'contracts/Shields.sol': OPTIMIZED_COMPILER_SETTINGS,
      'contracts/ShieldDescriptor.sol': OPTIMIZED_COMPILER_SETTINGS,
      'contracts/FieldGenerator.sol': OPTIMIZED_COMPILER_SETTINGS,
      'contracts/FrameGenerator.sol': OPTIMIZED_COMPILER_SETTINGS,
      'contracts/HardwareGenerator.sol': OPTIMIZED_COMPILER_SETTINGS,
    },
  },
  mocha: {
    timeout: 60000,
  },
}
