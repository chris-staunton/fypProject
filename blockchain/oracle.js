
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
				"name": "vow_",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spotter_",
				"type": "address"
			}
		],
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "ilk",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "val",
				"type": "uint256"
			}
		],
		"name": "Bump",
		"type": "event"
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
			}
		],
		"name": "Cull",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "ilk",
				"type": "bytes32"
			}
		],
		"name": "Cure",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "usr",
				"type": "address"
			}
		],
		"name": "Deny",
		"type": "event"
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
				"indexed": false,
				"internalType": "uint256",
				"name": "val",
				"type": "uint256"
			}
		],
		"name": "Dip",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "what",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "data",
				"type": "address"
			}
		],
		"name": "File",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "what",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "data",
				"type": "uint256"
			}
		],
		"name": "File",
		"type": "event"
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
				"indexed": false,
				"internalType": "uint256",
				"name": "val",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "doc",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint48",
				"name": "tau",
				"type": "uint48"
			}
		],
		"name": "Init",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "usr",
				"type": "address"
			}
		],
		"name": "Rely",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "ilk",
				"type": "bytes32"
			}
		],
		"name": "Tell",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "adjustedValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "ilk",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "val",
				"type": "uint256"
			}
		],
		"name": "bump",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
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
		"name": "cull",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "ilk",
				"type": "bytes32"
			}
		],
		"name": "cure",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "usr",
				"type": "address"
			}
		],
		"name": "deny",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "ilk",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "val",
				"type": "uint256"
			}
		],
		"name": "dip",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
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
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
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
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
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
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "ilk",
				"type": "bytes32"
			}
		],
		"name": "good",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
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
				"internalType": "string",
				"name": "doc",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "pip",
				"type": "address"
			},
			{
				"internalType": "uint48",
				"name": "tau",
				"type": "uint48"
			},
			{
				"internalType": "uint48",
				"name": "toc",
				"type": "uint48"
			},
			{
				"internalType": "uint256",
				"name": "chop",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "flip",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "mat",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "ilk",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "val",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "doc",
				"type": "string"
			},
			{
				"internalType": "uint48",
				"name": "tau",
				"type": "uint48"
			},
			{
				"internalType": "uint256",
				"name": "mat_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "chop",
				"type": "uint256"
			}
		],
		"name": "init",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
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
		"name": "liquidate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "usr",
				"type": "address"
			}
		],
		"name": "rely",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "spotter",
		"outputs": [
			{
				"internalType": "contract SpotLike",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "ilk",
				"type": "bytes32"
			}
		],
		"name": "tell",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "vat",
		"outputs": [
			{
				"internalType": "contract VatAbstract",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "vow",
		"outputs": [
			{
				"internalType": "contract VowLike",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
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
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "ilk",
				"type": "bytes32"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const oracleContract = (web3) =>{
    return new web3.eth.Contract(abi, "0xcc64E075d3410a933619292d1a51375EBF79f60C")
} 

export default oracleContract