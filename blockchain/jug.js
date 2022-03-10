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
		"constant": true,
		"inputs": [],
		"name": "base",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "ilk",
				"type": "bytes32"
			}
		],
		"name": "drip",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "rate",
				"type": "uint256"
			}
		],
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
				"internalType": "uint256",
				"name": "duty",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rho",
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
			}
		],
		"name": "init",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"internalType": "address",
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
const jug = new web3.eth.Contract(abi, "0x5408cBD474c425e4B3D69aD8a48f7F2717036072")

export default jug