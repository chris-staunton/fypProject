import Web3 from 'web3'

const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/5785dd9062044b1880e29abf4e06bed8"
)

const web3 = new Web3(provider)

const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "vat_",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "ilk",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "urn",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ink",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "art",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tab",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "flip",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "Bite",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "ilk",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "urn",
				"type": "address"
			}
		],
		"name": "bite",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "box",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "cage",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "rad",
				"type": "uint256"
			}
		],
		"name": "claw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "dart",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "usr",
				"type": "address"
			}
		],
		"name": "deny",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "dink",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "ilk",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "what",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "data",
				"type": "uint256"
			}
		],
		"name": "file",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "what",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "data",
				"type": "uint256"
			}
		],
		"name": "file",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "what",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "data",
				"type": "address"
			}
		],
		"name": "file",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "ilk",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "what",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "flip",
				"type": "address"
			}
		],
		"name": "file",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "ilks",
		"outputs": [
			{
				"internalType": "address",
				"name": "flip",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "chop",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dunk",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "litter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "live",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "usr",
				"type": "address"
			}
		],
		"name": "rely",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "vat",
		"outputs": [
			{
				"internalType": "contract VatLike",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "vow",
		"outputs": [
			{
				"internalType": "contract VowLike",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "wards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
const cat = new web3.eth.Contract(abi, "0x4Cbac7715c399f540f0E53E3a6505B261506f096")

export default cat