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
			},
			{
				"internalType": "address",
				"name": "cat_",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "ilk_",
				"type": "bytes32"
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
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lot",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tab",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "usr",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "gal",
				"type": "address"
			}
		],
		"name": "Kick",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "beg",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bids",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "bid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lot",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "guy",
				"type": "address"
			},
			{
				"internalType": "uint48",
				"name": "tic",
				"type": "uint48"
			},
			{
				"internalType": "uint48",
				"name": "end",
				"type": "uint48"
			},
			{
				"internalType": "address",
				"name": "usr",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "gal",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tab",
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
		"name": "cat",
		"outputs": [
			{
				"internalType": "contract CatLike",
				"name": "",
				"type": "address"
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
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "deal",
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
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lot",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bid",
				"type": "uint256"
			}
		],
		"name": "dent",
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
		"inputs": [],
		"name": "ilk",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
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
			},
			{
				"internalType": "address",
				"name": "gal",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tab",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lot",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bid",
				"type": "uint256"
			}
		],
		"name": "kick",
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
		"name": "kicks",
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
		"name": "tau",
		"outputs": [
			{
				"internalType": "uint48",
				"name": "",
				"type": "uint48"
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
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lot",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bid",
				"type": "uint256"
			}
		],
		"name": "tend",
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
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "tick",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ttl",
		"outputs": [
			{
				"internalType": "uint48",
				"name": "",
				"type": "uint48"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "yank",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const liquidator = new web3.eth.Contract(abi, "0xdf02C7ED36A79487875217Eb43Aa0fC8AbD0F263")

export default liquidator